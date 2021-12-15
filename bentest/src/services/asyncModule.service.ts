import { Compiler, Injectable } from "@angular/core";
import { HttpClient, HttpResponse } from '@angular/common/http'
import { from, Observable, timer } from "rxjs";
import { catchError, map, switchMap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AsyncModuleService {

  private dependencies: { [key: string]: any } = {
    '@angular/core': import('@angular/core'),
    '@angular/router': import('@angular/router'),
  }

  constructor(
    private httpClient: HttpClient,
    private compiler: Compiler
  ) { }

  public loadModuleWithNpmFallback(cdnModule: string, npmLib: any): Observable<any> {
    return timer(2000).pipe(
      switchMap(() => this.loadModule(cdnModule, 'MainModule')),
      map(x => x.moduleType),
      catchError(err => this.handleProcessingErrAndUseNpmFallback(err, npmLib, cdnModule))
    );
  }

  private loadModule(cdnModule: string, moduleName: string = 'MainModule'): Observable<any> {
    return this.httpClient.get(`http://localhost:3000/dynamic/Mobile/Modules/${cdnModule}/21.12/lib.umd.min.js`,
      {
        responseType: 'text',
        observe: 'response'
      }
    )
      .pipe(
        map(httpResponse => this.parseHttpResponse(moduleName, httpResponse, cdnModule)), //parse the http response to get the body/etag
        // switchMap(mod => this.processAsyncModuleV2(moduleName, mod)),
        map(moduleToBeProcessed => this.processAsyncModule(moduleName, cdnModule, moduleToBeProcessed)), // compile response, return NgModuleFactory
        catchError(err => {
          if (err && err.name && err.name === 'ReferenceError') throw err;
          console.error(err);
          throw err;
        }) // last catch block.  rethrows error, but you can put some side-effect code in here (grey out menu item, for example)
      );
  }

  private handleProcessingErrAndUseNpmFallback(err: any, npmLib: any, cdnModule: string): any {
    console.log(
      `CDN: inside last catch block, returning NPM version of the module...`
    );
    return npmLib.then((m: any) => m.BentestLibraryModule);
  }

  private parseHttpResponse(moduleName: string, httpResponse: HttpResponse<string>, moduleRoute: string): ModuleToBeProcessed {
    console.log('CDN: successful response from aws, parsing response.');
    const newEtag = 'blah';
    const body = httpResponse.body;

    if (!newEtag || !body) {
      throw Error('Invalid response from server');
    }

    return {
      etag: newEtag,
      code: body,
      isFreshModule: true
    };
  }

  private processAsyncModuleV2 = (moduleName: string, moduleToBeProcessed: ModuleToBeProcessed): Observable<any> => {
    // const code = moduleToBeProcessed.code;
    // const dataUri = `data:text/javascript;charset=utf-8,${encodeURIComponent(code)}`;
    // const js = `console.log('Hello everyone!');`;
    // const encodedJs = encodeURIComponent(js);
    // const dataUri = 'data:text/javascript;charset=utf-8,'
    //   + encodedJs;
    // import(dataUri);
    const url = `http://localhost:3000/dynamic/Mobile/Modules/blah/21.12/lib.umd.min.js`
    return from(import(url));
  }

  private processAsyncModule = async (moduleName: string, moduleRoute: string, moduleToBeProcessed: ModuleToBeProcessed): Promise<any> => {
    console.log('CDN: begin processing code...');
    const code = moduleToBeProcessed.code;
    const exports: any = {};

    (window as any)['ng']['core'] = require('@angular/core');
    (window as any)['ng']['router'] = require('@angular/router');
    (window.require as any) = (dependency: string) => {
      let dep = this.dependencies[dependency];

      if (!dep)
        throw new ReferenceError(
          `Dependency ${dependency} is missing. Please add it to the dependencies dictionary in app-async-modules.service.ts`
        );

      return dep;
    }; // shim the `require()` function
    const benval = eval;
    benval(code); // execute javascript.  this will populate the exports object above.

    console.log('CDN: eval successful, attempting to run through angular compiler');

    // run the module through the ng compiler to get module + component factories
    const modCompFactories = this.compiler.compileModuleAndAllComponentsSync(exports[moduleName]);

    console.log('CDN: module compiled without issues, returning...');
    return modCompFactories.ngModuleFactory;
  }
}

interface ModuleToBeProcessed {
  etag: string;
  code: string;
  isFreshModule: boolean;
}