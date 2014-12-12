angular.module('airbender.directives.availability', ['airbender.models'])
  .directive('availability', function() {
    return {
      templateUrl: "/views/availability.html",
      link: function($scope, $elem) {
        console.log("Availability directive loaded...");

        // create the svg canvas
        console.log(d3.select($elem.find('.availability-canvas')[0]));
        var svg = d3.select($elem.find('.availability-canvas').get(0)).append('svg');
        svg .attr("width", 24*30)
            .attr("height", 80);

        // create the time slots
        var hours = _.range(0, 24);
        var slots = svg .selectAll(".timeslot")
          .data(hours)
          .enter()
          .append("rect")
          .attr("class", "timeslot")
          .attr("width", 30)
          .attr("height", 80)
          .attr("x", function(d, i) { return d * 30;})
          .attr("y", function(d, i) { return 0;});

      },
      controller: function() {
      }
    }
  });
