function drawSlots(svg, width, height) {
  // create the time slots
  var hours = _.range(0, 24);
  var slots = svg.selectAll(".timeslot")
    .data(hours)
    .enter()
    .append("rect")
      .attr("class", "timeslot")
      .attr("width", width)
      .attr("height", height)
      .attr("x", function(d, i) { return d * width;})
      .attr("y", function(d, i) { return 0;});

  var labels = svg.selectAll(".label")
    .data(hours)
    .enter()
    .append("text")
      .attr("class", "label")
      .attr("text-anchor", "middle")
      .attr('x', function(d, i) { return (d + 0.5) * width; })
      .attr('y', function(d, i) { return height / 4; })
      .text(function(d, i) { return "" + d + ":00"; });

  return [slots, labels];
}

function drawAvailability(svg, slotWidth, slotHeight, day, availability) {
  console.log('day', day.startOf('day'));
  function toX(d) {
    var x = d * (slotWidth * 24) / (24 * 60 * 60 * 1000);
    console.log(d, x);
    if(x < 0)
      return 0;
    else
      return x;
  }
  function findX(occ) {
    console.log("x of " + occ.id);
    var d = moment(occ.when_from).diff(day.startOf('day'));
    return toX(d);
  }
  function findWidth(occ) {
    var d = moment(occ.when_to).diff(moment(occ.when_from));
    return toX(d);
  }
  return svg.selectAll('.occupied')
    .data(availability)
    .enter()
    .append('rect')
      .attr('class', 'occupied')
      .attr('width', function(d) { return findWidth(d); })
      .attr('height', 40)
      .attr('x', function(d, i) { return findX(d); })
      .attr('y', slotHeight / 2);
}

angular.module('airbender.directives.availability', ['airbender.models'])
  .directive('availability', function() {
    return {
      templateUrl: "/views/availability.html",
      scope: {
        availabilityData: '=',
        floorplanData: '=',
        day: '='
      },
      controller: ['$scope', function($scope) {
        $scope.rooms = [];
        $scope.$watchCollection('floorplanData', function(f) {
          if(f) $scope.rooms = f.layout.rooms;
        });

        // function to get availability for a specific room
        $scope.roomAvailability = function(room) {
          return $scope.availabilityData[room.id] || [];
        };
      }]
    }
  })

  .directive('roomAvailability', function() {
    return {
      scope: {
        room: "=",
        availabilityData: "=",
        day: '='
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

        function updateAvailability(a) {
          drawAvailability(svg, slotWidth, 80, $scope.day, a);
        }
        $scope.$watchCollection('availabilityData', updateAvailability);
      },

      template: "<h3 class='room-name'>{{ room.name }}</h3><div class='availability-canvas'>"
    };
  });
