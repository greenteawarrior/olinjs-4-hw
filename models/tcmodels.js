//mongoose setup
var mongoose = require('mongoose');

//user schema
var userSchema = mongoose.Schema({
    username: String,
});

//twit schema
var twitSchema = mongoose.Schema({
    message: String,
    time: { type: Date, default: Date.now },
    author: String,
    //if i wanted to include a feature where you could change your username, then 
    //i would incorporate references (at some point you need to obtain/look up the id for
    //the functions in the routes js files)
    //author: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
});


//make the schemas into models
var User = mongoose.model('User', userSchema);
var Tweet = mongoose.model('Tweet', twitSchema)

//export things so we can use them in routes, etc.
exports.User = User;
exports.Tweet = Tweet;