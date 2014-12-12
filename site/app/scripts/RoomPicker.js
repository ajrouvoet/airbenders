angular.module('airbender.directives', ['airbender.models'])
  .directive('roomPicker', ['roomResource', function(Rooms) {
    return {
      templateUrl: '/views/roompicker.html',
      controller: ['$scope', function($scope) {
        console.log("RoomPickCtrl checking in");

        var rooms = $scope.rooms = Rooms.query(function() {
        });
      }]
    };
  }]);

