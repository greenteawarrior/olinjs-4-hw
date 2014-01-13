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
      req.session.user = existingU[0];
      res.redirect("/");
    }
  });
};

//GET /
exports.index = function(req, res){

  var currentUser = req.session.user;

  //getting ALL the tweets 
  allTweets = models.Tweet.find().sort({time: 'desc'}).exec(function(err, allTweets){
    if (err) { //error case
      console.log(err);
    }
    else if (currentUser) { //if someone's logged in
      res.render('index', { title: 'Crappy Twitter', username: currentUser.username, loginStatus: "true", allTweets:allTweets});
    }
    else { //nobody's logged in yet 
      res.render('index', { title: 'Crappy Twitter', username: "nobody yet", loginStatus: "false", allTweets:allTweets});    
    }
  });
};

//GET /tweets/:user
exports.specificUserTweets = function(req, res){
  var desiredUser = req.params.user;

  //find the tweets of desired user in database
  var desiredTweets = models.Tweet.find({author:desiredUser}).sort({time: 'desc'}).exec(function (err, tweets) {
    if (err) {
      console.log(err);
    }
    else if (tweets.length == 0) {
      //rendering stuff (see specificAuthor.jade)
      res.render('specificAuthor', {author: desiredUser, authorExists:"false" , tweets:tweets});
    }
    else {
      //rendering stuff (see specificAuthor.jade)
      res.render('specificAuthor', {author: desiredUser, authorExists:"true" , tweets:tweets});
    }
  });

}

//POST /tweets/:user
exports.specificUserTweets_post = function(req, res){
  var author = req.session.user.username;
  var message = req.body.message;

  var newTweet = new models.Tweet({message: message, author:author});
  newTweet.save(function(err){
    if (err) {
      console.log(err);
    }
  });

  res.redirect('/');

}


