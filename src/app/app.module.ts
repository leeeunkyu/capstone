import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule,ModalController,ViewController,LoadingController} from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpModule } from '@angular/http';
import { ImagePicker } from '@ionic-native/image-picker';
import { MyApp } from './app.component';
//import { IonicNativePlugin } from '@ionic-native/core'
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';
import { MainPage } from '../pages/main-page/main-page';
import {Frameselect} from '../pages/frameselect/frameselect'
import { PhotoselectPage } from '../pages/photoselect/photoselect';
import { Transfer, FileUploadOptions, TransferObject } from '@ionic-native/transfer';
import { File } from '@ionic-native/file';
import { Toast } from '@ionic-native/toast';
import { SocialSharing } from '@ionic-native/social-sharing';

@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    RegisterPage,
    MainPage,
    PhotoselectPage,
    Frameselect
  ],
  imports: [
    HttpModule,
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    RegisterPage,
    MainPage,
    PhotoselectPage,
    Frameselect
  ],
  providers: [
    StatusBar,LoadingController,
    SplashScreen,ImagePicker,Transfer,File,Toast,ModalController,LoginPage,SocialSharing,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
