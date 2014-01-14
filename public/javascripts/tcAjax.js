$(document).ready(function() {

  var index = 0; //initialize
  
  var streaming = function() {
    $.get("/tweets/partial/" + index, function(obtainedTweet) {
      $(".tweetstream").prepend(obtainedTweet);
      index += 1;
    });
  };

  //use setInterval to poll for new tweets every 2 seconds
  setInterval(streaming, 2000); 

  $('#tweetform').on('submit', function() {
    var message = $('#message').val();
    var messageLength = message.length;
    
    if (messageLength < 141) {
      $.post("/tweets", $('#tweetform').serialize());
    }
    else {
      alert("Your current input is " + messageLength + " characters long, which is more than the 140char limit. Please fix it and try submitting again. :)")
    }
    return false
  });
  return false

});