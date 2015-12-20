var util = {};

util.getParameterByKey = function (key) {
  //Return a value stored in a given key from browser query string.
  var match = RegExp('[?&]' + key + '=([^&]*)').exec(window.location.search);
  return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
};

$(function() {
  $('#blog').hide();
  $('#about').hide();
  // util.handleMainNav();
});
