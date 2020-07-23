webpackJsonp([0],{

/***/ 715:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WelcomePageModule", function() { return WelcomePageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ngx_translate_core__ = __webpack_require__(159);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(87);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__welcome__ = __webpack_require__(730);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var WelcomePageModule = /** @class */ (function () {
    function WelcomePageModule() {
    }
    WelcomePageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_3__welcome__["a" /* WelcomePage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["f" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_3__welcome__["a" /* WelcomePage */]),
                __WEBPACK_IMPORTED_MODULE_1__ngx_translate_core__["b" /* TranslateModule */].forChild()
            ],
            exports: [
                __WEBPACK_IMPORTED_MODULE_3__welcome__["a" /* WelcomePage */]
            ]
        })
    ], WelcomePageModule);
    return WelcomePageModule;
}());

//# sourceMappingURL=welcome.module.js.map

/***/ }),

/***/ 730:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return WelcomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(87);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_bluetooth_bluetooth_service__ = __webpack_require__(161);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_storage_storage_service__ = __webpack_require__(162);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_call_number__ = __webpack_require__(374);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_scanner_listener__ = __webpack_require__(375);
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
 * The Welcome Page is a splash page that quickly describes the app,
 * and then directs the user to create an account or log in.
 * If you'd like to immediately put the user onto a login/signup page,
 * we recommend not using the Welcome page.
 */
var WelcomePage = /** @class */ (function () {
    function WelcomePage(navCtrl, loadingController, alertCtrl, bluetooth, storage, callN, btScanner) {
        this.navCtrl = navCtrl;
        this.loadingController = loadingController;
        this.alertCtrl = alertCtrl;
        this.bluetooth = bluetooth;
        this.storage = storage;
        this.callN = callN;
        this.btScanner = btScanner;
        this.messages = 0;
        this.message = '';
        this.devices = [];
        this.isConnected = false;
        this.floatingItems = [{
                name: 'bluetooth settings',
                type: 'bluetooth',
                icon: 'bluetooth'
            },
            {
                name: 'instructions',
                type: 'instructions',
                icon: 'list'
            }];
    }
    WelcomePage.prototype.ionViewWillEnter = function () {
        this.subscribeToData();
    };
    WelcomePage.prototype.subscribeToData = function () {
        var _this = this;
        if (!this.updateSub || (this.updateSub && this.updateSub.closed)) {
            this.updateSub = this.btScanner.scannerEventPublisher().subscribe(function (args) {
                if (args && args.data) {
                    var msg = JSON.stringify('' + args.data);
                    _this.messages = parseInt(JSON.parse(msg));
                    console.log('data recived ----------->> ' + _this.messages);
                }
            });
        }
    };
    WelcomePage.prototype.goToInstruction = function () {
        this.navCtrl.push('InstructionPage');
    };
    WelcomePage.prototype.login = function () {
        this.navCtrl.push('LoginPage');
    };
    WelcomePage.prototype.signup = function () {
        this.navCtrl.push('SignupPage');
    };
    WelcomePage.prototype.openPairingPage = function () {
        this.navCtrl.push('PairedDevicesPage');
    };
    WelcomePage.prototype.emergencyCall = function () {
        this.callN.callNumber("1990", true)
            .then(function (res) { return console.log('Launched dialer!', res); })
            .catch(function (err) { return console.log('Error launching dialer', err); });
    };
    WelcomePage.prototype.floatingMenuHandler = function (config) {
        try {
            switch (config.type) {
                case 'bluetooth': {
                    this.navCtrl.push('PairedDevicesPage');
                    break;
                }
                case 'instructions': {
                    this.navCtrl.push('InstructionPage');
                    break;
                }
            }
        }
        catch (e) {
        }
    };
    WelcomePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-welcome',template:/*ion-inline-start:"/home/nisitha/dev/myApp/src/pages/welcome/welcome.html"*/'<ion-content scroll="false">\n  <div class="splash-bg"></div>\n  <div class="splash-info">\n    <div class="splash-logo"></div>\n    <div class="splash-intro">\n      {{ \'WELCOME_INTRO\' | translate }}\n    </div>\n  </div>\n  <div>\n    <ion-grid>\n      <ion-row>\n        <ion-col col-2></ion-col>\n      <ion-col col-5>NORMAL HEART RATE</ion-col>\n      <ion-col col-4>60 - 100</ion-col>\n        <ion-col col-1></ion-col>\n\n      </ion-row>\n      <ion-row>\n        <ion-col col-2></ion-col>\n        <ion-col col-5 class="h-rate">YOUR HEART RATE</ion-col>\n        <ion-input class="cut-input" type="number" [(ngModel)]="messages" disabled></ion-input>\n        <ion-col col-1></ion-col>\n      </ion-row>\n    </ion-grid>\n  </div>\n  <div padding>\n    <button ion-button block (click)="emergencyCall()" class="em-call"><ion-icon class="panel-icon call-icon" name="call"></ion-icon>{{ \'EMERGENCY_CALL\' | translate }}</button>\n  </div>\n  <ion-fab left bottom class="flting-btn-main">\n    <button ion-fab color="dark">\n      <ion-icon name="arrow-dropright"></ion-icon>\n    </button>\n  <ion-fab-list side="right">\n    <button class="sub-btn" color="dark" ion-fab *ngFor="let item of floatingItems" [title]="item.name"\n            (click)="floatingMenuHandler(item)">\n      <ion-icon [name]="item.icon"></ion-icon>\n    </button>\n  </ion-fab-list>\n  </ion-fab>\n</ion-content>\n'/*ion-inline-end:"/home/nisitha/dev/myApp/src/pages/welcome/welcome.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_2__providers_bluetooth_bluetooth_service__["a" /* BluetoothService */], __WEBPACK_IMPORTED_MODULE_3__providers_storage_storage_service__["a" /* StorageService */], __WEBPACK_IMPORTED_MODULE_4__ionic_native_call_number__["a" /* CallNumber */],
            __WEBPACK_IMPORTED_MODULE_5__providers_scanner_listener__["a" /* ScannerListenerProvider */]])
    ], WelcomePage);
    return WelcomePage;
}());

//# sourceMappingURL=welcome.js.map

/***/ })

});
//# sourceMappingURL=0.js.map