var bioController = {};

bioController.index = function() {
  bioView.requestRepos(bioView.index);
  console.log('clicked /bio');
};
