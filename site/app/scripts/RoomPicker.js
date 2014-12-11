angular.module('airbender.directives', ['airbender.controllers'])
  .directive('roomPicker', function() {
    return {
      controller: 'RoomPickCtrl',
      templateUrl: '/views/roompicker.html'
    };
  });

