var util = {};

util.handleMainNav = function() {
  $('#about').hide();
  $('#aboutTab').on('click', function(e) {
    $('#blog').hide();
    $('#about').show();
  });
  $('#blogTab').on('click', function(e) {
    $('#about').hide();
    $('#blog').show();
  });
};

$(function() {
  util.handleMainNav();
});
