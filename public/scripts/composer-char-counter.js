$(document).ready(function() {
  
  $("textarea").on('keyup', function() {
    console.log(140 - $('textarea').val().length); //The this keyword here refers to something else!
  });

});
