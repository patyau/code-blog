var articlesView = {};

articlesView.render = function(article) {
  article.daysAgo =
    parseInt((new Date() - new Date(article.publishedOn))/60/60/24/1000);

  return articlesView.template(article);
};

articlesView.renderGroup = function(articleList) {
  $('#about').hide();

  $('#app')
    .append(
      articleList.map ( function(a) {
        articlesView.createFilters(a);
        return articlesView.render(a);
      })
    );

  $('pre code').each(function(i, block) {
    hljs.highlightBlock(block);
  });
  $('#blog').fadeIn(2000);

  articlesView.truncateArticles();
  articlesView.filterArticles();
};

articlesView.index = function() {
  articlesView.renderGroup(Article.all);
};

articlesView.truncateArticles = function() {
  $('article .body').children(':nth-child(n+5)').hide();
  $('article .readLess').hide();
  $('main .readMore').on('click', articlesView.handleReadMoreButton);
};

articlesView.handleReadMoreButton = function(event) {
  event.preventDefault();
  $(this).prev('article .body').children(':nth-child(n+5)').toggle();
};

articlesView.createFilters = function(a) {
  var $authMenuItemClone = $('.authMenuItem').clone();
  $authMenuItemClone.removeAttr('class');

  $authMenuItemClone.attr('value', a.author);
  $authMenuItemClone.text(a.author);
  if ($('#authSelect').find('option[value="' + a.author + '"]').length === 0) {
    $('#authSelect').append($authMenuItemClone);
  }

  var $catMenuItemClone = $('.catMenuItem').clone();
  $catMenuItemClone.removeAttr('class');
  $catMenuItemClone.attr('value', a.category);
  $catMenuItemClone.text(a.category);
  if ($('#catSelect').find('option[value="' + a.category + '"]').length === 0) {
    $('#catSelect').append($catMenuItemClone);
  }
};

articlesView.filterArticles = function() {
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
