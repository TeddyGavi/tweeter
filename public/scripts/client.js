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
        "handle": "@rd" },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1661475819000
    }
  ];

  const getDaysAgo = (timeStamp) => {
    //timesstamp must be in milliseconds
    //need to add a check for this possibly?
    const timeStampNow = new Date().getTime();
    const diffInUnix = timeStampNow - timeStamp;
    const diffInDays = Math.floor(diffInUnix / 1000 / 60 / 60 / 24);

    return diffInDays;
  };
  

  const renderTweet = (db) => {
    db.forEach(e => $(".tweet-container").append(createTweetElement(e)));
  };

  const createTweetElement = (tweet) => {
    const daysAgo = getDaysAgo(tweet.created_at);
    

    const $tweetcontainer = $(

      `
    <article class="tweet">
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
        <div class="footer-date">${daysAgo} Days Ago</div>
        <div class="social-icons">
           <i class="fa-solid fa-flag"></i>
           <i class="fa-solid fa-retweet"></i>
           <i class="fa-solid fa-heart"></i>   
        </div>
      </footer>
    </article>

          `
           
    );
    return $tweetcontainer;
  };

  renderTweet(data);

});