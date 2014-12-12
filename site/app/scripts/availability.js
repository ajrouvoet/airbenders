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

angular.module('airbender.directives.availability', ['airbender.models'])
  .directive('availability', function() {
    return {
      templateUrl: "/views/availability.html",
      scope: {
        availabilityData: '=',
        floorplanData: '='
      },
      link: function($scope, $elem) {
        console.log("Availability directive loaded...");
        console.log($scope.floorplanData);
        console.log($scope.availabilityData);

        // create the svg canvas
        var slotWidth = 60;
        var width = 24*slotWidth;
        console.log(d3.select($elem.find('.availability-canvas')[0]));
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

        // draw the line RIGHT HERE
        // draw the availability

      },
      controller: function() {
      }
    }
  });
