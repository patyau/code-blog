var Article = function(props) {
  this.title = props.title;
  this.category = props.category;
  this.author = props.author;
  this.authorUrl = props.authorUrl;
  this.body = props.body;
  this.days = Date.parse(props.publishedOn);
}

Article.prototype.toHTML = function() {
  var $articleCopy = $('#template').clone();
  $articleCopy.find('.title').html(this.title);
  $articleCopy.find('.author').html(this.author);
  $articleCopy.find('.authorUrl').attr('href',this.authorUrl);
  $articleCopy.find('.days').html(this.days);
  $articleCopy.find('.body').html(this.body);
  $articleCopy.appendTo('main');
};

for (var i=0; i < blog.rawData.length; i++) {
  var create = new Article(blog.rawData[i]);
  blog.articles.push(create);
};

blog.articles.sort(function(a, b) {
  return b.days - a.days;
});

for (var i=0; i < blog.rawData.length; i++) {
  blog.articles[i].toHTML();
  console.log('article' + i);
};
