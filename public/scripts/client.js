/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function() {
  const data = [

  ];

  const escape = function(str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  const renderTweets = function(tweets) {
    for (let tweet of tweets) {
      //prepending tweet for chronological order.
      $(".tweets-container").prepend(createTweetElement(tweet));
    }
  };

  // template for new tweet.
  const createTweetElement = function(tweet) {
    return $(`<article class="tweet">
    <header>
      <div>
        <img src=${tweet.user.avatars} width="75px">
        <p>${tweet.user.name}</p>
      </div>
      <p>${tweet.user.handle}</p>
    </header>
    <p class="tweet-content">${escape(tweet.content.text)}</p>
    <footer>
      <p>${timeago.format(tweet.created_at)}</p>
      <div>
        <i class="icons fa-solid fa-flag"></i>
        <i class="icons fa-solid fa-retweet"></i>
        <i class="icons fa-solid fa-heart"></i>
      </div>
    </footer>
  </article>`);
  };


  $('#tweet-form').on('submit', function(event) {
    event.preventDefault();
    const data = $(this).serialize();
    const chars = $("#tweet-text").val().length;

    //error handling.
    if (chars > 140) {
      // throws error if there are too many chars.
      return $(".errorTooManyChars").fadeIn(1000);
    }
    if (chars < 1) {
      // throws error if there are no chars.
      return $('.errorNoChars').fadeIn(1000);

    }

    $.post('/tweets', data).then(function() {
      loadTweets();
      $('.tweets-container').empty();
    });
  });

  const loadTweets = function() {
    $.ajax('/tweets', {
      method: 'GET',
      dataType: 'JSON'
    }).then(function(render) {
      renderTweets(render);
    });
  };

  loadTweets();
})

