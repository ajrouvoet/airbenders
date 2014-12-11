angular.module('airbender', ['airbender.models'])
  .run(function() {
    console.log('Airbender is up!');
  });

angular.element(document).ready(function() {
  angular.bootstrap(document, ['airbender']);
});
