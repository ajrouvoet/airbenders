angular.module('airbender.directives', [])
  .directive('floorplan', ['$window', 'd3Service', function($window, d3Service) {
    return {
      restrict: 'EA',
      scope: {},
      link: function(scope, element, attrs) {
        d3Service.d3().then(function(d3) {
           
          var svgContainer = d3.select(element[0]).append("svg")
                                    .attr("width", 200)
                                    .attr("height", 200)
                                    .style("border", "1px solid black");

          window.onresize = function() {
            scope.$apply();
          };

        });
      }
    }
}]);
