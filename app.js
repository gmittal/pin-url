var express = require('express');
var app = express();


function generateRandAlphaNumStr(len) {
  var rdmString = "";
  for( ; rdmString.length < len; rdmString  += Math.random().toString(36).substr(2));
  return  rdmString.substr(0, len);

}

app.post('/createShortLink', function(req, res) {


});

app.get('/:shortID', function(req, res){
  console.log(generateRandAlphaNumStr(10));
  res.send(req.param('shortID'));
});

app.listen(3000);


