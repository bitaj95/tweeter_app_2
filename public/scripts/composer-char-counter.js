$(document).ready(function() {
  
  $("textarea").on('keyup', function() {
    let charactersRemaining = 140 - $(this).val().length;
    $(this).nextAll().find('.counter').text(charactersRemaining);

    if (charactersRemaining < 0) {
      $(this).nextAll().find('.counter').css("color", "red");
    } else {
      $(this).nextAll().find('.counter').css("color", "black");
    }
  });
});
