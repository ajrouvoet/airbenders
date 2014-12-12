angular.module('airbender.directives', [])
  .directive('floorplan', ['$window', 'd3Service', function($window, d3Service) {
    return {
      restrict: 'EA',
      scope: {},
      link: function(scope, element, attrs) {
        d3Service.d3().then(function(d3) {
           
          var svg = d3.select(element[0]).append("svg")
                                         .attr("width", 800)
                                         .attr("height", 600);
          var data = [1, 2, 3];

          scope.render = function() {
            svg.selectAll("*").remove();
            
            svg.selectAll("rect")
               .data(data)
               .enter()
               .append("rect")
               .attr("width", 50)
               .attr("height", 60)
               .attr("x", 10) 
               .attr("y", function(d, i){
                  return i * 65;
                }) 
               .style("border", "1px solid black");

          }

          scope.render();


          window.onresize = function() {
            scope.$apply();
          };

        });
      }
    }
}]);
