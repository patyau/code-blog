page('/', articlesController.index);
page('/index', articlesController.index);
page('/articles', articlesController.index);

page('/bio', bioController.index);

page.start();
