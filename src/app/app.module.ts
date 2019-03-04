import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { DocumentViewer } from '@ionic-native/document-viewer';
import { File } from '@ionic-native/file';
import { FileTransfer } from '@ionic-native/file-transfer';
import { FileOpener } from '@ionic-native/file-opener';
import { HttpModule, Headers, Http } from '@angular/http';


import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ScanPage } from '../pages/scan/scan';
import { UserdataPage } from '../pages/userdata/userdata';
import { ResultPage } from '../pages/result/result';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ScanPage,
    UserdataPage,
    ResultPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ScanPage,
    UserdataPage,
    ResultPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    BarcodeScanner,
    DocumentViewer,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    File,
    FileTransfer,
    FileOpener
  ]
})
export class AppModule {}
