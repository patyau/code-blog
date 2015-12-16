var bio = {};
bio.repos = [];
bio.user;

bio.requestRepos = function(callback) {
  $.ajax({
    type: 'GET',
    url: '/github/user/repos?sort=updated',
    success: function(data, message, xhr){
      bio.repos = data;
    }
  }).done(callback);
};

bio.requestUser = function(callback) {
  $.ajax({
    type: 'GET',
    url: '/github/users/patyau',
    success: function(data, message, xhr){
      // console.log(data);
      bio.user = data;
    }
  }).done(callback);
};
