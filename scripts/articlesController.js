var articlesController = {};

articlesController.index = function() {
  articlesView.showDropdowns();
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
  articlesView.hideDropdowns();
  var idData = function(data) {
    ctx.articles = data;
    // $('form').each().hide();
    next();
  };
  Article.findById(ctx.params.id, idData);
};

articlesController.category = function(ctx, next) {
  articlesView.showDropdowns();
  var categoryData = function(articles) {
    ctx.articles = articles;
    next();
  };
  Article.findByCategory(ctx.params.category, categoryData);
};

articlesController.author = function(ctx, next) {
  articlesView.showDropdowns();
  var authorData = function(articles) {
    ctx.articles = articles;
    next();
  };
  Article.findByAuthor(ctx.params.author, authorData);};

articlesController.show = function(ctx) {
  articlesView.show(ctx.articles);
};
