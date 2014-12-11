angular.module('airbender.directives', [])
  .directive('roomPicker', function() {
    return {
      templateUrl: '/views/roompicker.html',
      controller: function($scope) {
        console.log("RoomPickCtrl checking in");
      },
    };
  });

