(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/router')) :
    typeof define === 'function' && define.amd ? define(['exports', '@angular/core', '@angular/router'], factory) :
      (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global["bentest-lib"] = {}, global.i0, global.i1));
})(this, (function (exports, i0, i1) {
  'use strict';

  function _interopNamespace(e) {
    if (e && e.__esModule) return e;
    var n = Object.create(null);
    if (e) {
      Object.keys(e).forEach(function (k) {
        if (k !== 'default') {
          var d = Object.getOwnPropertyDescriptor(e, k);
          Object.defineProperty(n, k, d.get ? d : {
            enumerable: true,
            get: function () { return e[k]; }
          });
        }
      });
    }
    n["default"] = e;
    return Object.freeze(n);
  }

  var i0__namespace = /*#__PURE__*/_interopNamespace(i0);
  var i1__namespace = /*#__PURE__*/_interopNamespace(i1);

  class BentestLibComponent {
    constructor() { }
    ngOnInit() {
    }
  }
  BentestLibComponent.ɵfac = function BentestLibComponent_Factory(t) { return new (t || BentestLibComponent)(); };
  BentestLibComponent.ɵcmp = /*@__PURE__*/ i0__namespace.ɵɵdefineComponent({
    type: BentestLibComponent, selectors: [["lib-bentest-lib"]], decls: 2, vars: 0, template: function BentestLibComponent_Template(rf, ctx) {
      if (rf & 1) {
        i0__namespace.ɵɵelementStart(0, "p");
        i0__namespace.ɵɵtext(1, " bentest-lib works! ");
        i0__namespace.ɵɵelementEnd();
      }
    }, encapsulation: 2
  });
  (function () {
    (typeof ngDevMode === "undefined" || ngDevMode) && i0__namespace.ɵsetClassMetadata(BentestLibComponent, [{
      type: i0.Component,
      args: [{
        selector: 'lib-bentest-lib',
        template: `
    <p>
      bentest-lib works!
    </p>
  `,
        styles: []
      }]
    }], function () { return []; }, null);
  })();

  const routes = [
    {
      path: '',
      component: BentestLibComponent
    }
  ];
  class BentestLibModule {
  }
  BentestLibModule.ɵfac = function BentestLibModule_Factory(t) { return new (t || BentestLibModule)(); };
  BentestLibModule.ɵmod = /*@__PURE__*/ i0__namespace.ɵɵdefineNgModule({ type: BentestLibModule });
  BentestLibModule.ɵinj = /*@__PURE__*/ i0__namespace.ɵɵdefineInjector({
    imports: [[
      i1.RouterModule.forChild(routes)
    ]]
  });
  (function () {
    (typeof ngDevMode === "undefined" || ngDevMode) && i0__namespace.ɵsetClassMetadata(BentestLibModule, [{
      type: i0.NgModule,
      args: [{
        declarations: [
          BentestLibComponent
        ],
        imports: [
          i1.RouterModule.forChild(routes)
        ],
      }]
    }], null, null);
  })();
  (function () { (typeof ngJitMode === "undefined" || ngJitMode) && i0__namespace.ɵɵsetNgModuleScope(BentestLibModule, { declarations: [BentestLibComponent], imports: [i1__namespace.RouterModule] }); })();

  exports.BentestLibComponent = BentestLibComponent;
  exports.BentestLibModule = BentestLibModule;

  Object.defineProperty(exports, '__esModule', { value: true });
  console.log('bentest');
}));
