var bioView = {};

bioView.index = function() {
  bioView.ui();
  bioView.appendRepos();
  bio.requestUser(bioView.renderUserData);
};

bioView.appendRepos = function(callback) {
  var filtered = bio.repos.filter(function(repo) {
    return !repo.fork;
  });

  var _append = function(repo) {
    $('#about ul').append(bioView.renderRepos(repo));
  };
  filtered.forEach(_append);
};

bioView.renderRepos = function(repo) {
  return $('<li>').html('<a target="blank" href="' + repo.html_url + '">' + repo.full_name + '</a>');
};

bioView.renderUserData = function() {
  $('.avatar').attr('src', 'https://avatars.githubusercontent.com/u/14867317?v=3');
};

bioView.ui = function() {
  $('#blog').hide();
  $('#about').fadeIn(1000);
  $('#about ul').empty();
};
