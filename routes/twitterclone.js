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

  var existingU = models.User.find({'username': username})
                             .exec(function(err, existingU){
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
      //user already exists, so we don't have to create a new one
      console.log("user already exists");
      req.session.user = existingU[0];
      res.redirect("/");
    }
  });
};

//GET /
exports.index = function(req, res){
  var currentUser = req.session.user;
  if (currentUser) { //if someone's logged in
    res.render('index', { title: 'Crappy Twitter', 
                          username: currentUser.username, 
                          loginStatus: "true"});
  }
  else { //nobody's logged in yet 
    res.render('index', { title: 'Crappy Twitter', 
                          username: "nobody yet", 
                          loginStatus: "false"});    
  }
}


// GET /tweets/partial/:index
// convenient way to obtain tweets to stream in to the home page 
// involved in the $.get in tcAjax.js
exports.tweetsPartial = function(req, res) {
  var desiredTweetIndex = req.params.index;
  allTweets = models.Tweet.find()
                          .sort({time: 'asc'})
                          .exec(function(err, allTweets){
                            res.render('_twits', {desiredTweet:allTweets[desiredTweetIndex]})
                          });
}


//GET /tweets/:user
exports.specificUserTweets = function(req, res){
  var desiredUser = req.params.user;
  //find the tweets of desired user in database
  var desiredTweets = models.Tweet.find({author:desiredUser})
                                  .sort({time: 'desc'})
                                  .exec(function (err, tweets) {
    if (err) {
      console.log(err);
    }
    else if (tweets.length == 0) {
      //rendering stuff (see specificAuthor.jade)
      res.render('specificAuthor', {author: desiredUser, 
                                    authorExists: "false" , 
                                    tweets:tweets});
    }
    else {
      //rendering stuff (see specificAuthor.jade)
      res.render('specificAuthor', {author: desiredUser, 
                                    authorExists:"true", 
                                    tweets:tweets});
    }
  });
}

//POST /tweets
exports.specificUserTweets_post = function(req, res){
  var author = req.session.user.username;
  var message = req.body.message;

  var newTweet = new models.Tweet({message: message, 
                                   author: author});
  newTweet.save(function(err){
    if (err) {
      console.log(err);
    }
  });
  res.redirect('/');
}