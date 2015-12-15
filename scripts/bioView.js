var bioView = {};
bioView.repos = [];

bioView.requestRepos = function(callback) {
  $.ajax({
    type: 'GET',
    url: 'https://api.github.com/users/patyau/repos?sort=updated',
    headers: { Authorization: 'token ' + githubToken }
  }).done(function(data) {
    console.log(data);
    bioView.repos = data;
  }).done(callback);
};

bioView.index = function() {
  // do stuff
  bioView.ui();
  var _append = function(repo) {
    $('#about ul').append(bioView.render(repo));
  };
  bioView.repos.forEach(_append);
};

bioView.render = function(repo) {
  // do stuff
  return $('<li>').html('<a target="blank" href="' + repo.html_url + '">' + repo.full_name + '</a>');
};

bioView.ui = function() {
  // do stuff
  $('#blog').hide();
  $('#about').show();
  console.log('running bioView.ui');
};
