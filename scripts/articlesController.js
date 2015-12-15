var articlesController = {};

articlesController.index = function() {
  blog.loadArticles();
  $('#about').hide();
  $('#blog').show();
};

articlesController.single = function() {

};
