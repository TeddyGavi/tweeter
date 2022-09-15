/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

//function which prevents a XSS attack
const escapeX = (str) => {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

const loadTweets = () => {
  $.get("/tweets", function(data) {
    renderTweet(data);
  });
};

/*
DEPRECATED wrote my own function before using timeAgo
  const getDaysAgo = (timeStamp) => {
    //timestamp must be in milliseconds
    //need to add a check for this possibly?
    const timeStampNow = new Date().getTime();
    const diffInUnix = timeStampNow - timeStamp;
    const diffInDays = Math.floor(diffInUnix / 1000 / 60 / 60 / 24);
 
    return diffInDays;
  };
*/

const renderTweet = (db) => {
  db.forEach(e => $(".tweet-container").prepend(createTweetElement(e)));
};

const createTweetElement = (tweet) => {
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
        <p>${escapeX(tweet.content.text)}</p>
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

//clears error container, shows the proper error and hides it after 1 second
const slideError = (boolean) => {
  $("#tweet-error").empty().append(displayError(boolean)).slideDown("slow").delay(1000).slideUp("slow");
  setTimeout('$(".new-tweet-btn").removeAttr("disabled")', 2100)
};

const displayError = (isEmpty) => {
  const message = isEmpty ? "Your tweet cannot be empty!" : "Please shorten your tweet and try again!";
  const $errorContainer = $(
    `<div id="tweet-error-container">   
       <h3><i class="fa-solid fa-triangle-exclamation"></i><strong>${escapeX(message)}</strong><i class="fa-solid fa-triangle-exclamation"></i></h3></div>`
  );
  return $errorContainer;
};

//jQuery Begins, load page and hide errors and new tweet form
$(document).ready(function() {
  $("#tweet-error").hide();
  $(".new-tweet").hide();
  loadTweets();

  $("#tweet-form").submit(function(e) {
    e.preventDefault();
    e.stopPropagation();
    // Need to check if the tweet is above the char count, or empty! show the proper error message.
    const $errorSection = $("#tweet-error");
    const $data = $(this).serialize();
    const $charCount = $(this).find(".counter").html();
    //if the tweet error container is showing an error, then do not allow clicks on the tweet button to alter anything
    if (Number($charCount) === 140) {
      $(".new-tweet-btn").attr("disabled", "disabled")
      slideError(true);
      return;
    } if (Number($charCount) < 0) {
      $(".new-tweet-btn").attr("disabled", "disabled")
      slideError(false);
      return;
    }

    //shorthand method to send post request to append the database
    $.post("/tweets", $data, () => {
      $("#tweet-form").trigger("reset");
      $(this).find(".counter").html(140);
      $errorSection.slideUp("slow").empty();
      $(".tweet-container").empty(); // reset the tweets
      loadTweets();
    });
    $(".new-tweet").delay(500).slideUp("slow");
  });
  //Allows user to toggle new tweet form
  $("#toggle-new-tweet-btn").click(function(e) {
    e.stopPropagation();
    $(".new-tweet").slideToggle("slow", function() {
      $("#tweet-text").focus();
    });
  });
});