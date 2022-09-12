//all jQuery needs to nest inside a document ready, this will run a callback when the DOM is ready for manipulation, without it we might try to change HTML before the DOM is ready.

$(document).ready(function () {

  $("#tweet-text").on('input', function (e) {
    e.stopPropagation();
    // console.log(e.bubbles);
    const charCount = $(this).val().length;
    const charLeft = 140 - charCount;
    const counterNum = $(this).siblings().children(".counter");

    counterNum.html(charLeft);
    counterNum.toggleClass("counter-below", charLeft < 0);
  });

  const $scrollTopBtn = $(this).find("#main-footer");

  /*   I adapted the "add callback to scroll to" from this post https://stackoverflow.com/questions/52292603/is-there-a-callback-for-window-scrollto in order make the scrollTop button preform a callback after scrolling to the top. If I simply tried to focus the textarea after scrolling to the top with window.scrollTo({top: 0, behavior :"smooth"}), the focus() method would override the scrollTo and the window would "jump", not acceptable */

  const scrollTop = (isTop, callback) => {
    const top = isTop
    const onScroll = () => {
      if (window.scrollY === top) {
        window.removeEventListener('scroll', onScroll)
        callback()
      }
    }
    window.addEventListener('scroll', onScroll)
    window.scrollTo({ top: top, behavior: "smooth" });
  };

  // the callBack for scrollTop() needs to do two things, so i created a new declaration
  const scrollToAndFocus = () => {
    $(".new-tweet").slideDown("slow", () => {
      $("#tweet-text").focus();
    })
  }

  // when the scroll to top button is clicked we jump to the top of the page and the tweet text are becomes in focus
  $scrollTopBtn.on('click', (e) => {
    e.stopPropagation();
    scrollTop(0, scrollToAndFocus);
  });

  // only want to show the scroll to top of page if we have scrolled down the same height as the nav bar
  $(this).on("scroll", () => {
    if (window.scrollY >= 120) {
      $(".right").addClass("hidden");
      $("nav").addClass("hidden");
      $("#nav-title").addClass("hidden");
      $("#main-footer").removeClass("hidden");
    } else {
      $(".right").removeClass("hidden");
      $("nav").removeClass("hidden");
      $("#nav-title").removeClass("hidden");
      $("#main-footer").addClass("hidden");
    }

  });
});

