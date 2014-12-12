function labelPosition(roomLayout) {
  var points = roomLayout.split(',');
  var pointsLength = points.length;

  var lx = parseInt(points[0]);
  var ly = parseInt(points[1]);
  var sx = parseInt(points[0]);
  var sy = parseInt(points[1]);

  for (var i = 2; i < pointsLength; i++) {
    if(i % 2) {
      if(points[i] > ly) {
        ly = parseInt(points[i]);
      }

      if(points[i] < sy) {
        sy = parseInt(points[i]);
      }

    } else {
      if(points[i] > lx) {
        lx = parseInt(points[i]);
      }

      if(points[i] < sx) {
        sx = parseInt(points[i]);
      }
    }
  }

  var x = ((lx - sx) / 2)+sx;
  var y = ((ly - sy) / 2)+sy;
  
  var label = {"x" : x, "y": y};

  return label;
}

angular.module('airbender.directives.visual', ['airbender.models'])
  .directive('floorplan', ['$window', 'd3Service', function($window, d3Service) {
    return {
      restrict: 'EA',
      scope: {
        floorplanData: '='
      },
      link: function($scope, $element, $attrs) {
        d3Service.d3().then(function(d3) {
          
          var height = window.screen.availHeight;
          var width = window.screen.availWidth / 2;

          var svg = d3.select($element[0]).append("svg")
                                         .attr("width", width)
                                         .attr("height", height);

          $scope.$watchCollection('floorplanData', function(newData) {
            console.log("I have rooms data!");
            console.log("newData: "+JSON.stringify(newData));

            if(newData) {
              console.log(JSON.stringify(newData.layout.rooms));
              var data = newData.layout.rooms;
              $scope.render(data);
            }
          });

          

          $scope.render = function(rooms) {
            svg.selectAll("*").remove();
            
            svg.selectAll("polygon")
               .data(rooms)
               .enter()
               .append("polygon")
                 .attr("points", function(d, i) { return d.layout.toString(); })
                 .style("border", "1px solid black");

            svg.selectAll("text")
               .data(rooms)
               .enter()
               .append("text")
                 .attr("class", "label")
                 .attr('x', function(d, i) { 
                   var result = labelPosition(d.layout.toString());
                   return result.x; 
                 })
                 .attr('y', function(d, i) { 
                   var result = labelPosition(d.layout.toString());
                   return result.y;  
                 })
                 .attr('fill', 'yellow')
                 .text(function(d, i) { return d.name; });
          }

          


          window.onresize = function() {
            $scope.$apply();
          };

        });
      }
    }
}]);
