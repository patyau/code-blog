var Article = function(props) {
  this.title = props.title;
  this.category = props.category;
  this.author = props.author;
  this.authorUrl = props.authorUrl;
  this.publishedOn = props.publishedOn;
  this.body = props.body;
}

Article.prototype.toHTML = function() {
  return '<article>' +
  '<h1>' + this.title + '</h1>' +
  this.author + '<br />'
  this.authorUrl + '<br />'
  this.publishedOn +
  '<p>' + this.body + '</p>'
  '</article>'
}
