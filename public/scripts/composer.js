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

const $scrollTopBtn = $(this).find("#main-footer")

const scrollTop = () => {
  document.documentElement.scrollTo({top: 0, behavior: "smooth"})
}

$scrollTopBtn.on('click', () => {
  scrollTop();
  $(".new-tweet").slideDown("slow", function() {
    $("#tweet-text").focus() 
  })
})

$(this).on("scroll", () => {
 $("#main-footer").toggleClass("hidden", window.scrollY <= 120)
 
 if (window.scrollY >= 120) {
  $(".right").hide();
  $("nav").addClass("hidden");
} else {
  $(".right").show();
  $("nav").removeClass("hidden");
}
  })
});

