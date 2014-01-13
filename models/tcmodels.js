//mongoose setup
var mongoose = require('mongoose');

//user schema
var userSchema = mongoose.Schema({
    username: String,
});

//make the schemas into models
var User = mongoose.model('User', userSchema);

//export things so we can use them in routes, etc.
exports.User = User;