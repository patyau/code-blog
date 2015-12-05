var blog = {};
blog.articles = [];

blog.createArticles = function() {
  var count = 0;
  for (var i=0; i < blog.rawData.length; i++) {
    if (blog.rawData[i].publishedOn === '' || blog.rawData[i].publishedOn.toLowerCase() === 'draft') {
      console.log('no');
    }
    else {
      var article = new Article(blog.rawData[i]);
      blog.articles.push(article);
      count++;
    }
  }
};

blog.sortArticles = function() {
  this.articles.sort(function(a, b) {
    return b.days - a.days;
  });
};

blog.insertArticles = function() {
  for (var i=0; i < blog.articles.length; i++) {
    this.articles[i].toHTML(i);
    this.articles[i].createFilters();
  }
};

blog.handleMainNav = function() {
  $('#about').hide();
  $('#aboutTab').on('click', function(e) {
    $('#blog').hide();
    $('#about').show();
  });
  $('#blogTab').on('click', function(e) {
    $('#about').hide();
    $('#blog').show();
  });
};

blog.truncateArticles = function() {
  $('article p:not(:first-child').hide();
  // $('main .readLess').hide();
  $('main .readMore').on('click', function(event) {
    event.preventDefault();
    $(this).parent().find('p').show();
    $(this).hide();
    // $(this).find('.readLess').show();
    // console.log(this);
  });
  // $('main .readLess').on('click', function(event) {
  //   blog.hideArticles();
  // });
};

blog.filterArticles = function() {
  $('select[id="catSelect"]').change(function() {
    $('#authFilter').find('option:first').attr('selected', 'selected');
    $('main').find('article').show();

    console.log($(this).val());
    if($(this).val() !== 'none') {
      $('.category:not(:contains(' + $(this).val() + '))').parents('article').hide();
    }
  });

  $('select[id="authSelect"]').change(function() {
    $('#catFilter').find('option:first').attr('selected', 'selected');
    $('main').find('article').show();

    console.log($(this).val());
    if($(this).val() !== 'none') {
      $('.author:not(:contains(' + $(this).val() + '))').parents('article').hide();
    }
  });
};

$(document).ready(function() {
  blog.handleMainNav();
  blog.createArticles();
  blog.sortArticles();
  blog.insertArticles();
  blog.filterArticles();
  blog.truncateArticles();
  newArticlePreview();
  // $('article').first().remove();
  // $('#template').hide();
});
