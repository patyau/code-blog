var blog = {};
blog.articles = [];

blog.createArticles = function() {
  for (var i=0; i < blog.rawData.length; i++) {
    // if blog.rawData.publishedOn is naan then do this...
    var create = new Article(blog.rawData[i]);
    blog.articles.push(create);
  }
};

blog.sortArticles = function () {
  blog.articles.sort(function(a, b) {
    return b.days - a.days;
  });
};

blog.insertArticles = function() {
  for (var i=0; i < blog.rawData.length; i++) {
    blog.articles[i].toHTML();
    // console.log('article' + i);
  }
};

blog.handleMainNav = function() {
  $('nav').on('click','.tab', function(e) {
    $('tab-content').hide();
    $('#' + $(this).data('content')).fadeIn();
  });
  $('.main-nav.tab:first').trigger('click');
};

blog.hideArticles = function() {
  $('article p:not(:first-child').hide();
  // $('main .readLess').hide();
  $('main .readMore').on('click', function(event) {
    event.preventDefault();
    $(this).parent().find('p').show();
    $(this).hide();
    // $(this).find('.readLess').show();
    console.log(this);
  });
  // $('main .readLess').on('click', function(event) {
  //   blog.hideArticles();
  // });
};

$(document).ready(function() {
  blog.handleMainNav();
  blog.createArticles();
  blog.sortArticles();
  blog.insertArticles();
  blog.hideArticles();
  $('article').first().remove();
});
