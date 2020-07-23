import {Component, OnInit} from '@angular/core';
import {
  IonicPage, NavController, NavParams, LoadingController, AlertController, Loading,
  ViewController
} from 'ionic-angular';
import {BluetoothService} from "../../providers/bluetooth/bluetooth.service";
import {StorageService} from "../../providers/storage/storage.service";
import {isArray} from "ionic-angular/util/util";

@IonicPage()
@Component({
  selector: 'page-paired-devices',
  templateUrl: 'paired-devices.html'
})
export class PairedDevicesPage implements OnInit {
  public pairedDevices: any[] = [];
  public availableDevices: any[] = [];
  public searchResult = {
    message: '',
    type: ''
  };
  public loading: boolean;
  public result: string[] = [];
  constructor(private btSvc: BluetoothService, private lsService: StorageService, private viewCtrl: ViewController) {
    /*this.pairedDevices.push({id: 'Unknown', name: '00:A0:C9:14:C8', 'connected': true});
     this.pairedDevices.push({id: 'Unknown', name: '00:A0:C9:14:C8'});
     this.availableDevices.push({id: 'Unknown', name: '00:A0:C9:14:C8'});
     this.availableDevices.push({id: 'Unknown', name: '00:A0:C9:14:C8'});
     this.loading = true;
     this.searchResult = {
     message: 'no devices found.',
     type: 'warn'
     };*/

  }

  ngOnInit() {
    this.init();
  }
  init() {
    this.lsService.getPairedDevices().then(devices => {
      if (devices != null && isArray(devices)) {
        this.pairedDevices = devices;
      }
    })
  }

  turnOnBluetooth() {
    this.btSvc.turnOnBluetooth().then(sucess => {
      if (sucess === 'BLUETOOTH.ALREADY_AVAILABLE') {
        this.searchResult = { message: 'bluetooth is already turned on.' , type: 'warn'};
      }  else {
        this.searchResult = { message: 'bluetooth turned on.' , type: ''}
      }
    }).catch(fail => {
      if (fail === 'BLUETOOTH.ALREADY_AVAILABLE') {
        this.searchResult = { message: 'no devices found.' , type: 'warn'};
      }  else {
        this.searchResult = { message: 'bluetooth not available.' , type: 'warn'};
      }
    });
  }

  startListening() {
    this.btSvc.startListen('Start').then(data => {
      this.searchResult = { message: 'start listening.' , type: ''};
      this.btSvc.tagdata.subscribe(data => {
        this.searchResult = { message: JSON.stringify(data) , type: 'info'};
      })
    }).catch(fail => {
      this.searchResult = { message: 'scanner not connected.' , type: 'warn'};
    })
  }
  searchDevices() {
    this.loading = true;
    this.btSvc.searchBluetooth().then((devices: Array<Object>) => {
      if (devices && isArray(devices)) {
        this.availableDevices = this.removeDuplicates(devices);
      }
      this.searchResult = { message: this.availableDevices.length + ' new bluetooth devices found.' , type: ''};
      this.loading = false;
    }).catch(fail => {
      if (fail === 'BLUETOOTH.NO_DEVICES_FOUND') {
        this.searchResult = { message: 'no devices found.' , type: 'warn'};
      }  else {
        this.searchResult = { message: 'bluetooth not available.' , type: 'warn'};
      }
      this.loading = false;

    });
  }

  removeDuplicates(devices: any[]): any[] {
    let filtered = [];
    devices.forEach(d => {
      let index = filtered.findIndex(fd => fd.id === d.id);
      if (index === -1) {
        if (!d['name'] || d['name'] === '') {
          d['name'] = 'Unknown'
        }
        filtered.push(d);
      }
    });
    return filtered;
  }
  connectDevice(device: any) {
    this.loading = true;
    this.pairedDevices.forEach(device => {
      device['connected'] = false;
    });
    this.btSvc.deviceConnection(device).then(data => {
      device['connected'] = true;
      let index = this.pairedDevices.findIndex(d => d.id === device.id);
      if (index === -1 ) {
        this.pairedDevices.push(device);
      }
      this.searchResult = { message: device['name'] + ' successfully connected.' , type: ''};
      this.startListening();
      this.loading = false;
    }).catch(fail => {
      this.searchResult = {message: 'cannot connect device.' , type: 'warn'};
      this.loading = false;

    });
  }

  closeModal() {
    this.viewCtrl.dismiss();

  }
}

