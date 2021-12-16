
$(document).ready(function() {

  
  const escape = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  //HTML format structure of each tweet
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
                ${escape(tweetObject.content.text)}
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

  /* Function that loops through array of tweet object, call createTweetElement on each tweet, 
    then prepend to '#tweets-container'. */
  const renderTweets = function(tweets) {
    //clear all child node of #tweets-container
    $('#tweets-container').empty();
    for (const tweet of tweets) {
      const $tweet = createTweetElement(tweet);
      $('#tweets-container').prepend($tweet);
    }
  };
  

  /*Event listener to submit a POST request that sends serialized data to server using AJAX */
  $("#submit-tweet").on("submit", function(event) {
    event.preventDefault();
    const $data = $(this).serialize();
    //Ensure error messages are cleared.
    $(".error-message").empty();
    $(".errors").removeClass("error-message");

    
    //Get the tweet message (excluding spaces) for validation purposes
    const $text = $(this).find("textarea").val().trim();
    
    //Validation checks before possible POST request. Ensure tweet not empty, and <140 characters.
    if (!$text) {

      //Display error message if tweet blank.
      const $error = "Oops! You can't post an empty tweet."
      $('.errors').addClass("error-message");
      $('.error-message').append($error);
    } else if ($text.length > 140) {

      //Display error message if tweet is too long. 
      const $error = `Oops! Your tweet is too long. A tweet can only have a maximum of 140 characters.`
      $('.errors').addClass("error-message");
      $('.error-message').append($error);

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
  

  //Function for fetching tweets with AJAX
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

  //Display tweets already posted at start. 
 loadtweets();

}); 

