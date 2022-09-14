/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function () {
  $("#tweet-error").hide();
  $(".new-tweet").hide();

  //function which prevents a XSS attack
  const escape = (str) => {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  const loadTweets = () => {
    $.get("/tweets", function (data) {
      renderTweet(data);
    });
  };
  /* wrote my own function before using timeAgo
    const getDaysAgo = (timeStamp) => {
      //timestamp must be in milliseconds
      //need to add a check for this possibly?
      const timeStampNow = new Date().getTime();
      const diffInUnix = timeStampNow - timeStamp;
      const diffInDays = Math.floor(diffInUnix / 1000 / 60 / 60 / 24);
  
      return diffInDays;
    }; */

  const renderTweet = (db) => {
    db.forEach(e => $(".tweet-container").prepend(createTweetElement(e)));
  };

  const createTweetElement = (tweet) => {
    // const daysAgo = getDaysAgo(tweet.created_at); wrote my own function before using timeAgo library
    const daysAgo = timeago.format(tweet.created_at);
    const $tweetContainer = $(
      `<article class="tweet">
      <header>
        <figure>
          <img class="user-icon" src="${tweet.user.avatars}" alt="black outline image of user icon"/>
          <figcaption>${tweet.user.name}</figcaption>
        </figure>
        <div class="tag">${tweet.user.handle}</div>
      </header>
      <div class="tweet-body-container">
        <p>${escape(tweet.content.text)}</p>
      </div>
      <footer>
        <div class="footer-date">${daysAgo}</div>
        <div class="social-icons">
           <i class="fa-solid fa-flag"></i>
           <i class="fa-solid fa-retweet"></i>
           <i class="fa-solid fa-heart"></i>   
        </div>
      </footer>
    </article>`
    );
    return $tweetContainer;
  };

  //clears error container, shows the proper error and hides it after 3 seconds
  const slideError = (boolean) => {
    $("#tweet-error").empty().append(displayError(boolean)).slideDown("slow");
  }

  const displayError = (isEmpty) => {
    const message = isEmpty ? "Your tweet cannot be empty!" : "Please shorten your tweet and try again!";
    const $errorContainer = $(
      `<div id="tweet-error-container">   
       <h3><i class="fa-solid fa-triangle-exclamation"></i><strong>${escape(message)}</strong><i class="fa-solid fa-triangle-exclamation"></i></h3></div>`
    );
    return $errorContainer;
  };

  loadTweets();

  $("#tweet-form").submit(function (e) {
    e.preventDefault();
    e.stopPropagation();
    // Need to check if the tweet is above the char count, or empty! show the proper error message.
    const $errorSection = $("#tweet-error");
    const $data = $(this).serialize();
    const $charCount = $(this).find(".counter").html();
    if (Number($charCount) === 140) {
      slideError(true);
      return;
    } if (Number($charCount) < 0) {
      slideError(false)
      return;
    }

    $.post("/tweets", $data, () => {
      $("#tweet-form").trigger("reset");
      $(this).find(".counter").html(140);
      $errorSection.slideUp("slow").empty();
      $(".tweet-container").empty(); // reset the tweets
      loadTweets();
    });
  });

  $("#toggle-new-tweet-btn").click(function (e) {
    e.stopPropagation();
    $(".new-tweet").slideToggle("slow", function () {
      $("#tweet-text").focus();
    });
  });
});