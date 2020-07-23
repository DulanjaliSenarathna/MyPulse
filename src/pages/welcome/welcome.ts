import {Component, OnInit, OnDestroy} from '@angular/core';
import {IonicPage, NavController, LoadingController, AlertController} from 'ionic-angular';
import {BluetoothService} from "../../providers/bluetooth/bluetooth.service";
import {StorageService} from "../../providers/storage/storage.service";
import {CallNumber} from "@ionic-native/call-number";
import {Subscription} from "rxjs";
import {ScannerListenerProvider} from "../../providers/scanner-listener";

/**
 * The Welcome Page is a splash page that quickly describes the app,
 * and then directs the user to create an account or log in.
 * If you'd like to immediately put the user onto a login/signup page,
 * we recommend not using the Welcome page.
 */
@IonicPage()
@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html'
})
export class WelcomePage {

  messages = 0;
  message = '';
  devices: any[] = [];
  isConnected = false;
  connStatus: string;
  updateSub: Subscription;
  floatingItems = [{
    name: 'bluetooth settings',
    type: 'bluetooth',
    icon: 'bluetooth'
  },
    {
      name: 'instructions',
      type: 'instructions',
      icon: 'list'
    }];

  constructor(public navCtrl: NavController, public loadingController: LoadingController, public alertCtrl: AlertController,
              private bluetooth: BluetoothService, private storage: StorageService, private callN: CallNumber,
              private btScanner:ScannerListenerProvider) {
  }

  ionViewWillEnter() {
    this.subscribeToData();
  }

  subscribeToData() {
    if (!this.updateSub || (this.updateSub && this.updateSub.closed)) {
      this.updateSub = this.btScanner.scannerEventPublisher().subscribe((args: any) => {
        if (args && args.data) {
          let msg =  JSON.stringify('' + args.data);
          this.messages = parseInt(JSON.parse(msg));
          console.log('data recived ----------->> ' + this.messages);
        }
      });
    }
  }

  goToInstruction() {
    this.navCtrl.push('InstructionPage');
  }

  login() {
    this.navCtrl.push('LoginPage');
  }

  signup() {
    this.navCtrl.push('SignupPage');
  }

  openPairingPage() {
    this.navCtrl.push('PairedDevicesPage');
  }

  emergencyCall() {
    this.callN.callNumber("1990", true)
      .then(res => console.log('Launched dialer!', res))
      .catch(err => console.log('Error launching dialer', err));
  }
  public floatingMenuHandler(config) {
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
    } catch (e) {
    }
  }
}
