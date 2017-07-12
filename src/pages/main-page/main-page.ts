import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, LoadingController} from 'ionic-angular';
import { PhotoselectPage } from '../photoselect/photoselect';
import { ImagePicker } from '@ionic-native/image-picker';
import { Http } from '@angular/http';
import { File } from '@ionic-native/file';
import { SocialSharing } from '@ionic-native/social-sharing';
import { ToastController, ModalController, AlertController} from 'ionic-angular';
import { Frameselect} from '../frameselect/frameselect'
import { LoginPage} from '../login/login'
import { Transfer, FileUploadOptions, TransferObject } from '@ionic-native/transfer';
/**
 * Generated class for the MainPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-main-page',
  templateUrl: 'main-page.html',
})
export class MainPage {
  basicitems = [
    '버전',
    '도움말'
  ];
  securityitems = [
    '비밀번호 변경',
    '닉네임 변경'
  ];
  id_check;//id 확인변수
  multi_img = [];
  multi_emo = [];
  Img_fileTransfer_ToNode: TransferObject;
  MsApi_fileTransfer_ToJava: TransferObject;
  Filtering_fileTransfer_ToJava: TransferObject;

  count = 0;
  time: number;
  photo: string = "Establish";
  fname = [];
  femotion = [];
  albuminfo = [{ type: "makeAlbum" }, {}];
  test;

  two = false;
  three = false;
  four = false;
  one = false;
  num2 = 0;
  num3 = 0;
  num4 = 0;
  num5 = 0;
  albumarray = [];
  filterarray = [];
  temparray = [];
  albumtemparray=[];
  filterimg;
  constructor(public loadingCtrl: LoadingController, public alerCtrl: AlertController, public view: ViewController, private socialSharing: SocialSharing, private file: File,
    private toastCtrl: ToastController, private transfer: Transfer, public modalCtrl: ModalController,
    public navCtrl: NavController, public http: Http, public navParams: NavParams, private imagePicker: ImagePicker) {
    this.id_check = navParams.get("id");
    //
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MainPage');
  }
  //필터링 세그먼트 부분 함수@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

  //필터 세그먼트에서 사진 불러오기 버튼 클릭시 호출
  changefilter() {
    const options = {
      maximumImagesCount: 1,
      quality: 100
    }
    this.imagePicker.getPictures(options).then((results) => {
      if (results.length < 1) {
        let toast = this.toastCtrl.create({
          message: "이미지를 선택해주세요",
          duration: 1000,
          position: 'middle'
        });
        toast.present();
      }
      //이미지를 선택할 경우 else문 cancel할 경우 그냥 끝남
      else {
        for (var i = 0; i < results.length; i++) {
          this.filterimg = results[i];
        }
        //사진 선택후 해당 file url 저장 후 서버로 값을 전달할 함수 호출
        this.filterfile();
        //서버에서 사진 filtering후 반환할때까지 로딩..
        let loading = this.loadingCtrl.create({
          content: 'Loading Please Wait...'
        });
        loading.present();
        loading.onDidDismiss(() => {
          //this.navCtrl.setRoot(MainPage, { id: this.id_check });
          //이부분 아직 수정 필요할것같다. img src 로딩이 정적이라 다른 페이지 들어갔다 리로드해야
          //필터링 이미지가 보이는데 setRoot로는 안먹힘 시간을 더늘려야하나
        });
        setTimeout(() => {
          loading.dismiss();
        }, 4500);
        //4초가 지나면 로딩창 내림
      }
    },
      (err) => {
        let errorhandle = {
          type: "filtering_imgpicker_error",
          doc: err
        }
        this.http.post("http://117.17.158.192:8100/errorhandle", errorhandle)
          .subscribe(res => {
          });
        //filtering 을 위해 이미지 피커 과정에서 에러가 생기면 node로 에러 반환
      });
  }

  //서버로 filtering할 파일 url전송
  filterfile() {
    this.Filtering_fileTransfer_ToJava = this.transfer.create();
    this.time = Date.now();
    let options: FileUploadOptions = {
      fileKey: 'file',
      fileName: "together" + this.time + ".jpg",
      headers: {
        id: this.id_check
      }
    }
    let filterinfo = {
      type: "filter",
      filename: "together" + this.time + ".jpg",
      id: this.id_check,
    }
    this.Filtering_fileTransfer_ToJava.upload(this.filterimg, encodeURI("http://117.17.158.192:8100/filter"), options)
      .then((data) => {
        this.http.post("http://117.17.158.192:8200/MainServer/servers", filterinfo)
          .subscribe(res => {
            this.showfilter(res);
          });
      },
      (err) => {
        let errorhandle = {
          type: "filtering_filetransfer_error",
          doc: err
        }
        this.http.post("http://117.17.158.192:8100/errorhandle", errorhandle)
          .subscribe(res => {
          });
      });
  }
//필터링한 사진 리스트 호출
  showfilter(res: any) {
    this.temparray = res['_body'].split(',');
    for (var i = 0; i < this.temparray.length - 1; i++) {
      this.filterarray[i] = this.temparray[i];
    }
  }
//filtering 다운로드
  filterdownload(filter: any) {
    console.log("test");
    this.socialSharing.share(null, null, "http://117.17.158.192:8200/MainServer/imageFilter?id=" + this.id_check + "&filterName=" + filter, null);
  }

  //엘범만들기 세그먼트@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
  //select 한 frame 개수 파악후 서버전송
  //frame 선택 후 정상적으로 값이 들어왔나 체크 밑 서버로 frame 종류 전송
    select1() {
      console.log("두번째" + this.two);
      console.log("세번째" + this.three);
      console.log("네번째" + this.four);
      console.log("다섯번째" + this.one);
    }
    select2() {
      console.log("두번째" + this.two);
      console.log("세번째" + this.three);
      console.log("네번째" + this.four);
      console.log("다섯번째" + this.one);
    }
    select3() {
      console.log("두번째" + this.two);
      console.log("세번째" + this.three);
      console.log("네번째" + this.four);
      console.log("다섯번째" + this.one);
    }
    select4() {
      console.log("두번째" + this.two);
      console.log("세번째" + this.three);
      console.log("네번째" + this.four);
      console.log("다섯번째" + this.one);
    }
  select() {
    if (this.two) {
      this.num2 = 1;
    } else {
      this.num2 = 0;
    }
    if (this.three) {
      this.num3 = 1;
    } else {
      this.num3 = 0;
    }
    if (this.four) {
      this.num4 = 1;
    } else {
      this.num4 = 0;
    }
    if (this.one) {
      this.num5 = 1;
    } else {
      this.num5 = 0;
    }
    if (this.num2 + this.num3 + this.num4 + this.num5 != 2) {
      let toast = this.toastCtrl.create({
        message: '두가지 프레임을 선택해주세요',
        duration: 3000,
        position: 'middle'
      });
      toast.present();
    }
    else {
      if (this.two == true && this.three) {
        this.Photoselect(2, 3);
      } else if (this.two == true && this.four) {
        this.Photoselect(2, 4);
      } else if (this.two == true && this.one) {
        this.Photoselect(1, 2);
      } else if (this.three == true && this.four) {
        this.Photoselect(3, 4);
      } else if (this.three == true && this.one) {
        this.Photoselect(1, 3);
      } else if (this.four == true && this.one) {
        this.Photoselect(1, 4);
      } else {
      }
    }
  }
  //frame 종류에 맞게 사진 선택 함수
  Photoselect(frame_num: number, frame_num2: number) {
    const options = {
      maximumImagesCount: frame_num + frame_num2,
      quality: 100
    }
    this.imagePicker.getPictures(options).then((results) => {
      if (results.length < frame_num + frame_num2) {
        let toast = this.toastCtrl.create({
          message: '이미지를 ' + (frame_num + frame_num2) + "개수만큼 선택하세요",
          duration: 1000,
          position: 'middle'
        });
        toast.present();
        return;
      }
      for (var i = 0; i < results.length; i++) {
        this.multi_img[i] = results[i];
        this.test = results[i];
        let result_img_list = {
          success: "이미지 선택 완료",
          result_list: i + "번째" + 'Image URI: ' + results[i],
          id: this.id_check
        }
        this.http.post("http://117.17.158.192:8100", result_img_list)
          .subscribe(res => {
          });
      }
      this.sendfile(frame_num, frame_num2);
    }, (err) => {
      let errorhandle = {
        type: "frameselect_filetransfer_error",
        doc: err
      }
      this.http.post("http://117.17.158.192:8100/errorhandle", errorhandle)
        .subscribe(res => {
        });
    });
  }

  //노드 서버로 사진전송
  sendfile(frame_num: number, frame_num2: number) {
    this.Img_fileTransfer_ToNode = this.transfer.create();
    var i = 0;
    var j = 0;
    var time_array = [];
    var filename_list = [];
    while (i < this.multi_img.length) {
      time_array[j] = Date.now();
      filename_list[i] = i +"together" +  Date.now() + ".jpg"
      let options: FileUploadOptions = {
        fileKey: 'file',
        fileName: filename_list[i],
        headers: {
          id: this.id_check,
          url: filename_list[i]
        }
      }

      this.Img_fileTransfer_ToNode.upload(this.multi_img[i], encodeURI("http://117.17.158.192:8100/test"), options)
        .then((data) => {
          this.albuminfo.push({
            filename: data.response,
            id: this.id_check,
            frame: frame_num + "," + frame_num2,
          });
          this.multiemotion(j, data.response, frame_num, frame_num2);
          j++;
        },
        (err) => {

        });
      i++;
    }
  }

//java 서버로 이모션값 받은거 전송 밑 처리
  multiemotion(i: number, filenamelist: string, frame_num: number, frame_num2: number) {
    this.MsApi_fileTransfer_ToJava = this.transfer.create();
    this.http.post("http://117.17.158.192:8100/errorhandle", i)
      .subscribe(res => {
      });
    let options: FileUploadOptions = {
      fileKey: 'file',
      fileName: filenamelist,
      headers: {
        "Content-Type": "application/octet-stream"
        , "Ocp-Apim-Subscription-Key": "66ccaea4637643f09bbf9ab2c0bb38bd"
        //7095c739d4f94934861dad9cbd44e01a
      }
    }

    this.MsApi_fileTransfer_ToJava.upload(this.multi_img[i], encodeURI("https://westus.api.cognitive.microsoft.com/emotion/v1.0/recognize"), options)
    // https://westus.api.cognitive.microsoft.com/emotion/v1.0/recognize
      .then((data) => {
        this.multi_emo[i] = data;
        let test = {
          type: "imgSave",
          id: this.id_check,
          filename: filenamelist,
          emotion: this.multi_emo[i],
          test: i
        }
        this.fname[i] = filenamelist;
        this.femotion[i] = this.multi_emo[i];
        this.http.post("http://117.17.158.192:8200/MainServer/servers", test)
          .subscribe(res => {
            this.count++;
            if (this.count == frame_num + frame_num2) {
              this.lastsend();
              this.count = 0;
            }
          });
      }, (err) => {
        let toast = this.toastCtrl.create({
          message: "api 에러남",
          duration: 3000,
          position: 'middle'
        });
        toast.present();
        this.http.post("http://117.17.158.192:8100/errorhandle", err)
          .subscribe(res => {
          });
      });
  }

  //모든게 처리되고 서버로 마지막 json값 전송
  lastsend() {
    this.http.post("http://117.17.158.192:8200/MainServer/servers", this.albuminfo)
      .map(data => data.json())
      .subscribe(res => {
      });
    this.albuminfo = [{ type: "makeAlbum" }, {}];;
    this.multi_emo = [];
    this.multi_img = [];
    this.femotion = [];
    this.fname = [];
  }

//엘범 다운로드
  download(album: any) {
    console.log("test");
    this.socialSharing.share(null, null, "http://117.17.158.192:8200/MainServer/image?id=" + this.id_check + "&fileName=" + album, null);
  }

//history부분 세그먼트@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
  showalbum() {
    let s = {
      type: "showMergeAlbum",
      id: this.id_check
    }
    this.http.post("http://117.17.158.192:8200/MainServer/servers", s)
      .subscribe(res => {
        this.albumarray= res['_body'].split(',');
        console.log(this.albumarray);
      });

  }
  //설정부분 세그먼트@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
  basicitemSelected(basicitem: string) {
    console.log("Selected basicItem", basicitem);
    if (basicitem == "버전") {
      let alert = this.alerCtrl.create({
        title: 'Together',
        message: 'ver 1.1',
        buttons: ['Ok']
      });
      alert.present()

    } else {
      let alert = this.alerCtrl.create({
        title: '도움말',
        message: 'Help',
        buttons: ['Ok']
      });
      alert.present()
    }
  }
  securityitemSelected(securityitem: string) {
    console.log("Selected securityItem", securityitem);
  }
  logout() {
    this.navCtrl.push(LoginPage);
  }

}
