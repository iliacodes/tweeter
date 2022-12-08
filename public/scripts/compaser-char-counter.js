$(document).ready(function() {

  $("#tweet-text").on('input', function() {
    const input = $(this);
    const counter = $('form').find('.counter');
    const remaining = (140 - input.val().length);

    counter.text(remaining);
    if (remaining < 0) {
      counter.addClass("counterColor");
    } else {
      counter.removeClass("counterColor");
    }
  })
});