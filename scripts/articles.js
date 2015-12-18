function Article (opts) {
  Object.keys(opts).forEach(function(propName, index, keys) {
    // console.log(keys);
    this[propName] = opts[propName];
  // on the next line 'this' is a context paramaeter so that the anonymous callback function knows to reference the instance of this article and not the window.
  },this);

  this.body = opts.body || marked(this.markdown);
}

Article.all = [];

Article.prototype.insertRecord = function(callback) {
  // insert article record into database
  webDB.execute(
    [
      {
        'sql': 'INSERT INTO articles (title, author, authorUrl, category, publishedOn, markdown) VALUES (?, ?, ?, ?, ?, ?);',
        'data': [this.title, this.author, this.authorUrl, this.category, this.publishedOn, this.body],
      }
    ],
      callback
  );
};

Article.requestAll = function(callback) {
  $.getJSON('/scripts/hackerIpsum.json', function (data) {
    data.forEach(function(item) {
      var article = new Article(item);
      article.insertRecord();
      Article.all.push(article);
    });
    callback();
  });
};

Article.loadAll = function(callback) {
  var callback = callback || function() {};

  if (Article.all.length === 0) {
    webDB.execute(
      'SELECT * FROM articles ORDER BY publishedOn DESC;',
      function (rows) {
        if (rows.length === 0) {
          Article.requestAll(callback);
        } else {
          rows.forEach(function(row) {
            Article.all.push(new Article(row));
          });
          callback();
        }
      }
    );
  } else {
    callback();
  }
};

Article.findByID = function(id, callback) {
  webDB.execute (
    [
      {
        'sql': 'SELECT * FROM articles WHERE id = ?',
        'data': [id]
      }
    ],
    callback
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

// Article.prototype.toHTML = function() {
//   // Populating article content
//   this.daysAgo =
//     parseInt((new Date() - new Date(this.publishedOn))/60/60/24/1000);
//
//   return this.template(this);
// };
