page('/',
  articlesController.template,
  articlesController.index
);

page('/index',
  articlesController.template,
  articlesController.index
);

page('/articles',
  articlesController.template,
  articlesController.index
);

page('/articles/id/:id',
  articlesController.template,
  articlesController.id,
  articlesController.show
);

page('/articles/category/:category',
  articlesController.template,
  articlesController.category,
  articlesController.show
);

page('/articles/author/:author',
  articlesController.template,
  articlesController.author,
  articlesController.show
);

page('/bio',
  bioController.index
);

page.start();
