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
          var data = [{"x": 20, "y": 0, "label": "text1"}, 
                      {"x": 30, "y": 70, "label": "text2"},
                      {"x": 70, "y": 140, "label": "text3"}];

          scope.render = function() {
            svg.selectAll("*").remove();
            
            svg.selectAll("rect")
               .data(data)
               .enter()
               .append("rect")
                 .attr("width", 60)
                 .attr("height", 60)
                 .attr("x", function(d, i) { return d.x; }) 
                 .attr("y", function(d, i) { return d.y; }) 
                 .style("border", "1px solid black");

            svg.selectAll("text")
               .data(data)
               .enter()
               .append("text")
                 .attr("class", "label")
                 .attr('x', function(d, i) { return d.x + 12.5; })
                 .attr('y', function(d, i) { return d.y + 30; })
                 .attr('fill', 'yellow')
                 .text(function(d, i) { return d.label; });

          }

          scope.render();


          window.onresize = function() {
            scope.$apply();
          };

        });
      }
    }
}]);
