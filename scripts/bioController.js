var bioController = {};

bioController.index = function() {
  $('#blog').hide();
  $('#about').show();
  console.log('called: /about');
};
