import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import { Http } from '@angular/http';
import { LoginPage } from '../login/login';

import 'rxjs/Rx';

@Component({
  selector: 'page-register',
  templateUrl: 'register.html'
})
export class RegisterPage {
  inputID: string;
  inputPW: string;
  nickname: string;

  checkIDresult: string;
  

  constructor(public navCtrl: NavController, public http: Http, private toastCtrl: ToastController) {
    this.checkIDresult = "uncheck";
  }

  repetition(inputID){
    // 아이디 중복 체크 버튼을 눌렀을 때
    let checkID={
      type: 'check',
      id: inputID
    }
    if (inputID.trim() != '') {
      this.http.post("http://117.17.158.192:8200/MainServer/servers", checkID)
                //.map(data => data.json())
                .subscribe(res => {
                  this.checkIDresult = res['_body'];
                  if(this.checkIDresult == "using"){
                    //  중복된 아이디가 있는 경우 알리기 위한 Toast

                    let toast = this.toastCtrl.create({
                      message: '중복된 아이디가 존재합니다.',
                      duration: 3000,
                      position: 'middle'
                    });

                    toast.present();
                  }else{
                    // 중복된 아이디가 없는 경우 알리기 위한 Toast
                    let toast = this.toastCtrl.create({
                      message: '사용 가능한 아이디 입니다.',
                      duration: 3000,
                      position: 'middle'
                    });
                    toast.present();
                  }
        });
    }
  }

  Submit(inputID, inputPW, nickname) {
    // 회원가입 완료 버튼을 눌렀을 때
    if(this.checkIDresult == "using"){
      let toast = this.toastCtrl.create({
        message: '중복된 아이디가 존재합니다. 진행할 수 없습니다.',
        duration: 3000,
        position: 'middle'
      });
      toast.present();
      return ;
    }else if(this.checkIDresult == "uncheck"){
      let toast = this.toastCtrl.create({
        message: '아이디 중복 체크를 하지 않았습니다. 진행할 수 없습니다.',
        duration: 3000,
        position: 'middle'
      });
      toast.present();
      return ;
    }

    let submitData={
      type: 'register',
      id: inputID,
      pw: inputPW,
      nickname: nickname
    };

    if (inputID.trim() != '' || inputPW.trim() != '' || nickname.trim() != '') {
      this.http.post("http://117.17.158.192:8200/MainServer/servers", submitData)
                //.map(data => data.json())
                .subscribe(res => {
                  console.log();
                  this.Cancle();
        });
    }else{
      // 작성되지 않은 부분이 있는 경우
      let toast = this.toastCtrl.create({
        message: '작성되지 않은 항목이 있습니다. 확인 바랍니다.',
        duration: 3000,
        position: 'middle'
      });
      toast.present();
      return ;
    }
    this.inputID = '';
    this.inputPW = '';
    this.nickname = '';
  }

  Cancle() {
    this.navCtrl.setRoot(LoginPage);
  }
}
