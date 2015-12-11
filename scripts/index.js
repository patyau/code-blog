$('.hamburger').click(function() {
  $('.menu').slideToggle('slow', function() {
    $('.hamburger').hide();
    $('.cross').show();
  });
});

$('.cross').click(function() {
  $('.menu').slideToggle('slow', function() {
    $('.cross').hide();
    $('.hamburger').show();
  });
});

$(function() {
  webDB.init();
  util.handleMainNav();
  blog.loadArticles();
});
