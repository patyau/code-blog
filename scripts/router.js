page('/', articlesController.index);
page('/index', articlesController.index);
page('/articles', articlesController.index);

page('/articles/id/:id', function(id) {
  var articleID = id.params.id;
  console.log(articleID);
  articlesController.byID(articleID);
});

page('/bio', bioController.index);

page.start();
