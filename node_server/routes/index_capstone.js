var express = require('express');
var router = express.Router();
var test4;
var app = express();
var path = require('path');
var formidable = require('formidable');
var fs = require('fs');
var ExifImage = require('exif').ExifImage;
var fse = require('fs-extra');
var pathmanager;
var im = require('imagemagick'); //var gm = require('gm').subClass({imageMagick: true});
var easyimg = require('easyimage');


app.post('/upload', function(req, res) {
  res.send('Uploaded');
});

router.post('/test', function(req, res, next) {
  console.log("router post ! 접속성공");
  console.log(req.headers.url);
  var form = new formidable.IncomingForm();
  // specify that we want to allow the user to upload multiple files in a single request
  form.multiples = true;
  // store all uploads in the /uploads directory
  form.uploadDir = path.join("D:\\", "img\\" + req.headers.id);
  //console.log(form.uploadDir);
  // every time a file has been uploaded successfully,
  //내가봤을때 밑에있는것들은 사진같은걸 여러개 한꺼번에보ㅇ낼때쓰이는거같음
  // rename it to it's orignal name
  form.on('file', function(field, file) {
    fs.rename(file.path, path.join(form.uploadDir, file.name));
    try {
      console.log("D:\\img\\" + req.headers.id+"\\"+file.name+"경로");
      new ExifImage({
        image: "D:\\img\\" + req.headers.id+"\\"+file.name
      }, function(error, exifData) {
        if (error)
          console.log('Error: ' + error.message);
        else {
          switch (exifData.image.Orientation) {
            case 1:
              console.log("똑바로");
              console.log(exifData.image.Orientation);
              break;
            case 3:
            easyimg.rotate({
              src: "D:\\img\\" + req.headers.id+"\\"+file.name,
              dst: "D:\\img\\" + req.headers.id+"\\"+file.name,
              degree: 180
            });
             console.log("180도회전");
             console.log(exifData.image.Orientation);
              break;
            case 6:
            easyimg.rotate({
              src: "D:\\img\\" + req.headers.id+"\\"+file.name,
              dst: "D:\\img\\" + req.headers.id+"\\"+file.name,
              degree: 90
            });
            console.log("90도회전");
            console.log(exifData.image.Orientation);
              break;
            case 8:
            easyimg.rotate({
              src: "D:\\img\\" + req.headers.id+"\\"+file.name,
              dst: "D:\\img\\" + req.headers.id+"\\"+file.name,
              degree: -90
            });
            console.log("-90도회전");
            console.log(exifData.image.Orientation);
              break;
            default:
          }
        }
      });
    } catch (e) {
    }
   res.send(req.headers.url);
  });

  form.parse(req, function(err, fields, files) {

  //  res.end('upload complete!');
  });

});
router.get('/exif',function(req,res,next) {
  var file;
  file=req.query.name;
  console.log("리다이랙트후"+file);
  try {
    new ExifImage({
      image: "D:\\img\\" + req.headers.id+"\\"+file
    }, function(error, exifData) {
      if (error)
        console.log('Error: ' + error.message);
      else {
        switch (exifData.image.Orientation) {
          case 1:
            console.log("똑바로");
            console.log(exifData.image.Orientation);

            break;
          case 3:
          easyimg.rotate({
            src: "D:\\img\\" + req.headers.id+"\\"+file,
            dst: "D:\\img\\" + req.headers.id+"\\"+file,
            degree: 180
          });
           console.log("180도회전");
           console.log(exifData.image.Orientation);

            break;
          case 6:
          easyimg.rotate({
            src: "D:\\img\\" + req.headers.id+"\\"+file,
            dst: "D:\\img\\" + req.headers.id+"\\"+file,
            degree: 90
          });
          console.log("90도회전");
          console.log(exifData.image.Orientation);


            break;
          case 8:
          easyimg.rotate({
            src: "D:\\img\\" + req.headers.id+"\\"+file,
            dst: "D:\\img\\" + req.headers.id+"\\"+file,
            degree: -90
          });
          console.log("-90도회전");
          console.log(exifData.image.Orientation);

            break;
          default:

        }
      }
    });
  } catch (e) {

  }
  res.send(200);
});
router.post('/filter', function(req, res, next) {
  var form2 = new formidable.IncomingForm();
  form2.multiples = true;
  form2.uploadDir = path.join("D:\\", "img\\" + req.headers.id + "\\filter");
  form2.on('file', function(field, file) {
    fs.rename(file.path, path.join(form2.uploadDir, file.name));
    console.log("리네임완료");
    res.send("200");

  });
  form2.parse(req, function(err, fields, files) {
    res.end('upload complete!');
  });
  console.log("파일전송완료");
//  res.send("200");

});
router.post('/', function(req, res, next) {

  //console.log(req.body.title);
  //  console.log(req.body);
  //console.log(req.body.id);
  pathmanager = req.body.id;

  res.send("200");
  //path.join(__dirname, '/uploads');
  //     fs.readFile("routes/uploads/0.jpg",function(err,data){
  //       console.log("testfile1"+ err);
  //       console.log("testfile2"+ data.gps);
  //     });
  //     try {
  //     new ExifImage({ image : "routes/uploads/1.jpg" }, function (error, exifData) {
  //         if (error)
  //             console.log('Error: '+error.message);
  //         else
  //             console.log(exifData); // Do something with your data!
  //     });
  // } catch (error) {
  //     console.log('Error: ' + error.message);
  // }

  //   var test = "테스트다";
  //   var test2 = '두번째다';
  //   var test3 = null;
  // //  test4=req.bdoy.c;
  //  console.log(req.body.a);
  //  //console.log(req.bdoy.c);
  //  console.log(req.body.b);
  //
  //  //test3=req.body.c;
  //   var tt=({
  //     a:test,
  //     b:test2,
  //     c:req.body.b
  //   });
  //  res.send(tt);


  // res.send("test");

  //   var output = `<!DOCTYPE html>
  // <html>
  //   <head>
  //     <meta charset="utf-8">
  //     <title></title>
  //   </head>
  //   <body>
  //     hello , dynamic !
  //   </body>
  // </html>
  // `;
  //  res.send(output);
});

router.post('/emotion', function(req, res, next) {
  console.log(req.body.a);
  //console.log(req.body.b);
  console.log(req.body.b);

  console.log(req.body.b.response);
  console.log("--------------------------");

  console.log(req.body.b.response[0].faceRectangle);
  console.log(req.body.b.response.faceRectangle);
  console.log(req.body.b.response['0'].faceRectangle);
  console.log(req.body.b.response[3]);

});
router.get('/', function(req, res, next) {
  try {
    new ExifImage({
      image: "routes/uploads/1.jpg"
    }, function(error, exifData) {
      if (error)
        console.log('Error: ' + error.message);
      else {

        console.log("1");
        //  console.log( exifData); // Do something with your data!
        console.log(exifData.image.Orientation); // Do something with your data!

      }
    });
    new ExifImage({
      image: "routes/uploads/3.jpg"
    }, function(error, exifData) {
      if (error)
        console.log('Error: ' + error.message);
      else {
        // Do something with your data!
        easyimg.rotate({
          src: "routes/uploads/3.jpg",
          dst: "routes/uploads/new_3.jpg",
          //    width:500, height:500,
          degree: 180
        }).then(
          function(image) {
            console.log('rotate3 ' + image.width + ' x ' + image.height);
          },
          function(err) {
            console.log(err);
          }
        );
        console.log("3");
        console.log(exifData.image.Orientation); // Do something with your data!

        //console.log(exifData); // Do something with your data!
      }

    });
    new ExifImage({
      image: "routes/uploads/6.jpg"
    }, function(error, exifData) {
      if (error)
        console.log('Error: ' + error.message);
      else {
        // Do something with your data!
        easyimg.rotate({
          src: "routes/uploads/6.jpg",
          dst: "routes/uploads/new_6.jpg",
          //    width:500, height:500,
          degree: 90
        }).then(
          function(image) {
            console.log('rotated 6: ' + image.width + ' x ' + image.height);
          },
          function(err) {
            console.log(err);
          }
        );

        console.log("6");
        console.log(exifData.image.Orientation); // Do something with your data!

        //console.log(exifData); // Do something with your data!
      }

    });
    new ExifImage({
      image: "routes/uploads/8.jpg"
    }, function(error, exifData) {
      if (error)
        console.log('Error: ' + error.message);
      else {
        // Do something with your data!
        easyimg.rotate({
          src: "routes/uploads/8.jpg",
          dst: "routes/uploads/new_8.jpg",
          //  width:500, height:500,
          degree: -90
        }).then(
          function(image) {
            console.log('rotated8: ' + image.width + ' x ' + image.height);
          },
          function(err) {
            console.log(err);
          }
        );
        console.log("8");
        console.log(exifData.image.Orientation); // Do something with your data!

        //  console.log(exifData); // Do something with your data!
      }

    });
  } catch (error) {
    console.log('Error: ' + error.message);
  }

  // fs.readFile( "routes/uploads/2.jpg", 'utf8', function(err, data) {
  //     console.log(data);
  // });

  //
  // var canvas = document.getElementById('myCanvas');
  //   var context = canvas.getContext('2d');
  //   var rectWidth = 150;
  //   var rectHeight = 75;
  //
  //   // translate context to center of canvas
  //   context.translate(canvas.width / 2, canvas.height / 2);
  //
  //   // rotate 45 degrees clockwise
  //   context.rotate(Math.PI / 2);
  //
  //   context.fillStyle = 'blue';
  //   context.fillRect(rectWidth / -2, rectHeight / -2, rectWidth, rectHeight);

  // gm("routes/uploads/1.jpg")
  // .rotate('green', -90)
  // .write("routes/uploads/2.jpg", function (err) {
  //   console.log(err);
  // });
  console.log("exif test");
  res.send("test");
  // res.render('index', {
  //     title: 'Express',
  //     im: test4
  // });
});
router.post('/errorhandle', function(req, res, next) {
  console.log("에러핸들러");
  console.log(req.bdoy);
  res.send("test");
});

module.exports = router;
