"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("pages/index",{

/***/ "./src/features/auth/authSlice.ts":
/*!****************************************!*\
  !*** ./src/features/auth/authSlice.ts ***!
  \****************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"reset\": function() { return /* binding */ reset; }\n/* harmony export */ });\n/* harmony import */ var _reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @reduxjs/toolkit */ \"./node_modules/@reduxjs/toolkit/dist/redux-toolkit.esm.js\");\n/* harmony import */ var _util_localStorage__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../util/localStorage */ \"./src/util/localStorage.tsx\");\n\n\nvar _localStorage_getItem;\nconst user = JSON.parse((_localStorage_getItem = _util_localStorage__WEBPACK_IMPORTED_MODULE_0__[\"default\"].getItem(\"user\")) !== null && _localStorage_getItem !== void 0 ? _localStorage_getItem : \"\");\nconst initialState = {\n    user: user,\n    isError: false,\n    isSuccess: false,\n    isLoading: false,\n    message: \"\"\n};\nconst authSlice = (0,_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_1__.createSlice)({\n    name: \"auth\",\n    initialState,\n    reducers: {\n        reset: (state)=>{\n            state.user = null;\n            state.isError = false;\n            state.isSuccess = false;\n            state.isLoading = false;\n            state.message = \"\";\n        }\n    },\n    extraReducers: ()=>{}\n});\nconst { reset  } = authSlice.actions;\n/* harmony default export */ __webpack_exports__[\"default\"] = (authSlice.reducer);\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports on update so we can compare the boundary\n                // signatures.\n                module.hot.dispose(function (data) {\n                    data.prevExports = currentExports;\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevExports !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevExports !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvZmVhdHVyZXMvYXV0aC9hdXRoU2xpY2UudHMuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQStEO0FBQ1o7SUFFM0JDO0FBQXhCLE1BQU1DLE9BQU9DLEtBQUtDLEtBQUssQ0FBQ0gsQ0FBQUEsd0JBQUFBLGtFQUFvQixDQUFDLHFCQUFyQkEsbUNBQUFBLHdCQUFnQyxFQUFFO0FBVTFELE1BQU1LLGVBQTBCO0lBQzVCSixNQUFNQTtJQUNOSyxTQUFTLEtBQUs7SUFDZEMsV0FBVyxLQUFLO0lBQ2hCQyxXQUFXLEtBQUs7SUFDaEJDLFNBQVM7QUFDYjtBQUVBLE1BQU1DLFlBQVlYLDZEQUFXQSxDQUFDO0lBQzFCWSxNQUFNO0lBQ05OO0lBQ0FPLFVBQVU7UUFDTkMsT0FBT0MsQ0FBQUEsUUFBUztZQUNaQSxNQUFNYixJQUFJLEdBQUcsSUFBSTtZQUNqQmEsTUFBTVIsT0FBTyxHQUFHLEtBQUs7WUFDckJRLE1BQU1QLFNBQVMsR0FBRyxLQUFLO1lBQ3ZCTyxNQUFNTixTQUFTLEdBQUcsS0FBSztZQUN2Qk0sTUFBTUwsT0FBTyxHQUFHO1FBQ3BCO0lBQ0o7SUFDQU0sZUFBZSxJQUFNLENBRXJCO0FBQ0o7QUFFTyxNQUFNLEVBQUNGLE1BQUssRUFBQyxHQUFHSCxVQUFVTSxPQUFPLENBQUM7QUFDekMsK0RBQWVOLFVBQVVPLE9BQU8sRUFBQyIsInNvdXJjZXMiOlsid2VicGFjazovL19OX0UvLi9zcmMvZmVhdHVyZXMvYXV0aC9hdXRoU2xpY2UudHM/Y2Y4ZCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge2NyZWF0ZVNsaWNlLCBjcmVhdGVBc3luY1RodW5rfSBmcm9tIFwiQHJlZHV4anMvdG9vbGtpdFwiO1xyXG5pbXBvcnQgbG9jYWxTdG9yYWdlIGZyb20gXCIuLi8uLi91dGlsL2xvY2FsU3RvcmFnZVwiO1xyXG5cclxuY29uc3QgdXNlciA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJ1c2VyXCIpID8/IFwiXCIpO1xyXG5cclxuaW50ZXJmYWNlIGF1dGhTdGF0ZSB7XHJcbiAgICB1c2VyOiBzdHJpbmcgfCBudWxsO1xyXG4gICAgaXNFcnJvcjogYm9vbGVhbjtcclxuICAgIGlzU3VjY2VzczogYm9vbGVhbjtcclxuICAgIGlzTG9hZGluZzogYm9vbGVhbjtcclxuICAgIG1lc3NhZ2U6IHN0cmluZztcclxufVxyXG5cclxuY29uc3QgaW5pdGlhbFN0YXRlOiBhdXRoU3RhdGUgPSB7XHJcbiAgICB1c2VyOiB1c2VyLFxyXG4gICAgaXNFcnJvcjogZmFsc2UsXHJcbiAgICBpc1N1Y2Nlc3M6IGZhbHNlLFxyXG4gICAgaXNMb2FkaW5nOiBmYWxzZSxcclxuICAgIG1lc3NhZ2U6IFwiXCJcclxufTtcclxuXHJcbmNvbnN0IGF1dGhTbGljZSA9IGNyZWF0ZVNsaWNlKHtcclxuICAgIG5hbWU6IFwiYXV0aFwiLFxyXG4gICAgaW5pdGlhbFN0YXRlLFxyXG4gICAgcmVkdWNlcnM6IHtcclxuICAgICAgICByZXNldDogc3RhdGUgPT4ge1xyXG4gICAgICAgICAgICBzdGF0ZS51c2VyID0gbnVsbDtcclxuICAgICAgICAgICAgc3RhdGUuaXNFcnJvciA9IGZhbHNlO1xyXG4gICAgICAgICAgICBzdGF0ZS5pc1N1Y2Nlc3MgPSBmYWxzZTtcclxuICAgICAgICAgICAgc3RhdGUuaXNMb2FkaW5nID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHN0YXRlLm1lc3NhZ2UgPSBcIlwiO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBleHRyYVJlZHVjZXJzOiAoKSA9PiB7XHJcbiAgICAgICAgXHJcbiAgICB9XHJcbn0pO1xyXG5cclxuZXhwb3J0IGNvbnN0IHtyZXNldH0gPSBhdXRoU2xpY2UuYWN0aW9ucztcclxuZXhwb3J0IGRlZmF1bHQgYXV0aFNsaWNlLnJlZHVjZXI7Il0sIm5hbWVzIjpbImNyZWF0ZVNsaWNlIiwibG9jYWxTdG9yYWdlIiwidXNlciIsIkpTT04iLCJwYXJzZSIsImdldEl0ZW0iLCJpbml0aWFsU3RhdGUiLCJpc0Vycm9yIiwiaXNTdWNjZXNzIiwiaXNMb2FkaW5nIiwibWVzc2FnZSIsImF1dGhTbGljZSIsIm5hbWUiLCJyZWR1Y2VycyIsInJlc2V0Iiwic3RhdGUiLCJleHRyYVJlZHVjZXJzIiwiYWN0aW9ucyIsInJlZHVjZXIiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/features/auth/authSlice.ts\n"));

/***/ })

});