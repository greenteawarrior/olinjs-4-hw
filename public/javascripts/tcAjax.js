$(document).ready(function() {

  //request for getting new tweets
  var index = 0; //initialize
  //perhaps in another iteration of this website - index starts at a nonzero number (since it's silly to get tweets from the absolute beginning all the time,
  //perhaps just do the tweets from that specific day? tinker with the object properties)  
  
  var streaming = function() {
    $.get("/tweets/partial/" + index, function(obtainedTweet) {
      $("ul").prepend(obtainedTweet);
      index += 1;
    });
  };

  //use setInterval to poll for new tweets every 2 seconds
  setInterval(streaming, 2000); 

  $('.tweetButton').click(function() {
      $("h1").append('Ahh!');
      return false;
  });

  return false
});