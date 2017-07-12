var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');

var app = express();
// var http = require('http').Server(app); // 추가
// var io = require('socket.io')(http); // 추가

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json({limit: 500000000}));
app.use(bodyParser.urlencoded({limit: 500000000, extended: true, parameterLimit:5000000}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.all('*',function(req,res,next){
    if (!req.get('Origin')){
        return next();
    }
    res.set('Access-Control-Allow-Origin','*');
    res.set('Access-Control-Allow-Methods','GET,POST');
    res.set('Access-Control-Allow-Headers','X-Requested-With,Content-Type');
    if ('OPTIONS' == req.method){
         return res.send(200);
    }
    next();
});
// app.set( "port", 8100 ); // 추가
// http.listen(app.get('port'), function(){
//     console.log("Express server listening on port " + app.get('port'));
// }); // 추가
//
// /*** Socket.IO 추가 ***/
// io.on('connection', function(socket){
//
//     console.log('a user connected');
//
//     socket.broadcast.emit('hi');
//
//     socket.on('disconnect', function(){
//         console.log('user disconnected');
//     });
// });


app.use('/', index);
//로컬:8100 으로시작
app.use('/users', users);
//로컬:8100/users 으로 시작
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
