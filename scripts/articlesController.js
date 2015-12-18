var articlesController = {};

articlesController.index = function() {
  Article.loadAll(articlesView.index);
};

articlesController.template = function(ctx, next) {
  if (articlesView.template) {
    next();
  } else {
    $.get('/templates/template.html', function(data, message, xhr) {
      articlesView.template = Handlebars.compile(data);
      next();
      // console.log(data);
    });
  }
};

articlesController.byID = function(articleID) {
  // console.log(articleID);
  Article.find(articleID, articleView.byID);
};

articlesController.category = function(ctx, next) {
  var categoryData = function(data) {
    ctx.articles = data;
    next();
  };
  Article.findByCategory(ctx.params.category, categoryData);
  // console.log(categoryData);
};

articlesController.author = function(ctx, next) {
  console.log(ctx);
};

articlesController.show = function(ctx, next) {
  articlesView.show(ctx.articles);
  // console.log(next);
};
