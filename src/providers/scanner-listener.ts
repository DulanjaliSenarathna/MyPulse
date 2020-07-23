import { Injectable } from '@angular/core';
import {Subject, Observable, Subscription} from 'rxjs';
import {BluetoothService} from "./bluetooth/bluetooth.service";

/*
 Generated class for the ScannerListenerProvider provider.

 See https://angular.io/guide/dependency-injection for more info on providers
 and Angular DI.
 */
@Injectable()
export class ScannerListenerProvider {

    private scannerEvent: Subject<any>;

    constructor(private btService: BluetoothService) {
        this.scannerEvent = new Subject<any>();
        this.subscribeToBT();
    }


    public scannerEventPublisher(): Observable<any> {
        return this.scannerEvent.asObservable();
    }

    initScannerListener () {
        this.scannerEvent = new Subject<any>();
    }

    subscribeToBT() {
      this.btService.tagdata.subscribe(args => {
        this.scannerEvent.next({ data: args.data, rawValue: args });
      });
    }

}
