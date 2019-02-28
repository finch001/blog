(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["demo101"],{

/***/ "./bar.js":
/*!****************!*\
  !*** ./bar.js ***!
  \****************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
console.log(' i am in bar');

/* harmony default export */ __webpack_exports__["default"] = (42);


/***/ }),

/***/ "./foo.js":
/*!****************!*\
  !*** ./foo.js ***!
  \****************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _bar__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./bar */ "./bar.js");


console.log("i'm in foo~");
console.log(`got ${_bar__WEBPACK_IMPORTED_MODULE_0__["default"]} fron bar`);

/***/ })

},[["./foo.js","runtime"]]]);