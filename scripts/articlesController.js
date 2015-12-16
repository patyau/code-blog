var articlesController = {};

articlesController.index = function() {
  blog.loadArticles();
  $('#about').hide();
  $('#blog').show();
};

articlesController.byID = function(articleID) {
  console.log(articleID);
  // Article.find(articleID, articleView.byID);
};
