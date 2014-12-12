angular.module('airbender.directives.availability', ['airbender.models'])
  .directive('availability', function() {
    return {
      templateUrl: "/views/availability.html",
      controller: function() {
        console.log("Availability directive loaded...");
      }
    }
  });
