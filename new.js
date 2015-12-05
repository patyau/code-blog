function newArticlePreview() {
  var $titleTemp = $('#article-title').val();
  var $bodyTemp = $('#article-body').val();
  var $authorTemp = $('#article-author').val();
  var $authorUrlTemp = $('#article-author-url').val();
  var $categoryTemp = $('#article-category').val();

  $('.title').append($titleTemp);
  $('.author').append($authorTemp);
  $('.authorUrl').append($authorUrlTemp);
  $('.category').append($categoryTemp);
  $('.body').append($bodyTemp);
};

$(document).ready(function(event) {
  event.preventDefault;
  $('#new-form').submit(newArticlePreview);
});
