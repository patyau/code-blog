page('/', articlesController.template, articlesController.index);
// page('/index', articlesController.template, articlesController.index);
// page('/articles', articlesController.template, articlesController.index);

page('/articles/category/:category', articlesController.template, articlesController.category, articlesController.show);
// page('/articles/author/:author', articlesController.author);

// page('/articles/id/:id', function(id) {
//   var articleID = id.params.id;
//   console.log(articleID);
//   articlesController.byID(articleID);
// });

page('/bio', bioController.index);

page.start();
