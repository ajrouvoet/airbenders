angular.module('airbender', [
    'd3',
    'airbender.directives',
    'airbender.models',
    'ui.router',
    'ui.bootstrap'
  ])

  .config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise("/picker");
    //
    // Now set up the states
    $stateProvider
      .state('picker', {
        url: "/picker",
        templateUrl: "views/picker.html"
      });
  }])

  .run(['userResource', function(Users) {
    console.log('Airbender is up!');
  }]);

angular.element(document).ready(function() {
  angular.bootstrap(document, ['airbender']);
});
