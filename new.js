function newArticlePreview() {
  var $titleTemp = $('#article-title').val();
  var $categoryTemp = $('#article-category').val();
  var $authorTemp = $('#article-author').val();
  var $authorUrlTemp = $('#article-author-url').val();
  var $bodyTemp = $('#article-body').val();
  $bodyTemp = marked($bodyTemp);
  var newArticlePublish = new Date();

  $('.title').append($titleTemp);
  $('.author').append($authorTemp);
  $('.authorUrl').append($authorUrlTemp);
  $('.category').append($categoryTemp);
  $('.body').html($bodyTemp);

  var stringData = {
    title: $titleTemp,
    category: $categoryTemp,
    author: $authorTemp,
    authorUrl: $authorUrlTemp,
    publishedOn: newArticlePublish,
    body: $bodyTemp
  };

  var jsonString = JSON.stringify(stringData);
  console.log(jsonString);
  $('#article-json').val(jsonString);
};

$(document).ready(function(event) {
  event.preventDefault;
  $('#new-form').submit(newArticlePreview);
});
