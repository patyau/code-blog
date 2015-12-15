var bioView = {};
bioView.repos = [];

bioView.index = function() {
  // do stuff
  bioView.ui();

  var _append = function(repo) {
    $('#about ul').append(bioView.render(repo));
  };

  bioView.repos.filter(function(repo) {
    return repo.stargazers
  }).forEach(_append);
};

bioView.render = function(repo) {
  // do stuff
  return $('<li>').text(repo.full_name);
};

bioView.ui = function() {
  // do stuff
  $('#blog').hide();
  $('#about').show();
};

bioView.requestRepos = function(callback) {
  $.ajax({
    type: 'GET',
    url: url: 'https://api.github.com/users/patyau/repos?sort=updated',
    headers: { Authorization: 'token ' + githubToken };
  }).done(function(data) {
    console.log(data);
    bioView.repos = data;
  });
};
