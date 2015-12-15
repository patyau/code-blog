var bioController = {};

bioController.index = function() {
  bio.requestRepos(bioView.index);
};
