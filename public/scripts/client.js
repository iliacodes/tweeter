/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function() {
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
        "handle": "@rd"
      },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1461113959088
    }
  ];

  // const $tweet = createTweetElement(tweetData);
  const escape = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  const renderTweets = function(tweets) {
    for (let tweet of tweets) {
      $(".tweets-container").prepend(createTweetElement(tweet));
    }
  };

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
      <div class="icons">
        <i class="fa-solid fa-flag"></i>
        <i class="fa-solid fa-retweet"></i>
        <i class="fa-solid fa-heart"></i>
      </div>
    </footer>
  </article>`);
  };


  $('#tweet-form').on('submit', function(event) {
    // event.preventDefault();
    const data = $(this).serialize();
    const chars = $("#tweet-text").val().length;

    if (chars > 140) {
      $(alert("Too many characters. Please create tweets below 140 characters."));
    }
    else if (chars < 1) {
      $(alert("Please input what you would like to tweet."));
    }

    $.post('/tweets', data);
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
  // renderTweets(data);
})

