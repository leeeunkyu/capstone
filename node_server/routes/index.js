var express = require('express');
var mysql      = require('mysql');
var router = express.Router();
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'scott',
  password : 'mobile',
  port     : 1521,
  database : 'xe'
});
/* GET users listing. */
router.get('/', function(req, res, next) {
  connection.connect(function(err) {
    console.log("test");
    if (err) { console.error('mysql connection error'); console.error(err); throw err; }
    else{ console.log("연결에 성공하였습니다."); }
  });



  connection.query('SELECT * from DATELOG', function(err, rows, fields) {
    if (!err){
      console.log('The solution is: ', rows);
      res.send(rows);
}
    else{
      console.log('Error while performing Query.', err);
      res.send(err);
}
  });

  connection.end();
  res.send("TESR2");


});
router.get('/test', function(req, res, next) {

  res.send('te2e');
});
module.exports = router;
