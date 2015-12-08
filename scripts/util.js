var util = {};

util.truncateArticles = function() {
  $('article p:not(:first-child').hide();
  // $('main .readLess').hide();
  $('main .readMore').on('click', function(event) {
    event.preventDefault();
    $(this).parent().find('p').show();
    $(this).hide();
    // $(this).find('.readLess').show();
    // console.log(this);
  });
  // $('main .readLess').on('click', function(event) {
  //   blog.hideArticles();
  // });
};

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
