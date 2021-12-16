//HTML format structure of tweet
const createTweetElement = function (tweetObject) {
  const element = `
        <article class="tweet">
          <header class="tweet-header">
            <div class="avatar">
            <img src=${tweetObject.user.avatars} />
            </div>
            <div class="name">
              ${tweetObject.user.name}
            </div>
            <div class="handle">
            ${tweetObject.user.handle}
            </div> 
          </header>
          <div class="tweet-content">
            <p>
              ${tweetObject.content.text}
            </p>
          </div>
          
          <footer class="tweet-footer">
            <div class="date">
              ${timeago.format(tweetObject.created_at)}
            </div>
            <div class="tweet-icons">
              <i class="fas fa-flag"></i>
              <i class="fas fa-retweet"></i>
              <i class="fas fa-heart"></i>
            </div>
            </footer>
        </article>
    `;
    return element;
};

/*  Function that loops through array of tweet object, call createTweetElement on each tweet, 
  then prepend to '#tweets-container'. */

const renderTweets = function(tweets) {
  //clear all child node of #tweets-container
  $('#tweets-container').empty();
  for (const tweet of tweets) {
    const $tweet = createTweetElement(tweet);
    $('#tweets-container').prepend($tweet);
  }
};

$(document).ready(function() {
  /*Event listener to submit a POST request that sends serialized data to server using AJAX */
  $("#submit-tweet").on("submit", function(event) {
    event.preventDefault();
    const $data = $(this).serialize();
    
    //Get the tweet message (excluding spaces) for validation purposes
    const $text = $(this).find("textarea").val().trim();


    //Validation checks before possible POST request. Ensure tweet not empty, and <140 characters.
    if (!$text) {
      return alert("Your tweet is empty!");
    } else if ($text.length > 140) {
      return alert("Sorry, your tweet is too long! A tweet can only have a maximum of 140 characters.")
    } else {

      //Validations passed, send POST request.
      $.ajax({
        url: '/tweets',
        method: 'POST',
        data: $data,
      })
      .done( () => {
        loadtweets();
      })
      .fail( (err) => {
        console.log("Error", err)
      })
    }
  });  

  //Fetching tweets with Ajax
  const loadtweets = () => {
      $.ajax({
        url: '/tweets',
        method: 'GET',
      })
      .done( (data) => {
        renderTweets(data);
      })
      .fail( (err) => {
        console.log("Error", err)
      })
  }

  //Display tweets already posted when start app. 
 loadtweets();

}); 

