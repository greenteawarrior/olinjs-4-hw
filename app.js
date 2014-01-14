
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');
var mongoose = require('mongoose');
var tc = require('./routes/twitterclone.js');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser(process.env.SECRET || 'fake_secret'));
app.use(express.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

//mongoose!!
//refer to https://devcenter.heroku.com/articles/nodejs-mongoose

// Here we find an appropriate database to connect to, defaulting to
// localhost if we don't find one.
var uristring = process.env.MONGOLAB_URI || 'mongodb://localhost/HelloMongoose';

// Makes connection asynchronously.  Mongoose will queue up database
// operations and release them when the connection is complete.
mongoose.connect(uristring, function (err, res) {
  if (err) {
  console.log ('ERROR connecting to: ' + uristring + '. ' + err);
  } else {
  console.log ('Succeeded connected to: ' + uristring);
  }
});
// //end of mongoose stuff in app.js


// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/users', user.list);

//twitter clone pages! see routes/twitterclone.js
app.get('/', tc.index);
app.get('/tweets/partial/:index', tc.tweetsPartial);
app.get('/users/new', tc.newuser_get);
app.post('/users/new', tc.newuser_post);
app.get('/tweets/:user', tc.specificUserTweets);
app.post('/tweets', tc.specificUserTweets_post);


http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
