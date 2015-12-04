// $('.cross').hide();
// $('.menu').hide();

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

// $('.tab').click(function() {
//   $('.menu').slideToggle('slow', function() {
//   $('.cross').hide();
//   $('.hamburger').show();
// });
//
// $('#blogTab').click(function() {
//   $('.menu').hide();
//   $('.cross').hide();
//   $('.hamburger').show();
// });
