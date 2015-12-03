function Article (props) {
  this.title = props.title;
  this.category = props.category;
  this.author = props.author;
  this.authorUrl = props.authorUrl;
  this.body = props.body;
  this.days = Date.parse(props.publishedOn);
  this.age = this.daysAgo;
};

Article.prototype.daysAgo = function() {
  var oneDay = 1000 * 60 * 60 * 24;

  var currentDay = new Date();
  var publishDay = new Date(this.days);

  var diffDays = currentDay - publishDay;
  return Math.round(diffDays/oneDay);
};

Article.prototype.toHTML = function(index) {
  var $articleCopy = $('article').first().clone();
  var articleId = 'article-' + (index + 1);
  // console.log(articleId);
  $articleCopy.attr('id', articleId);
  // console.log(index + 1);
  // console.log($articleCopy.attr('id'));

  $articleCopy.find('.title').html(this.title);
  $articleCopy.find('.author').html(this.author).attr('id',this.author);
  $articleCopy.find('.authorUrl').attr('href',this.authorUrl);
  $articleCopy.find('#days').html(this.daysAgo());
  $articleCopy.find('.category').html(this.category).attr('id',this.category);
  $articleCopy.find('.body').html(this.body);
  $articleCopy.appendTo('#blog');
};

Article.prototype.createFilters = function() {
  var $authMenuItemClone = $('.authMenuItem').clone();
  $authMenuItemClone.removeAttr('class');
  $authMenuItemClone.attr('value', this.author);
  $authMenuItemClone.text(this.author);
  if ($('#authSelect').find('option[value="' + this.author + '"]').length === 0) {
    $('#authSelect').append($authMenuItemClone);
  }

  var $catMenuItemClone = $('.catMenuItem').clone();
  $catMenuItemClone.removeAttr('class');
  $catMenuItemClone.attr('value', this.category);
  $catMenuItemClone.text(this.category);
  if ($('#catSelect').find('option[value="' + this.category + '"]').length === 0) {
    $('#catSelect').append($catMenuItemClone);
  }
};
