var stats = {};
stats.authors = [];
stats.words = [];
stats.eachAuthorWords = [];
var totalWords;
var wordCount;

// Calls all functions after finished getting data. Will run when dom is ready.
stats.init = function() {
  $.get('scripts/hackerIpsum.json', stats.getArticles)
    .done(function() {
      console.log('Finished getting the data. Let\'s run the functions...');
      //add functions here
      stats.totalArticles();
      stats.totalAuthors();
      stats.totalWords();
      stats.averageWordsPost();
      stats.averageWordsLengthPost();
      stats.averageWordsAuthor();
    });
};

// Setting the data for the articles
stats.getArticles = function(data) {
  console.log('getting the data');
  stats.data = data;
};

// Helper functions
stats.sum = function(a, b) {
  return a + b;
};

stats.average = function(a, b) {
  return a / b;
};

stats.pluck = function(property, collection) {
  return collection.map(function(e) {
    return e[property];
  });
};

// Main functions to get the stats we need
stats.totalArticles = function() {
  console.log('Total articles: ' + stats.data.length);
  $('#stats').append('<p>Total articles: ' + stats.data.length + '</p>');
  return 'Total Articles: ' + stats.data.length;
};

stats.totalAuthors = function() {
  // Finding unique authors using $.inArray method
  var uniqueAuthors = function(a) {
    if ($.inArray(a.author, stats.authors) < 0) {
      stats.authors.push(a.author);
    }
  };
  stats.data.map(uniqueAuthors);
  console.log('Total authors: ' + stats.authors.length);
  $('#stats').append('<p>Total authors: ' + stats.authors.length + '</p>');

  // Finding unique authors using $.unique method
  // stats.authors = stats.pluck('author', stats.data);
  // var uniqueAuthors = $.unique(stats.authors);
  // console.log('Total authors: ' + uniqueAuthors.length);
  // $('#stats').append('<p>Total authors: ' + uniqueAuthors.length + '</p>');
};

stats.countWords = function() {

};

stats.totalWords = function() {
  stats.words = stats.pluck('markdown', stats.data);
  wordCount = stats.words.map(function(str) {
    str = str.replace('##', '');
  });
  // console.log(stats.words);
  wordCount = stats.words.map(function(item) {
    // marked.wordCount;
    return item.split(' ').length;
  });
  console.log('Words for each entry: ' + wordCount);
  totalWords = wordCount.reduce(stats.sum);
  console.log('Total words all entries: ' + totalWords);
  $('#stats').append('<p>Total words: ' + totalWords + '</p>');
};

stats.averageWordsPost = function() {
  // console.log(total);
  var averageWords = stats.average(totalWords, stats.data.length);
  console.log('Avg words/post: ' + averageWords);
  $('#stats').append('<p>Average words per post: ' + averageWords + '</p>');
};

stats.averageWordsLengthPost = function() {
  // var averageWordLength = stats.pluck('markdown', stats.data);
  // averageWordPost = averageWordLength.map(function {
  //   averageWordLength.length
  // });
  // console.log(averageWordLength[0]);
};

stats.averageWordsAuthor = function() {
  // do stuff
  // stats.authors.forEach(function(element, index, array) {
  //   var countTemp = 0;
  //   var getAuthorWords = function(art) {
  //     if (art.author === element) {
  //       countTemp += stats.totalWords(art.markdown).length;
  //     };
  //   };
  //   stats.data.forEach(getAuthorWords);
  //   stats.eachAuthorWords.push(countTemp);
  // });
  // stats.uniqueAuthors.forEach(function(element, index, array) {
  //   console.log(element + ' ' + index + ' ' + array);
  // });
};

$(function() {
  stats.init();
});
