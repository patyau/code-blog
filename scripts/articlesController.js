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

articlesController.id = function(ctx, next) {
  var idData = function(data) {
    ctx.articles = data;
    next();
  };
  Article.findById(ctx.params.id, idData);
};

articlesController.category = function(ctx, next) {
  var categoryData = function(articles) {
    ctx.articles = articles;
    next();
  };
  Article.findByCategory(ctx.params.category, categoryData);
};

articlesController.author = function(ctx, next) {
  // console.log(ctx);
};

articlesController.show = function(ctx) {
  articlesView.show(ctx.articles);
};
