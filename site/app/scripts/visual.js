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
          var data = [{"x": 20, "y": 0}, 
                      {"x": 30, "y": 70},
                      {"x": 70, "y": 140}];

          scope.render = function() {
            svg.selectAll("*").remove();
            
            svg.selectAll("rect")
               .data(data)
               .enter()
               .append("rect")
                 .attr("width", 50)
                 .attr("height", 60)
                 .attr("x", function(d, i) { return d.x; }) 
                 .attr("y", function(d, i) { return d.y; }) 
                 .style("border", "1px solid black")
               .append("text")
                  .attr("class", "label")
                  .text("Hello");

          }

          scope.render();


          window.onresize = function() {
            scope.$apply();
          };

        });
      }
    }
}]);
