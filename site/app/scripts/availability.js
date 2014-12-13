function drawSlots(svg, width, height) {
  // create the time slots
  var hours = _.range(0, 24);
  var slots = svg.selectAll(".timeslot")
    .data(hours)
    .enter()
    .append("rect")
      .attr("class", "time_slot")
      .attr("width", width)
      .attr("height", height)
      .attr("x", function(d, i) { return d * width;})
      .attr("y", function(d, i) { return 0;});

  var labels = svg.selectAll(".label")
    .data(hours)
    .enter()
    .append("text")
      .attr("class", "time_label")
      .attr("text-anchor", "middle")
      .attr('x', function(d, i) { return (d + 0.5) * width; })
      .attr('y', function(d, i) { return height / 4; })
      .text(function(d, i) { return "" + d + ":00"; });

  return [slots, labels];
}

/* Draw the interval on the svg node with given slotwidth (an hour) and height.
 *
 * intervals :: [(moment, moment)]
 * today :: moment
 * classes :: string
 */
function drawIntervals(svg, slotWidth, slotHeight, today, intervals, _class) {
  function toX(d) {
    var x = d * (slotWidth * 24) / (24 * 60 * 60 * 1000);
    if(x < 0)
      return 0;
    else
      return x;
  }
  function findX(dtime) {
    var d = dtime.diff(today.startOf('day'));
    return toX(d);
  }
  return svg
    .selectAll('.' + _class)
    .data(intervals)
    .enter()
    .append('rect')
      .attr('class', _class + " interval")
      .attr('width', function(d) { return findX(d[1]) - findX(d[0]); })
      .attr('height', 40)
      .attr('x', function(d, i) { return findX(d[0]); })
      .attr('y', slotHeight / 2);
}

angular.module('airbender.directives.availability', ['airbender.models'])
  .directive('availability', ['$timeout', function($timeout) {
    return {
      templateUrl: "/views/availability.html",
      scope: {
        availabilityData: '=',
        floorplanData: '=',
        day: '=',
        fromTime: '=',
        toTime: '='
      },
      controller: ['$scope', function($scope) {
        $scope.rooms = [];
        $scope.$watchCollection('floorplanData', function(f) {
          if(f) {
            $scope.rooms = f.layout.rooms;
          } else {
            $scope.rooms = [];
          }
        });
      }]
    }
  }])

  .directive('roomAvailability', ['$timeout', function($timeout) {
    return {
      scope: {
        room: "=",
        availabilityData: "=",
        day: '=',
        fromTime: '=',
        toTime: '='
      },

      link: function($scope, $elem) {
        // create the svg canvas
        var slotWidth = 60;
        var width = 24*slotWidth;
        var svg = d3.select($elem.find('.availability-canvas').get(0)).append('svg');
        svg .attr("width", width)
            .attr("height", 80);

        // make it draggable
        $elem.find('svg').draggable({axis: 'x', drag: function(event, ui) {
          if(ui.position.left > 0 || ui.position.left < -width+$elem.width()) {
            return false;
          }
        }});

        // draw the time slots
        drawSlots(svg, slotWidth, 80);

        // draw the chosen time interval
        drawIntervals(svg,
          slotWidth,
          80,
          $scope.day.clone(),
          [[moment($scope.fromTime), moment($scope.toTime)]],
          'preferred_slot'
        );

        // stateful function that removes the drawn intervalls
        // and redraws them
        $scope.nodes = d3.select();
        function updateAvailability() {
          $scope.nodes.remove();
          $scope.nodes = drawIntervals(
            svg,
            slotWidth,
            80,
            $scope.day.clone(),
            _.map(_.clone($scope.availabilityData[$scope.room.id]) || [], function(d) {
              return [moment(d.when_from), moment(d.when_to)];
            }),
            "occupied_slot"
          );
        }

        // update on day or data change
        $scope.$watchCollection('availabilityData', updateAvailability);
        $scope.$watch('day', updateAvailability);
      },

      template: "<h3 class='room-name'>{{ room.name }}</h3><div class='availability-canvas'>"
    };
  }])

  .directive('floorPicker', function() {
    return {
      templateUrl: "/views/floorpicker.html",
      scope: {
        floors: '=',
        floor: '='
      },
      link: function($scope) {
        $scope.selectFloor = function(f) {
          $scope.floor = f;
        };
      }
    };
  });
