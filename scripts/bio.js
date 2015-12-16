var bio = {};
bio.repos = [];
bio.user;

bio.requestGithubData = function(callback) {
  bio.requestRepos();
  bio.requestUser();
}

bio.requestRepos = function(callback) {
  $.ajax({
    type: 'GET',
    url: '/github.com/user/repos?sort=updated',
  success: function(data, message, xhr) {
    bio.repos = data;
  }).done(callback);
};

bio.requestUser = function(callback) {
  $.ajax({
    type: 'GET',
    url: '/github.com/users/patyau',
  success: function(data, message, xhr) {
    console.log(data);
    bio.user = data;
  }).done(callback);
};
