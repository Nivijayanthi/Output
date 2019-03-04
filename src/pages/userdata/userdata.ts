import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DocumentViewer, DocumentViewerOptions } from '@ionic-native/document-viewer';
import { File } from '@ionic-native/file';
import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer';
import { FileOpener } from '@ionic-native/file-opener';
import { HttpModule, Headers, Http } from '@angular/http';
import { ResultPage } from '../result/result';

@IonicPage()
@Component({
  selector: 'page-userdata',
  templateUrl: 'userdata.html',
})
export class UserdataPage {
  slideOneForm: FormGroup;
  public foNumber;
  public customer;
  public size;
  public iaNumber;
  public displayNumber;
  response : any;

  submitAttempt: boolean = false;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    private document: DocumentViewer,
    public http: Http,
    private file: File,
    private transfer: FileTransfer,
    private fileOpener: FileOpener ) {
    this.foNumber = navParams.get('foNumber');
    this.customer = navParams.get('customer');
    this.size = navParams.get('size');
    this.iaNumber = navParams.get('iaNumber');
    this.displayNumber = navParams.get('displayNumber');
    this.slideOneForm = this.formBuilder.group({
      body:[''],
      bodySource: [''],
      bonnet: [''],
      bonnetSource: [''],
      plug: [''],
      seat: [''],
      cage: [''],
      stem: ['']
    });
  }

  save() {
    console.log("Print............", this.slideOneForm.value);
let postData = {
	"body" : this.slideOneForm.value.body,
	"source" : this.slideOneForm.value.bodySource,
	"bonnet" : this.slideOneForm.value.bonnet,
	"source2" : this.slideOneForm.value.bonnetSource,
	"cage" : this.slideOneForm.value.cage,
	"seat" : this.slideOneForm.value.seat,
	"stem" : this.slideOneForm.value.stem,
	"oaNumbar" : this.slideOneForm.value.oaNumbar,
	"plug" : this.slideOneForm.value.plug
	}
let url = `http://192.168.43.228:8083/savePdf`;
this.http.post(url, postData)
  .subscribe(data => {
    console.log("Response", data);
   }, error => {
    console.log("error", error._body);
  });
this.navCtrl.push(ResultPage,{
  id : this.displayNumber
});

}

ionViewDidLoad() {
console.log('ionViewDidLoad UserdataPage');
}
  

}
