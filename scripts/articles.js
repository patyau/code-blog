function Article (opts) {
  Object.keys(opts).forEach(function(propName, index, keys) {
    this[propName] = opts[propName];
  // on the next line 'this' is a context paramaeter so that the anonymous callback function knows to reference the instance of this article and not the window.
  },this);

  this.body = opts.body || marked(this.markdown);
}

// Article.prototype.daysAgo = function() {
//   var oneDay = 1000 * 60 * 60 * 24;
//
//   var currentDay = new Date();
//   var publishDay = new Date(this.days);
//
//   var diffDays = currentDay - publishDay;
//   return Math.round(diffDays/oneDay);
// };

Article.prototype.toHTML = function() {
  // Populating article content
  this.daysAgo =
    parseInt((new Date() - new Date(this.publishedOn))/60/60/24/1000);

  return this.template(this);
};

Article.prototype.insertRecord = function(callback) {
  // insert article record into database
  webDB.execute(
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

Article.prototype.createFilters = function(ele) {
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

Article.prototype.createArticleID = function(index) {
  // Setting unique ID for each article
  var $articleId = $('article').last();
  var setArticleId = 'article-' + (index + 1);
  $articleId.attr('id', setArticleId);
};
