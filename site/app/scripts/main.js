angular.module('airbender', [
    'airbender.models',
    'airbender.controllers',
    'airbender.directives'
  ])
  .run(['userResource', function(Users) {
    console.log('Airbender is up!');

    var users = Users.query(function() {
      _(users).each(function(u) {
        console.log(u);
      });
    });
  }]);

angular.element(document).ready(function() {
  angular.bootstrap(document, ['airbender']);
});
