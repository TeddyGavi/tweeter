/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function () {

    $("#tweet-form").submit(function(e) {
    e.preventDefault();
    const data = $(this).serialize();
    $.post("/tweets", data, () => {
      console.log("done appended DB");
    })
  })

  const loadTweets = () => {
    $.get("/tweets", function(data) {
      renderTweet(data)
    })
  }
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
    db.forEach(e => $(".tweet-container").append(createTweetElement(e)));
  };

  const createTweetElement = (tweet) => {
    // const daysAgo = getDaysAgo(tweet.created_at); wrote my own function before using timeAgo library
    const daysAgo = timeago.format(tweet.created_at)
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
        <p>${tweet.content.text}</p>
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

  loadTweets();
});