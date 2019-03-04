import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { DocumentViewer, DocumentViewerOptions } from '@ionic-native/document-viewer';
import { File } from '@ionic-native/file';
import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer';
import { FileOpener } from '@ionic-native/file-opener';
import { Http } from '@angular/http';
import { HomePage } from '../home/home';

/**
 * Generated class for the ResultPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-result',
  templateUrl: 'result.html',
})


export class ResultPage {

  public id
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private document: DocumentViewer,
    public http: Http,
    private file: File,
    private transfer: FileTransfer,
    private fileOpener: FileOpener ) {
    this.id = navParams.get('foNumber');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ResultPage');
  }

  viewPdf(){
    let path = null;
    path = this.file.dataDirectory;
    console.log("Path..........", path);
    const options: DocumentViewerOptions = {
      title: `Document`,
      openWith: { enabled: false }
    };
    const transfer = this.transfer.create();
    transfer.download('http://192.168.43.228:8083/getpdf/8901207503931', path + 'myPdfFile.pdf')
      .then(entry => {
        let url = entry.toURL();
        console.log("Mypdf url: ", url);
        this.document.viewDocument(url, 'application/pdf', options);
      });
  }

  close(){
    this.navCtrl.push(HomePage);
  }

}
