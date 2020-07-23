webpackJsonp([6],{

/***/ 709:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PairedDevicesPageModule", function() { return PairedDevicesPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(87);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__paired_devices__ = __webpack_require__(724);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var PairedDevicesPageModule = /** @class */ (function () {
    function PairedDevicesPageModule() {
    }
    PairedDevicesPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__paired_devices__["a" /* PairedDevicesPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__paired_devices__["a" /* PairedDevicesPage */]),
            ],
        })
    ], PairedDevicesPageModule);
    return PairedDevicesPageModule;
}());

//# sourceMappingURL=paired-devices.module.js.map

/***/ }),

/***/ 724:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PairedDevicesPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(87);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_bluetooth_bluetooth_service__ = __webpack_require__(161);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_storage_storage_service__ = __webpack_require__(162);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ionic_angular_util_util__ = __webpack_require__(2);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var PairedDevicesPage = /** @class */ (function () {
    function PairedDevicesPage(btSvc, lsService, viewCtrl) {
        /*this.pairedDevices.push({id: 'Unknown', name: '00:A0:C9:14:C8', 'connected': true});
         this.pairedDevices.push({id: 'Unknown', name: '00:A0:C9:14:C8'});
         this.availableDevices.push({id: 'Unknown', name: '00:A0:C9:14:C8'});
         this.availableDevices.push({id: 'Unknown', name: '00:A0:C9:14:C8'});
         this.loading = true;
         this.searchResult = {
         message: 'no devices found.',
         type: 'warn'
         };*/
        this.btSvc = btSvc;
        this.lsService = lsService;
        this.viewCtrl = viewCtrl;
        this.pairedDevices = [];
        this.availableDevices = [];
        this.searchResult = {
            message: '',
            type: ''
        };
        this.result = [];
    }
    PairedDevicesPage.prototype.ngOnInit = function () {
        this.init();
    };
    PairedDevicesPage.prototype.init = function () {
        var _this = this;
        this.lsService.getPairedDevices().then(function (devices) {
            if (devices != null && Object(__WEBPACK_IMPORTED_MODULE_4_ionic_angular_util_util__["e" /* isArray */])(devices)) {
                _this.pairedDevices = devices;
            }
        });
    };
    PairedDevicesPage.prototype.turnOnBluetooth = function () {
        var _this = this;
        this.btSvc.turnOnBluetooth().then(function (sucess) {
            if (sucess === 'BLUETOOTH.ALREADY_AVAILABLE') {
                _this.searchResult = { message: 'bluetooth is already turned on.', type: 'warn' };
            }
            else {
                _this.searchResult = { message: 'bluetooth turned on.', type: '' };
            }
        }).catch(function (fail) {
            if (fail === 'BLUETOOTH.ALREADY_AVAILABLE') {
                _this.searchResult = { message: 'no devices found.', type: 'warn' };
            }
            else {
                _this.searchResult = { message: 'bluetooth not available.', type: 'warn' };
            }
        });
    };
    PairedDevicesPage.prototype.startListening = function () {
        var _this = this;
        this.btSvc.startListen('Start').then(function (data) {
            _this.searchResult = { message: 'start listening.', type: '' };
            _this.btSvc.tagdata.subscribe(function (data) {
                _this.searchResult = { message: JSON.stringify(data), type: 'info' };
            });
        }).catch(function (fail) {
            _this.searchResult = { message: 'scanner not connected.', type: 'warn' };
        });
    };
    PairedDevicesPage.prototype.searchDevices = function () {
        var _this = this;
        this.loading = true;
        this.btSvc.searchBluetooth().then(function (devices) {
            if (devices && Object(__WEBPACK_IMPORTED_MODULE_4_ionic_angular_util_util__["e" /* isArray */])(devices)) {
                _this.availableDevices = _this.removeDuplicates(devices);
            }
            _this.searchResult = { message: _this.availableDevices.length + ' new bluetooth devices found.', type: '' };
            _this.loading = false;
        }).catch(function (fail) {
            if (fail === 'BLUETOOTH.NO_DEVICES_FOUND') {
                _this.searchResult = { message: 'no devices found.', type: 'warn' };
            }
            else {
                _this.searchResult = { message: 'bluetooth not available.', type: 'warn' };
            }
            _this.loading = false;
        });
    };
    PairedDevicesPage.prototype.removeDuplicates = function (devices) {
        var filtered = [];
        devices.forEach(function (d) {
            var index = filtered.findIndex(function (fd) { return fd.id === d.id; });
            if (index === -1) {
                if (!d['name'] || d['name'] === '') {
                    d['name'] = 'Unknown';
                }
                filtered.push(d);
            }
        });
        return filtered;
    };
    PairedDevicesPage.prototype.connectDevice = function (device) {
        var _this = this;
        this.loading = true;
        this.pairedDevices.forEach(function (device) {
            device['connected'] = false;
        });
        this.btSvc.deviceConnection(device).then(function (data) {
            device['connected'] = true;
            var index = _this.pairedDevices.findIndex(function (d) { return d.id === device.id; });
            if (index === -1) {
                _this.pairedDevices.push(device);
            }
            _this.searchResult = { message: device['name'] + ' successfully connected.', type: '' };
            _this.startListening();
            _this.loading = false;
        }).catch(function (fail) {
            _this.searchResult = { message: 'cannot connect device.', type: 'warn' };
            _this.loading = false;
        });
    };
    PairedDevicesPage.prototype.closeModal = function () {
        this.viewCtrl.dismiss();
    };
    PairedDevicesPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-paired-devices',template:/*ion-inline-start:"/home/nisitha/dev/myApp/src/pages/paired-devices/paired-devices.html"*/'<!--\n  Generated template for the PairedDevicesPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n  <ion-navbar color="dark">\n    <ion-row class="r-modal-header">\n      <ion-col class="header-text">Bluetooth Scanning</ion-col>\n      <ion-col class="header-spinner"><ion-spinner *ngIf="loading" name="circles"></ion-spinner></ion-col>\n    </ion-row>\n  </ion-navbar>\n</ion-header>\n<ion-content padding>\n  <ion-grid class="grid-content">\n    <ion-row class="text-black" [ngClass]="{\'warn\': searchResult.type === \'warn\'}">\n      <ion-icon name="alert"></ion-icon>{{searchResult.message}}\n    </ion-row>\n    <ion-row>\n      <ion-col class="panel-text">PAIRED DEVICES</ion-col>\n    </ion-row>\n\n    <ion-row class="panel" *ngFor="let device of pairedDevices" (click)="connectDevice(device)">\n      <div ><ion-icon class="panel-icon" name="bluetooth"></ion-icon></div>\n      <div class="flx-1" [ngClass]="{\'dev-connected\': device[\'connected\']}">{{device.name}}</div>\n      <div>{{device.id}}</div>\n    </ion-row>\n\n    <ion-row>\n      <ion-col class="panel-text">AVAILABLE DEVICES</ion-col>\n    </ion-row>\n    <ion-row class="panel" *ngFor="let device of availableDevices" (click)="connectDevice(device)">\n      <div col-1>\n        <ion-icon class="panel-icon" name="bluetooth"></ion-icon></div>\n      <div class="flx-1">{{device.name}}</div>\n      <div>{{device.id}}</div>\n    </ion-row>\n  </ion-grid>\n  <!--\n  <ion-col><button ion-button (click)="turnOnBluetooth()" class="bluetooth-btn"><ion-icon name="bluetooth"></ion-icon></button></ion-col>\n-->\n</ion-content>\n<ion-footer>\n  <ion-grid>\n    <ion-row>\n      <ion-col class="panel-btn-group">\n        <!--<button ion-button (click)="startListening()">START</button>-->\n        <button ion-button (click)="searchDevices()" class="scan-btn">SCAN</button>\n        <button ion-button (click)="closeModal()" color="dark">DONE</button>\n      </ion-col>\n    </ion-row></ion-grid>\n</ion-footer>\n'/*ion-inline-end:"/home/nisitha/dev/myApp/src/pages/paired-devices/paired-devices.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__providers_bluetooth_bluetooth_service__["a" /* BluetoothService */], __WEBPACK_IMPORTED_MODULE_3__providers_storage_storage_service__["a" /* StorageService */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* ViewController */]])
    ], PairedDevicesPage);
    return PairedDevicesPage;
}());

//# sourceMappingURL=paired-devices.js.map

/***/ })

});
//# sourceMappingURL=6.js.map