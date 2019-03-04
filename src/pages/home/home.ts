import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { Http } from '@angular/http';
import { ScanPage } from '../scan/scan';
import { UserdataPage } from '../userdata/userdata';
import { AlertController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  num: string;
  successResponse :any;
  displayMessage : string;
  messageArray : any;
  

  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    private barcodeScanner: BarcodeScanner,
    public http: Http,
    private alertCtrl: AlertController) {
  }


    ionViewDidLoad() {
      console.log('ionViewDidLoad StoreoutwardPage'); 
      this.barcodeScanner.scan().then(data => {  // this is called when a barcode is found
        this.num = "8901207503931"; 
        // this.num = data.text;
        console.log("Data");
        let url = `http://192.168.43.228:8083/getById/${this.num}`
        this.http.get(url).subscribe(data => {
          this.successResponse = data;
         console.log("rressssssssssssssponse", JSON.parse(this.successResponse._body));
         this.messageArray = JSON.parse(this.successResponse._body);        
         if(this.messageArray.statusCode == '200'){          
          this.navCtrl.push(UserdataPage,{
            foNumber : this.messageArray.foNumber,
            customer : this.messageArray.customer,
            size : this.messageArray.size,
            iaNumber : this.messageArray.iaNumber,
            displayNumber :this.num
          });
           
              // this.displayMessage = this.messageArray[1];
         }else {
           console.log("Alert........");
          let alert = this.alertCtrl.create({
            title: 'Invalid IA number',
            message: 'The Scanned IA number is not avaialble. Please try with another product',
            buttons: [{
              text: 'Ok',
              handler: () =>{
                let navTransition = alert.dismiss();
                navTransition.then(() => {
                  location.reload();
                  // this.navCtrl.pop();
                });
                return false;
              }
            }]
          });
          alert.present();
         }
     },err =>{
      console.log("error.............", err);
      // this.messageArray = err;
      // this.displayMessage = this.messageArray[1];
    });
        
     });
       
    }

}
