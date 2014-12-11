angular.module('airbender.directives', ['airbender.controllers'])
  .directive('roomPicker', function() {
    return {
      templateUrl: '/views/roompicker.html',
      controller: function($scope) {
        console.log("RoomPickCtrl checking in");
      },
    };
  });

