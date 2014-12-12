angular.module('airbender.controllers', ['airbender.models'])
  .controller('PickerCtrl', [
    '$scope',
    'availabilityResource',
    'buildingResource',
    function($scope, Availabs, Floorplans) {
    // hardcoded building for now
    $scope.building = 1;

    // init
    // current floor
    $scope.floor = 1;

    // load all availability data for this building
    $scope.availabsData = Availabs.get({
      building: $scope.building
    });

    // load the entire floorplan
    $scope.floorplanData = Floorplans.get({
      id: $scope.building
    });

    //
    // some utility functions
    //

    $scope.floorplan = function(floorNo) {
      return _.find($scope.floorplanData, function(f) { return f.floor == floorNo; });
    };
  }])

  .controller("DatePickCtrl", ["$scope", function($scope) {
     console.log("DatePickCtrl online");
     $scope.format = "mm/dd/yyyy";
     $scope.opened = false;
     $scope.dateOptions = {
        formatYear: 'yy',
        startingDay: 1
     };
     $scope.open = function($event) {
        $event.preventDefault();
        $event.stopPropagation();
        console.debug("opening datepicker");
        $scope.opened = true;
     };
  }]);
