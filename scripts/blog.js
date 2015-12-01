var blog = {};
blog.articles = [];

blog.createArticles = function() {
  for (var i=0; i < blog.rawData.length; i++) {
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
    console.log('article' + i);
  }
};

$(document).ready(function() {
  blog.createArticles();
  blog.sortArticles();
  blog.insertArticles();
  $('article').first().remove();
});
