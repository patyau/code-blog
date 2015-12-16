var bioController = {};

bioController.index = function() {
  bioView.requestRepos(bioView.index);
  bioView.requestUser(bioView.renderUserData);
  console.log('clicked /bio');
};
