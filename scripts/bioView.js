var bioView = {};
bioView.repos = [];
bioView.user;

bioView.requestRepos = function(callback) {
  $.ajax({
    type: 'GET',
    url: 'https://api.github.com/users/patyau/repos?sort=updated',
    headers: { Authorization: 'token ' + githubToken }
  }).done(function(data) {
    // console.log(data);
    bioView.repos = data;
  }).done(callback);
};

bioView.requestUser = function(callback) {
  $.ajax({
    type: 'GET',
    url: 'https://api.github.com/users/patyau',
    headers: { Authorization: 'token ' + githubToken }
  }).done(function(data) {
    console.log(data);
    bioView.user = data;
  }).done(callback);
  // console.log(bioView.user);
};

bioView.renderUserData = function() {
  var avatar = $('<img>')
    .attr('src', 'https://avatars.githubusercontent.com/u/14867317?v=3')
    .attr('class', 'avatar');
  $(avatar).prependTo('#bio-intro');
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
  $('#about ul').empty();
  // console.log('running bioView.ui');
};
