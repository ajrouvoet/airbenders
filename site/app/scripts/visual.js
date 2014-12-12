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
        floorplanData: '=',
        onClick: '&'
      },
      template: "<div class='canvas'>",
      link: function($scope, $element, $attrs) {
        d3Service.d3().then(function(d3) {

          var height = 1000;
          var width = 1000;
          var canvas = $element.find('.canvas');

          var svg = d3.select(canvas[0]).append("svg")
                                         .attr("width", width)
                                         .attr("height", height);

          canvas.find('svg').draggable({
            drag: function(event, ui) {
              return true;
            }
          });

          // (re)draw mechanics
          $scope.drawings = [];
          $scope.$watchCollection('floorplanData', function(newData) {
            console.log("I have rooms data!");
            console.log("newData: "+JSON.stringify(newData));

            if(newData) {
              console.log(JSON.stringify(newData.layout.rooms));
              var data = newData.layout.rooms;

              for(var d in $scope.drawings) {
                $scope.drawings[d].remove()
              }
              $scope.drawings = $scope.render(data);
            } else {
              for(var d in $scope.drawings) {
                $scope.drawings[d].remove()
              }
            }
          });

          // redraw function
          $scope.render = function(rooms) {
            svg.selectAll("*").remove();

            var poly = svg.selectAll("polygon")
               .data(rooms)
               .enter()
               .append("polygon")
                 .attr("class", "roomLayout")
                 .attr("points", function(d, i) {
                    return d.layout.toString();
                  })
                 .on('click', function(d, i) {
                    console.log(i+" "+JSON.stringify(d));
                    return $scope.onClick({item: d});
                  });

            var labels = svg.selectAll("text")
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
                 .text(function(d, i) { return d.name; });

             return [poly, labels];
          }




          window.onresize = function() {
            $scope.$apply();
          };

        });
      }
    }
}]);
