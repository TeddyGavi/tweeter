//all jQuery needs to nest inside a document ready, this will run a callback when the DOM is ready for manipulation, without it we might try to change HTML before the DOM is ready.

$(document).ready(function() {
  
  $("#tweet-text").on('input', function(e) {
    e.stopPropagation();
    // console.log(e.bubbles);
    const charCount = $(this).val().length;
    const charLeft = 140 - charCount;
    const counterNum = $(this).siblings().children(".counter");
   
    counterNum.html(charLeft);

    counterNum.toggleClass("counter-below", charLeft < 0);

  });

  
});

