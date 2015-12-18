var articlesController = {};

articlesController.index = function() {
  Article.loadAll(articlesView.index);
};

articlesController.template = function(ctx, next) {
  if (articlesView.template) {
    next();
  } else {
    $.get('templates/template.html', function(data, message, xhr) {
      articlesView.template = Handlebars.compile(data);
      next();
    });
  }
};

articlesController.byID = function(articleID) {
  // console.log(articleID);
  Article.find(articleID, articleView.byID);
};

articlesController.category = function(ctx, next) {
  var categoryData = function(data) {
    console.log('in categoryData callback');
    console.log(data);
  };
  Article.findByCategory(ctx.params.category, categoryData);
  // console.log(ctx);
};

articlesController.author = function(ctx, next) {
  console.log(ctx);
};

articlesController.show = function(ctx, next) {
  console.log('in show action');
  console.log(ctx);
};
