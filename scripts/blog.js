var blog = {};
blog.articles = [];

blog.loadArticles = function() {
  $.get('templates/template.html', function(data, message, xhr) {
    Article.prototype.template = Handlebars.compile(data);
    $.ajax({
      type: 'HEAD',
      url: 'scripts/hackerIpsum.json',
      success: blog.fetchArticles
    });
  });
};

blog.fetchArticles = function(data, message, xhr) {
  var newETag = xhr.getResponseHeader('eTag');
  if (!localStorage.articlesEtag
    || localStorage.articlesEtag != newETag) {
    console.log('cache miss!');
    localStorage.articlesEtag = newETag;

    // Remove all prior articles from the DB, and from blog:
    blog.articles = [];
    webDB.execute(
      'DELETE FROM articles;',
      blog.fetchJSON);
  } else {
    console.log('cache hit!');
    blog.fetchFromDB();
  };
};

blog.fetchJSON = function() {
  $.get('scripts/hackerIpsum.json', blog.updateArticles);
};

blog.updateArticles = function(data) {
  data.forEach(function(item) {
    var article = new Article(item);
    article.insertRecord();
  });
  blog.fetchFromDB();
};

blog.fetchFromDB = function(callback) {
  callback = callback || function() {};

  webDB.execute(
    'SELECT * FROM articles ORDER BY publishedOn DESC;',
    function (resultArray) {
      resultArray.forEach(function(ele) {
        blog.articles.push(new Article(ele));
      });
      blog.render();
    }
  );
};

// blog.initArticles = function() {
//   blog.render();
// };

blog.render = function() {
  blog.articles.forEach(function(ele, index) {
    blog.appendArticle(ele);
    blog.createFilters(ele);
    blog.createArticleID(index);
  });


  $('pre code').each(function(i, block) {
    hljs.highlightBlock(block);
  });
  blog.setArticleTeasers();
  blog.filterArticles();
  // blog.handleReadLessButton();
};

blog.appendArticle = function(a) {
  $('#app').append((new Article(a)).toHTML());
};


blog.createArticleID = function(index) {
  var $articleId = $('article').last();
  var setArticleId = 'article-' + (index + 1);
  $articleId.attr('id', setArticleId);
};

blog.filterArticles = function() {
  $('select[id="catSelect"]').change(function() {
    $('#authFilter').find('option:first').attr('selected', 'selected');
    $('main').find('article').show();

    if($(this).val() !== 'none') {
      $('.category:not(:contains(' + $(this).val() + '))').parents('article').hide();
    }
  });

  $('select[id="authSelect"]').change(function() {
    $('#catFilter').find('option:first').attr('selected', 'selected');
    $('main').find('article').show();

    if($(this).val() !== 'none') {
      $('.author:not(:contains(' + $(this).val() + '))').parents('article').hide();
    }
  });
};

blog.createFilters = function(ele) {
  var $authMenuItemClone = $('.authMenuItem').clone();
  $authMenuItemClone.removeAttr('class');

  $authMenuItemClone.attr('value', ele.author);
  $authMenuItemClone.text(ele.author);
  if ($('#authSelect').find('option[value="' + ele.author + '"]').length === 0) {
    $('#authSelect').append($authMenuItemClone);
  }

  var $catMenuItemClone = $('.catMenuItem').clone();
  $catMenuItemClone.removeAttr('class');
  $catMenuItemClone.attr('value', ele.category);
  $catMenuItemClone.text(ele.category);
  if ($('#catSelect').find('option[value="' + ele.category + '"]').length === 0) {
    $('#catSelect').append($catMenuItemClone);
  }
};

blog.setArticleTeasers = function() {
  $('article .body').children(':nth-child(n+5)').hide();
  $('article .readLess').hide();
  $('main .readMore').on('click', blog.handleReadMoreButton);

  // Still trying to figure out how to write this function
  // $('main .readLess').on('click', function(event) {
  //   event.preventDefault();
    // $(x).prev('article .body').children(':nth-child(n+5)').hide();
  // });
};

blog.handleReadMoreButton = function(event) {
  event.preventDefault();
  $(this).prev('article .body').children(':nth-child(n+5)').toggle();
  // $(this).text('READ LESS').attr("class", "less");
  // $(this).hide();
  // $(this).siblings('.readLess').show();
};

// blog.handleReadLessButton = function() {
//   $('main .less').on('click', function(event) {
//     event.preventDefault();
//     console.log('clicked on the read less button');
//     // $(this).text('READ MORE').attr("class", "readMore");
//   });
// };

blog.initNewArticlePage = function() {
  $.get('templates/template.html', function(data, message, xhr) {
    Article.prototype.template = Handlebars.compile(data);
  });
  $('#preview').hide();
  $('#article-export').hide();
};

blog.watchForm = function() {
  $('#new-form').on('change', 'input, textarea', blog.buildPreview);
};

blog.buildPreview = function() {
  $('#preview').show();
  var article = blog.buildArticle();
  $('#app-preview').html(article.toHTML());

  $('code').each(function(i, block) {
    hljs.highlightBlock(block);
  });
};

blog.buildArticle = function() {
  return new Article({
    title: $('#article-title').val(),
    category: $('#article-category').val(),
    author: $('#article-author').val(),
    authorUrl: $('#article-author-url').val(),
    markdown: $('#article-body').val(),
    publishedOn: new Date()
  });
};

blog.exportJSON = function() {
  $('#article-export').show();
  var jsonString = '';
  blog.articles.forEach(function(article) {
    jsonString += JSON.stringify(article) + ",\n";
  });
  $('#article-json').val('[' + jsonString + ']');
};

blog.handleSubmitButton = function() {
  $('#new-form').on('submit', function (e) {
    e.preventDefault();
    var article = blog.buildArticle();
    article.insertRecord();
    blog.exportJSON();
  });
};
