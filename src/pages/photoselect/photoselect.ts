import { Component } from '@angular/core';
import { NavController, ToastController,ModalController } from 'ionic-angular';
import { Http } from '@angular/http';
import { ImagePicker } from '@ionic-native/image-picker';
import { Transfer, FileUploadOptions, TransferObject } from '@ionic-native/transfer';
import { File } from '@ionic-native/file';
import { Toast } from '@ionic-native/toast';
import{Frameselect} from '../frameselect/frameselect'
import 'rxjs/Rx';

@Component({
  selector: 'page-photoselect',
  templateUrl: 'photoselect.html'
})
export class PhotoselectPage {
  multi_img=[];
  multi_emo=[];
  fileTransfer: TransferObject;
  fileTransfer2: TransferObject;
  time:number;
  constructor(public modalCtrl: ModalController,private toast: Toast,private transfer: Transfer, private file: File,private imagePicker: ImagePicker,public navCtrl: NavController, public http: Http, private toastCtrl: ToastController) {
  }
//   Photoselect(){
//     const options = {
//       maximumImagesCount: 5, //전송가능한 최대 사진 수
//       quality: 100
//     }
//     this.imagePicker.getPictures(options).then((results) => {
//       for (var i = 0; i < results.length; i++) {
//         this.multi_img[i]=results[i];
//        let result_img_list = {
//           success: "이미지 선택 완료222",
//           result_list: i+"번째"+'Image URI: ' +results[i],
//         }
//         this.http.post("http://117.17.158.192:8100", result_img_list)
//         .map(data => data.json())
//         .subscribe(res => {
//         });
//     }
//   }, (err) => { });
// }
//   frameselect(){
//     let modal=this.modalCtrl.create(Frameselect);
//     modal.onDidDismiss(()=>{
//       this.sendfile();
//     });
//     modal.present();
//   }
//   sendfile(){
//     for (var i = 0; i < this.multi_img.length; i++) {
//     this.fileTransfer = this.transfer.create();
//     this.time=Date.now();
//     console.log("테스트");
//       let options : FileUploadOptions = {
//       fileKey: 'file',
//       fileName: "together"+i+".jpg",
//       headers: {
//     // "Access-Control-Allow-Origin" : "*",
//     // "Access-Control-Allow-Methods" : "POST, GET, OPTIONS, PUT",
//     // "Content-Type": "application/json",
//     // "Accept": "application/json",
//     //   "Content-Type": "application/octet-stream"
//     // , "Ocp-Apim-Subscription-Key": "7095c739d4f94934861dad9cbd44e01a"
//     }
//     }
    

//     this.fileTransfer.upload(this.multi_img[i], encodeURI("http://117.17.158.192:8100/test"), options)
//       .then((data) => {



//       }, (err) => {

//       });
//       this.multiemotion(i,this.time);

//   }
// } 
// multiemotion(i:number,time:number){

//     this.fileTransfer2 = this.transfer.create();
//     console.log("테스트");
//     let options: FileUploadOptions = {
//       fileKey: 'file',
//       fileName:  "together"+ i+this.time+".jpg",
//       headers: {
//       "Content-Type": "application/octet-stream"
//     , "Ocp-Apim-Subscription-Key": "7095c739d4f94934861dad9cbd44e01a" }
//     }
//     this.fileTransfer2.upload(this.multi_img[i], encodeURI("https://westus.api.cognitive.microsoft.com/emotion/v1.0/recognize"), options)
//       .then((data) => {
//         this.multi_emo[i]=data;
//         let test = {
//           type:"imgSave",
//           id:"xxx",
//           filename: "together"+i+this.time+".jpg",
//           emotion:this.multi_emo[i],
//           test:i
//         }
//         this.http.post("http://117.17.158.192:8200/MainServer/servers", test)
//           .map(data => data.json())
//           .subscribe(res => {
//           });
//       }, (err) => {

//       });

// }
}
