var util = {};

util.truncateArticles = function() {
  $('#body').children(':nth-child(n+2)').hide();
  // $('main .readLess').hide();
  $('main .readMore').on('click', function(event) {
    event.preventDefault();
    $(this).prev('.article-body').children().show();
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

$(function() {
  // util.truncateArticles();
  util.handleMainNav();
});
