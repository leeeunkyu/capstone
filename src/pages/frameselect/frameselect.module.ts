import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { Frameselect } from './frameselect';

@NgModule({
  declarations: [
    Frameselect,
  ],
  imports: [
    //IonicModule.forChild(Frameselect),
  ],
  exports: [
    Frameselect
  ]
})
export class FrameselectModule {}
