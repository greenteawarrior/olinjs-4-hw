$(document).ready(function() {

  //request for getting new tweets
  var index = 0; //initialize
  //perhaps in another iteration of this website - index starts at a nonzero number (since it's silly to get tweets from the absolute beginning all the time,
  //perhaps just do the tweets from that specific day? tinker with the object properties)  
  //in next iteration, play with the .show jquery function
  
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
      $.post("/tweets", $(this).serialize());
      });
    }
    else {
      alert("Your current input is " + messageLength + " characters long, which is more than the 140char limit. Please fix it and try submitting again. :)")
    }
    return false
  });
  return false

});