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

$('header').on('click', 'a', function() {
  $('.menu a').each(function() {
    $(this).attr('class', 'inactive');
  });
  $(this).attr('class', 'active');
});

$(function() {
  webDB.init();
});
