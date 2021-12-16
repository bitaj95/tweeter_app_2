/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {

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
  }

  const renderTweets = function(tweets) {
    // loops through tweets
    // calls createTweetElement for each tweet
    // takes value and appends it to the tweets container
    for (const tweet of tweets) {
      const $tweet = createTweetElement(tweet);
      $('#tweets-container').append($tweet);
    }
  }

  const data = [
    {
      "user": {
        "name": "Newton",
        "avatars": "https://i.imgur.com/73hZDYK.png"
        ,
        "handle": "@SirIsaac"
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
      "created_at": 1461116232227
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": "https://i.imgur.com/nlhLi3I.png",
        "handle": "@rd" },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1461113959088
    }
  ]

  renderTweets(data);

  /*Event listener to submit a POST request that sends serialized data to server using AJAX */
  $("#submit-tweet").on("submit", function(event) {
    event.preventDefault();
    const $data = $(this).serialize()
    
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
      .done( (data) => {
        console.log("it worked:", data);
      })
      .fail( (err) => {
        console.log("Error", err)
      })
    }
  });  
    

  
  //Fetching tweets with Ajax
  const loadtweets = function () {
    $("#submit-tweet").on("submit", function(event) {
      event.preventDefault();
      const $data = $(this).serialize()
      $.ajax({
        url: '/tweets',
        method: 'GET',
        data: $data
      })
      .done( (data) => {
        renderTweets(data);
      })
      .fail( (err) => {
        console.log("Error", err)
      })
    });  
  }

  loadtweets();

  //

}); 

