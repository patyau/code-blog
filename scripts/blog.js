var blog = {};
blog.articles = [];

blog.getData = function() {
  $.get('scripts/hackerIpsum.json', blog.setArticles)
  .done(function() {
    console.log('Finished getting the data. Let\'s run the functions...');
    //add functions here
  });
};

blog.setArticles = function(data) {
  // console.log('getting the data');
  data.forEach(function(item) {
    var article = new Article(item);
    blog.articles.push(article);
  });
  blog.sortArticles();
  blog.compileArticle();
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

blog.sortArticles = function() {
  this.articles.sort(function(a, b) {
    return b.days - a.days;
  });
};

blog.insertArticles = function() {
  for (var i=0; i < blog.articles.length; i++) {
    this.articles[i].toHTML(i);
    this.articles[i].createArticleID(i);
    this.articles[i].createFilters();
    this.articles[i].insertRecord();
  }
};

blog.compileArticle = function () {
  $.get('templates/template.handlebars', function(data) {
    Article.prototype.compile = Handlebars.compile(data);
  }).done(function() {
    blog.insertArticles();
  });
};

blog.newArticlePreview = function() {
  var newEntry = {};
  newEntry.title = $('#article-title').val();
  newEntry.category = $('#article-category').val();
  newEntry.author = $('#article-author').val();
  newEntry.authorUrl = $('#article-author-url').val();
  newEntry.body = $('#article-body').val();
  newEntry.body = marked(newEntry.body);
  newEntry.publishedOn = new Date();

  var articleP = new Article(newEntry);

  var source = $.get('#blogArticle').html();
  var template = Handlebars.compile(source);
  var html = template(articleP);

  $('#preview').append(html);

  // $('.title').append(titleTemp);
  // $('.author').append(authorTemp);
  // $('.authorUrl').attr('href',authorUrlTemp);
  // $('.category').append(categoryTemp);
  // $('.body').html(bodyTemp);
  $('pre code').each(function (i, block) {
    hljs.highlightBlock(block);
  });

  // JSON data export feature
  var stringData = {
    title: newEntry.title,
    category: newEntry.category,
    author: newEntry.author,
    authorUrl: newEntry.authorUrl,
    publishedOn: newEntry.publishedOn,
    body: newEntry.body
  };
  var jsonString = JSON.stringify(stringData);
  // console.log(jsonString);
  $('#article-json').val(jsonString);

  // calling truncate articles function
  util.truncateArticles();
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

$(document).ready(function() {
  // util.handleMainNav();
  // blog.getData();
  // blog.createArticles();
  // blog.sortArticles();
  // blog.compileArticle();
  // blog.filterArticles();
  // util.truncateArticles();
  // newArticlePreview();
  // $('article').first().remove();
  // $('#template').hide();
});
