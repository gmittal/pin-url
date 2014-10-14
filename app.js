var express = require('express');
var Firebase = require('firebase');
var bodyParser = require('body-parser');
var app = express();

app.use(bodyParser());

var links = new Firebase('https://pin-ytl20luvjp.firebaseio.com/');



function generateRandAlphaNumStr(len) {
  var rdmString = "";
  for( ; rdmString.length < len; rdmString  += Math.random().toString(36).substr(2));
  return  rdmString.substr(0, len);
}

app.post('/createShortLink', function(req, res) {
  var id = generateRandAlphaNumStr(9);
  console.log(id);
  console.log(req.body.url);

  links.child(id).once('value', function(snapshot) {


    if (snapshot.val()) {
      console.log('This ID exists.');
      id = generateRandAlphaNumStr(10);
    } else {
      console.log('This ID does not exist. Server shall proceed with generating with ID.');
      links.child(id).set(req.body.url);
    }


    // snapshot.forEach(function(childSnapshot) {
    //
    //   var name = childSnapshot.name();
    //   var childData = childSnapshot.val();
    //
    //
    //   console.log(name + ', ' + JSON.stringify(childData));
    //
    //   // check to see if the ID already exists
    //   if (name == id) {
    //     console.log('ID exists');
    //     id = generateRandAlphaNumStr(11);
    //   } else {
    //     console.log('ID does not exist. Will create one.')
    //     break;
    //
    //   }
    //
    // });


  }); // end link.once

  res.send("http://pin.ngrok.com/" + id);


});

app.get('/:shortID', function(req, res){

  res.sendfile('summary.html');

  // res.send(req.param('shortID'));
});


app.get('/', function(req, res){
  res.send('Welcome!');
});

app.listen(3000);
