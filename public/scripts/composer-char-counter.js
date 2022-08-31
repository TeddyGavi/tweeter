$(document).ready(function(){
  

 

  $("#tweet-text").on('input', function() {
    // console.log(this);
    const charCount = $(this).val().length
    const charLeft = 140 - charCount;
    const counterNum = $(this).siblings().children(".counter")

   counterNum.html(charLeft)

   counterNum.toggleClass("counter-below", charLeft < 0)

    // if (charLeft > 0) {
    //   counterNum.removeClass("counter-below")
    // }
    // else if (charLeft < 0) {
    //   counterNum.addClass("counter-below")
    // }
    
    // if (charLeft > 0) {
    //   counterNum.css("color", "black")
    // }
    // else if (charLeft < 0) {
    //   counterNum.css("color", "red")
    // }

  });

})

