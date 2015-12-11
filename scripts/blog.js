var blog = {};
blog.articles = [];

blog.loadArticles = function() {
  $.get('templates/template.handlebars', function(data, message, xhr) {
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
  // console.log('getting the data');
  data.forEach(function(item) {
    var article = new Article(item);
    // blog.articles.push(article);
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
        // blog.articles.createFilters(ele);
      });
      blog.render();
      // callback();
    }
  );
};

// blog.initArticles = function() {
//   blog.render();
// };

blog.render = function() {
  blog.articles.forEach(blog.appendArticle);

  $('pre code').each(function(i, block) {
    hljs.highlightBlock(block);
  });
  blog.truncateArticles();
  // this.createFilters();
  // this.filterArticles();
  // blog.filterArticles();
};

blog.appendArticle = function(a) {
  $('#app').append((new Article(a)).toHTML());
};

blog.filterArticles = function() {
  $('select[id="catSelect"]').change(function() {
    $('#authFilter').find('option:first').attr('selected', 'selected');
    $('main').find('article').show();

    // console.log($(this).val());
    if($(this).val() !== 'none') {
      $('.category:not(:contains(' + $(this).val() + '))').parents('article').hide();
    }
  });

  $('select[id="authSelect"]').change(function() {
    $('#catFilter').find('option:first').attr('selected', 'selected');
    $('main').find('article').show();

    // console.log($(this).val());
    if($(this).val() !== 'none') {
      $('.author:not(:contains(' + $(this).val() + '))').parents('article').hide();
    }
  });
};

blog.truncateArticles = function() {
  // $('article p:not(:first-child').hide();
  // // $('main .readLess').hide();
  // $('.readMore').on('click', function(event) {
  //   event.preventDefault();
  //   $(this).prev('#body').children().show();
  //   $(this).hide();
  //
  //   // $(this).find('.readLess').show();
  //   // console.log(this);
  // });
  // // $('main .readLess').on('click', function(event) {
  // //   blog.hideArticles();
  // // });
};

// blog.createArticles = function() {
//   var count = 0;
//   for (var i=0; i < blog.articles.length; i++) {
//     if (blog.articles[i].publishedOn === '' || blog.articles[i].publishedOn.toLowerCase() === 'draft') {
//       // console.log('no');
//     }
//     else {
//       var article = new Article(blog.articles[i]);
//       blog.articles.push(article);
//       count++;
//     }
//   }
// };



blog.newArticlePreview = function() {
  // var newEntry = {};
  // newEntry.title = $('#article-title').val();
  // newEntry.category = $('#article-category').val();
  // newEntry.author = $('#article-author').val();
  // newEntry.authorUrl = $('#article-author-url').val();
  // newEntry.body = $('#article-body').val();
  // newEntry.body = marked(newEntry.body);
  // newEntry.publishedOn = new Date();
  //
  // var articleP = new Article(newEntry);
  //
  // var source = $.get('#blogArticle').html();
  // var template = Handlebars.compile(source);
  // var html = template(articleP);
  //
  // $('#preview').append(html);
  //
  // // $('.title').append(titleTemp);
  // // $('.author').append(authorTemp);
  // // $('.authorUrl').attr('href',authorUrlTemp);
  // // $('.category').append(categoryTemp);
  // // $('.body').html(bodyTemp);
  // $('pre code').each(function (i, block) {
  //   hljs.highlightBlock(block);
  // });
  //
  // // JSON data export feature
  // var stringData = {
  //   title: newEntry.title,
  //   category: newEntry.category,
  //   author: newEntry.author,
  //   authorUrl: newEntry.authorUrl,
  //   publishedOn: newEntry.publishedOn,
  //   body: newEntry.body
  // };
  // var jsonString = JSON.stringify(stringData);
  // // console.log(jsonString);
  // $('#article-json').val(jsonString);
  //
  // // calling truncate articles function
  // util.truncateArticles();
};
