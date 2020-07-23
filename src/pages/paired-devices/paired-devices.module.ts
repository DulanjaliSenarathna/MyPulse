import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PairedDevicesPage } from './paired-devices';

@NgModule({
  declarations: [
    PairedDevicesPage,
  ],
  imports: [
    IonicPageModule.forChild(PairedDevicesPage),
  ],
})
export class PairedDevicesPageModule {}
