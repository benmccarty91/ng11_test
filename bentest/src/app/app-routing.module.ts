import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AsyncModuleService } from 'src/services/asyncModule.service';

let _asyncModuleService: AsyncModuleService;
const routes: Routes = [
  {
    path: '',
    redirectTo: 'bentest',
    pathMatch: 'full'
  },
  {
    path: 'bentest',
    loadChildren: () => _asyncModuleService.loadModuleWithNpmFallback('BentestLibModule', import('bentest-lib'))
    // loadChildren: () => import('bentest-lib').then(m => m.BentestLibModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule {
  constructor(
    private asyncModuleService: AsyncModuleService
  ) {
    _asyncModuleService = this.asyncModuleService;
  }
}
