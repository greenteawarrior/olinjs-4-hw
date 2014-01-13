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
  var existingU = models.User.find({'username': username}).exec(function(err, existingU){
    if (err) {
      console.log(err);
    }
    else if (existingU.length == 0) {
      //length 0 implies user w/ that username does not exist yet
      var user = new models.User({username: username});
      user.save(function (err) {
        if (err)
          console.log("Problem saving new user", err);
      });
      req.session.user = user;
      res.redirect("/");
    }
    else {
      console.log("user already exists");
      res.redirect("/");
    }
  });
};

//GET /
exports.index = function(req, res){
  var currentUser = req.session.user;
  if (currentUser) {
    res.render('index', { title: 'Express', username: currentUser.username});
  }
  else {
    res.render('index', { title: 'Express', username: "nobody yet"});    
  }
};
