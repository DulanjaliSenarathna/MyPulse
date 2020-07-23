webpackJsonp([12],{

/***/ 703:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "InstructionPageModule", function() { return InstructionPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(87);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__instruction__ = __webpack_require__(718);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var InstructionPageModule = /** @class */ (function () {
    function InstructionPageModule() {
    }
    InstructionPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__instruction__["a" /* InstructionPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__instruction__["a" /* InstructionPage */]),
            ],
        })
    ], InstructionPageModule);
    return InstructionPageModule;
}());

//# sourceMappingURL=instruction.module.js.map

/***/ }),

/***/ 718:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return InstructionPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(87);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


/**
 * Generated class for the InstructionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var InstructionPage = /** @class */ (function () {
    function InstructionPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
    }
    InstructionPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad InstructionPage');
    };
    InstructionPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-instruction',template:/*ion-inline-start:"/home/nisitha/dev/myApp/src/pages/instruction/instruction.html"*/'<!--\n  Generated template for the InstructionPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n  <ion-navbar color="dark">\n    <ion-row class="r-modal-header">\n      <ion-col class="header-text">Instructions</ion-col>\n    </ion-row>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding class="cus-content">\n  <ion-list>\n    <ion-item>\n      <ion-label class="cus-text" text-wrap>1. Try to stay calm and have sit or lay down.</ion-label>\n    </ion-item>\n    <ion-item>\n      <ion-label class="cus-text" text-wrap>2. If you are not allergic to aspirin, take a baby aspirin chew and swallow faster.</ion-label>\n    </ion-item>\n    <ion-item>\n      <ion-label class="cus-text" text-wrap>3. If your doctor has prescribed to take nitroglycerin, take it directly and make sure it\'s not someone else.</ion-label>\n    </ion-item>\n    <ion-item>\n      <ion-label class="cus-text" text-wrap>4. Take prescribed medicine if you have.</ion-label>\n    </ion-item>\n    <ion-item>\n      <ion-label class="cus-text" text-wrap>5. Be relax and avoid exerding yourself.</ion-label>\n    </ion-item>\n    <ion-item>\n      <ion-label class="cus-text">6. Aim to remain as calm as you can.</ion-label>\n    </ion-item>\n  </ion-list>\n\n</ion-content>\n'/*ion-inline-end:"/home/nisitha/dev/myApp/src/pages/instruction/instruction.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavParams */]])
    ], InstructionPage);
    return InstructionPage;
}());

//# sourceMappingURL=instruction.js.map

/***/ })

});
//# sourceMappingURL=12.js.map