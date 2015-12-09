var stats = {};
stats.authors = [];
stats.words = [];
var total;

$.get('scripts/hackerIpsum.json', function(data) {
  console.log('getting the data');
  stats.data = data;
})
  .done(function() {
    //add functions here
    console.log('finished getting the data');
    stats.totalArticles();
    stats.totalAuthors();
    stats.getWords();
    stats.averageWordsPost();
  });

stats.totalArticles = function() {
  console.log('Number of articles: ' + stats.data.length);
  $('#stats').append('<p>Total articles: ' + stats.data.length + '</p>');
  return 'Total Articles: ' + stats.data.length;
};

stats.pluck = function(property, collection) {
  return collection.map(function(e) {
    return e[property];
  });
};

stats.sum = function(a, b) {
  return a + b;
}

stats.average = function(a, b) {
  return a / b;
}

stats.totalAuthors = function() {
  stats.authors = stats.pluck('author', stats.data);
  var uniqueAuthors = $.unique(stats.authors);
  console.log(uniqueAuthors.length);
  $('#stats').append('<p>Total authors: ' + uniqueAuthors.length + '</p>');
};

stats.getWords = function() {
  stats.words = stats.pluck('markdown', stats.data);
  // console.log(stats.words);
  var wordCount = stats.words.map(function(item) {
    // item = item.replace('##', '/');
    // marked.wordCount;
    return item.split(' ').length;
  });
  console.log(wordCount);
  total = wordCount.reduce(stats.sum)
  console.log(total);
  $('#stats').append('<p>Total words: ' + total + '</p>');
};

stats.averageWordsPost = function() {
  // console.log(total);
  var averageWords = stats.average(total, stats.data.length);
  console.log(averageWords);
  $('#stats').append('<p>Average words per post: ' + averageWords + '</p>');
};

stats.averageWordsAuthor = function() {
  // do stuff
};
