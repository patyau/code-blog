function Article (opts) {
  Object.keys(opts).forEach(function(propName, index, keys) {
    // console.log(keys);
    this[propName] = opts[propName];
  // on the next line 'this' is a context paramaeter so that the anonymous callback function knows to reference the instance of this article and not the window.
  },this);

  this.body = opts.body || marked(this.markdown);
}

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

Article.findByCategory = function(category, callback) {
  webDB.execute (
    [
      {
        'sql': 'SELECT * FROM articles WHERE category = ?',
        'data': [category]
      }
    ],
    callback
  );
};
