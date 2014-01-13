//model details are in the /models folder
var models = require('../models/tcmodels.js');

//GET /users/new
exports.newuser_get = function(req, res) {
  res.render('login', {});
};

//POST /users/new
exports.newuser_post = function(req, res){
  //login stuff with sessions
  var username = req.body.username;
  console.log(username);
  var user = new models.User({username: username});
  
  user.save(function (err) {
    if (err) 
      console.log("Problem saving new user", err);
  });

  req.session.user = user;

  res.redirect('/');
};

//GET /
exports.index = function(req, res){
  var currentUser = req.session.user;
  res.render('index', { title: 'Express', username: currentUser.username});
};