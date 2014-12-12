angular.module('airbender.directives.visual', [])
  .directive('floorplan', ['$window', 'd3Service', function($window, d3Service) {
    return {
      restrict: 'EA',
      scope: {},
      link: function(scope, element, attrs) {
        d3Service.d3().then(function(d3) {
          
          var height = window.screen.availHeight;
          var width = window.screen.availWidth / 2;

          var svg = d3.select(element[0]).append("svg")
                                         .attr("width", width)
                                         .attr("height", height);
        
          var data = [{"points": "10,0,10,100,110,100,110,0", "label": {"text": "text1", "x": 50, "y": 50}}, 
                      {"points": "10,110,10,210,110,210,110,110", "label": {"text": "text2", "x": 50, "y": 150}},
                      {"points": "120,110,120,210,220,210,220,110", "label": {"text": "text3", "x": 150, "y": 150}},
                      {"points": "120,0,120,100,220,100,220,0", "label": {"text": "text4", "x": 150, "y": 50}}];

          scope.render = function() {
            svg.selectAll("*").remove();
            
            svg.selectAll("polygon")
               .data(data)
               .enter()
               .append("polygon")
                 .attr("points", function(d, i) { return d.points; })
                 .style("border", "1px solid black");

            svg.selectAll("text")
               .data(data)
               .enter()
               .append("text")
                 .attr("class", "label")
                 .attr('x', function(d, i) { return d.label.x; })
                 .attr('y', function(d, i) { return d.label.y; })
                 .attr('fill', 'yellow')
                 .text(function(d, i) { return d.label.text; });
          }

          scope.render();


          window.onresize = function() {
            scope.$apply();
          };

        });
      }
    }
}]);
