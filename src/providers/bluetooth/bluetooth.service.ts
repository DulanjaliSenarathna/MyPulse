
import {Injectable} from '@angular/core';
import {BluetoothSerial} from '@ionic-native/bluetooth-serial';
import {Subject, Observable, Subscription} from 'rxjs';
import {mergeMap} from 'rxjs/operators';
import {from} from 'rxjs/observable/from';
import {AlertController} from 'ionic-angular';
import {BluetoothId} from "../models/models";
import {StorageService} from "../storage/storage.service";
import {LocalNotifications} from '@ionic-native/local-notifications';

@Injectable()
export class BluetoothService {
  private connection: Subscription;
  private connectionCommunication: Subscription;
  public reader: Observable<any>;
  public datalog = new Subject<any>();
  private devices: any[] = [];
  private data_u = new Subject();
  public readonly tagdata: Observable<any> = this.data_u.asObservable();
  public messageRecived = '';
  public newBufferStarted = false;
  private bListeningStarted: boolean;
  public temp = 0;

  constructor(private bluetoothSerial: BluetoothSerial,
              private storage: StorageService,
              private alertCtrl: AlertController,
              private localNotifications: LocalNotifications) {
    this.startBluetoothScanner();
    //this.sendNotification();

    /*setInterval(() => {
      this.data_u.next({topic: 'start', data: this.temp , rawValue: this.messageRecived});
      this.temp = this.temp + 1;
    }, 1000)*/
  }


  isHeartRateIsAbnormal(currentRate) {
    if (currentRate > 90 || currentRate < 50) {
      this.sendNotification();
    }

  }

  sendNotification() {
    this.localNotifications.schedule({
      id: 1,
      title: 'Warning !',
      text: 'ABNORMAL heart rate detected.please follow the instructions.'
    });
  }

  public scannerEventPublisher(): Observable<any> {
    return this.data_u.asObservable();
  }

  ngOnDestroy(): void {
    this.disconnect().then(response => {
    });
    this.storage.setAllDisconnected().then(response => {
    });
  }


  startBluetoothScanner() {
    this.turnOnBluetooth().then(sucess => {
      this.storage.getPairedDevices().then((devices) => {
        if (devices !== null && devices.length === 1) {
          this.deviceConnection(devices[0]).then(data => {
            let alert = this.alertCtrl.create({
              title: 'Success!',
              message: 'Reconnected to paired device : ' + devices[0]['id'] + ' .'
            });
            alert.present();
            if (!this.bListeningStarted) {
              this.startListen('Start').then(data => {
                this.bListeningStarted = true;
              });
            }
            setTimeout(() => {
              alert.dismiss();
            }, 300);

          }).catch(fail => {
            let alert = this.alertCtrl.create({
              title: 'Failed!',
              message: 'Failed to connect paired device!.',
              buttons: ['Ok']
            });
            alert.present();
          });
        } else if (devices !== null && devices.length > 0) {
          let index = devices.findIndex(d => d['latest'] === true);
          if (index > -1) {
            this.deviceConnection(devices[index]).then(data => {
              let alert = this.alertCtrl.create({
                title: 'Success!',
                message: 'Reconnected to paired device : ' + devices[index]['id'] + ' .'
              });
              if (!this.bListeningStarted) {

                this.startListen('Start').then(data => {
                  this.bListeningStarted = true;
                });
              }
              alert.present();
              setTimeout(() => {
                alert.dismiss();
              }, 300);
            }).catch(fail => {
              let alert = this.alertCtrl.create({
                title: 'Failed!',
                message: 'Failed to connect paired device!.',
                buttons: ['Ok']
              });
              alert.present();
            });
          }
        } else {
          this.openBluetoothSettingsPage();
        }
      }, (fail) => {
        this.openBluetoothSettingsPage();
      });
    }).catch(fail => {
    });

  }

  turnOnBluetooth(): Promise<Object> {
    return new Promise((resolve, reject) => {
      this.bluetoothSerial.isEnabled().then(() => {
        resolve('BLUETOOTH.ALREADY_AVAILABLE');
      }, () => {
        this.bluetoothSerial.enable().then(() => {
          resolve('BLUETOOTH.AVAILABLE');
        }, () => {
          reject('BLUETOOTH.NOT_AVAILABLE');
        });
      });
    });
  }

  searchBluetooth(): Promise<Object> {
    return new Promise((resolve, reject) => {
      this.bluetoothSerial.isEnabled().then(success => {
        this.bluetoothSerial.discoverUnpaired().then(response => {
          if (response.length > 0) {
            resolve(response);
          } else {
            reject('BLUETOOTH.NO_DEVICES_FOUND');
          }
        }).catch((error) => {
          reject('BLUETOOTH.NOT_AVAILABLE_IN_THIS_DEVICE');
        });
      }, fail => {
        reject('BLUETOOTH.NOT_AVAILABLE');
      });
    });
  }

  checkConnection() {
    return new Promise((resolve, reject) => {
      this.bluetoothSerial.isConnected().then(isConnected => {
        resolve('BLUETOOTH.CONNECTED');
      }, notConnected => {
        reject('BLUETOOTH.NOT_CONNECTED');
      });
    });
  }

  deviceConnection(id: BluetoothId): Promise<string> {
    return new Promise((resolve, reject) => {
      this.connection = this.bluetoothSerial.connect(id.id).subscribe(() => {
        this.storage.setBluetoothId(id);
        resolve('BLUETOOTH.CONNECTED');
      }, fail => {
        reject('BLUETOOTH.CANNOT_CONNECT');
      });
    });
  }

  disconnect(): Promise<boolean> {
    return new Promise((result) => {
      if (this.connectionCommunication) {
        this.connectionCommunication.unsubscribe();
      }
      if (this.connection) {
        this.connection.unsubscribe();
      }
      result(true);
    });
  }


  startListen(message: string): Promise<any> {
    return new Promise((resolve, reject) => {
      if (!this.reader) {
        this.bluetoothSerial.isConnected().then((isConnected) => {
          this.reader = from(this.bluetoothSerial.write(`${message}\n`)).pipe(mergeMap(() => {
            return this.bluetoothSerial.subscribeRawData();
          })).pipe(mergeMap(() => {
            return this.bluetoothSerial.read();
          }));
          this.reader.subscribe(data => {
            this.messageRecived = this.messageRecived + data;
            if (!this.newBufferStarted) {
              setTimeout(() => {
                console.log('console message recived ::  ' + this.messageRecived);
                let code = this.decodenTagBTQReader(this.messageRecived);
                if (code !== null) {
                  this.isHeartRateIsAbnormal(code.data);
                  this.data_u.next({topic: 'start', data: code.data, rawValue: this.messageRecived});
                }
                this.newBufferStarted = false;
                this.messageRecived = '';
              }, 800);
            }
            this.newBufferStarted = true;
          });
          resolve('BLUETOOTH.LISTENING');
        }, notConected => {
          reject('BLUETOOTH.NOT_CONNECTED');
        });
      } else {
        resolve('BLUETOOTH.LISTENING');
      }

    });
  }

  decodenTagBTQReader(tagData) {
    try {
      let arr = tagData;
      let ms = arr ? arr.replace('\r', '') : '';
      ms = arr ? arr.replace('\n', '') : '';
      let msg = 0;
      if (ms !== '' && !isNaN(parseInt(ms))) {
        msg = parseInt(ms);
      }
      let CODEJSON = {data: msg};
      return CODEJSON;
    } catch (e) {
      return null;
    }

  }


  dataInOut(message: string): Observable<any> {
    return Observable.create(observer => {
      this.bluetoothSerial.isConnected().then((isConnected) => {
        this.reader = from(this.bluetoothSerial.write(message)).pipe(mergeMap(() => {
          return this.bluetoothSerial.subscribeRawData();
        })).pipe(mergeMap(() => {
          return this.bluetoothSerial.read();
        }));
        this.reader.subscribe(data => {
          observer.next(data);
          this.datalog.next(data);
        });
      }, notConected => {
        observer.next('BLUETOOTH.NOT_CONNECTED');
        observer.complete();
      });
    });
  }


  storedConnection(): Promise <any> {
    return new Promise((resolve, reject) => {
      this.storage.getPairedDevices().then(devices => {
        let index = devices.findIndex(d => d['latest'] === true);
        if (index > -1) {
          this.deviceConnection(devices[index]['id']).then(success => {
            resolve(success);
          }, fail => {
            reject(fail);
          });
        }

      });
    });
  }

  openBluetoothSettingsPage() {
    // this.navCtrl.push('PairedDevicesPage');
  }
}

