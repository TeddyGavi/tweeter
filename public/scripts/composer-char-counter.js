$(document).ready(function(){
  console.log(document);

 

  $("#tweet-text").on('input', function() {
    // console.log(this);
    const charCount = $(this).val().length
    const charLeft = 140 - charCount;
    if (charLeft <= 0) {
      
    }
    $(this).siblings().children(".counter").html(charLeft)


  });

})

