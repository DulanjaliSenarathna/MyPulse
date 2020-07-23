
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import {BluetoothId} from '../models/models';
import {isArray} from "ionic-angular/util/util";

@Injectable()
export class StorageService {

  BTP_DEVICES = 'btp_devices';
  constructor(public storage: Storage) {}

  async getPairedDevices(): Promise<any> {
    let devices = await this.storage.get(this.BTP_DEVICES);
    return (devices) ? devices : null;
  }

  async setAllDisconnected() : Promise<any>{
    let devices = await this.getPairedDevices();
    if (devices !== null && isArray(devices)) {
      devices.forEach(d => {
        d['connected'] = false;
      });
    }
    return this.storage.set(this.BTP_DEVICES, devices)
  }

  async setBluetoothId(device: BluetoothId): Promise<any> {
    let devices = await this.getPairedDevices();
    let index = -1;
    if (devices !== null && isArray(devices)) {
      devices.forEach(d => {
        d['latest'] = false;
      });
      index = devices.findIndex(d => d.id === device.id);
    } else {
      devices = [];
    }

    if (index < 0) {
      device['latest'] = true;
      devices.push(device);
    } else {
      devices[index]['latest'] = true;
    }
    return await this.storage.set(this.BTP_DEVICES, devices);

  }


}
