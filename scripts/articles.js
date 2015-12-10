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

Article.prototype.toHTML = function() {
  // Populating article content
  var html = this.compile(this);
  $('#app').append(html);
};

Article.prototype.insertRecord = function() {
  // insert article record into database
  html5sql.process(
    [
      {
        'sql': 'INSERT INTO articles (title, author, authorUrl, category, publishedOn, markdown) VALUES (?, ?, ?, ?, ?, ?);',
        'data': [this.title, this.author, this.authorUrl, this.category, this.publishedOn, this.body],
      }
    ],
    function() {
      console.log('successfully inserted record');
    }
  );
};

Article.prototype.createArticleID = function(index) {
  // Setting unique ID for each article
  var $articleId = $('article').last();
  var setArticleId = 'article-' + (index + 1);
  $articleId.attr('id', setArticleId);
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
