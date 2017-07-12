import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController} from 'ionic-angular';
import { MainPage } from '../main-page/main-page';
import { LoginPage} from '../login/login'
import { ToastController,ModalController } from 'ionic-angular';

/**
 * Generated class for the Frameselect page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-frameselect',
  templateUrl: 'frameselect.html',
})
export class Frameselect {
id_check;
two =false;
three=false;
four=false;
five=false;
num2=0;
num3=0;
num4=0;
num5=0;
  constructor(private toastCtrl: ToastController,public navCtrl: NavController, public navParams: NavParams,public view:ViewController) {
        this.id_check=navParams.get("id");

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Frameselect');
  }
  select2(n:number){
    if(this.num2==0){
      this.num2++;
    }else{
      this.num2--;
    }
  }
  select3(n:number){
   if(this.num3==0){
      this.num3++;
    }else{
      this.num3--;
    }
  }
  select4(n:number){
   if(this.num4==0){
      this.num4++;
    }else{
      this.num4--;
    }
  }
  select5(){
   if(this.num5==0){
      this.num5++;
    }else{
      this.num5--;
    }
  }
  select(){
    console.log(this.three);
    if(this.num2+this.num3+this.num4+this.num5!=2){
      let toast = this.toastCtrl.create({
                      message: '두가지 프레임을 선택해주세요',
                      duration: 3000,
                      position: 'middle'
                    });
                    toast.present();
    //this.navCtrl.setRoot(MainPage,{id:this.id_check})
 
   }
    
    else{

    if(this.two==true&&this.three){
      this.view.dismiss(2,3);
    }else if(this.two==true&&this.four){
      this.view.dismiss(2,4);
    }else if(this.two==true&&this.five){
      this.view.dismiss(2,5);
    }else if(this.three==true&&this.four){
      this.view.dismiss(3,4);
    }else if(this.three==true&&this.five){
      this.view.dismiss(3,5);
    }else if(this.four==true&&this.five){
      this.view.dismiss(4,5);
    }else{
      //this.navCtrl.setRoot(MainPage,{id:this.id_check})
    }
    }
  }
  
  dismiss(){
   // this.navCtrl.setRoot(MainPage,{id:this.id_check})
  }

}
