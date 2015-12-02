var blog = {};
blog.articles = [];

blog.createArticles = function() {
  for (var i=0; i < blog.rawData.length; i++) {
    // if blog.rawData.publishedOn is naan then do this...
    var create = new Article(blog.rawData[i]);
    this.articles.push(create);
  }
};

blog.sortArticles = function() {
  this.articles.sort(function(a, b) {
    return b.days - a.days;
  });
};

blog.insertArticles = function() {
  for (var i=0; i < blog.rawData.length; i++) {
    this.articles[i].toHTML();
    this.articles[i].createFilters();
  }
};


blog.handleMainNav = function() {
  $('nav').on('click','.tab', function(e) {
    $('tab-content').hide();
    $('#' + $(this).data('content')).fadeIn();
  });
  $('.main-nav.tab:first').trigger('click');
};

blog.hideArticles = function() {
  $('article p:not(:first-child').hide();
  // $('main .readLess').hide();
  $('main .readMore').on('click', function(event) {
    event.preventDefault();
    $(this).parent().find('p').show();
    $(this).hide();
    // $(this).find('.readLess').show();
    console.log(this);
  });
  // $('main .readLess').on('click', function(event) {
  //   blog.hideArticles();
  // });
};

blog.createMenu = function() {
  $('select[id="catFilter"]').change(function() {
    $('#authFilter').find('option:first').attr('selected', 'selected');
    $('main').find('article').show();
    console.log($(this).val());
    if($(this).val() !== 'none') {
      $('#category:not(:contains(' + $(this).val() + '))').parent().hide();
    }
  })
};

$(document).ready(function() {
  blog.handleMainNav();
  blog.createArticles();
  blog.sortArticles();
  blog.insertArticles();
  blog.createMenu();
  blog.hideArticles();
  $('article').first().remove();
});
