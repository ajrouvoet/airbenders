angular.module('airbender.controllers', ['airbender.models'])
  .controller('PickerCtrl', [
    '$scope',
    '$timeout',
    'availabilityResource',
    'buildingResource',
    function($scope, $timeout, Availabs, Floorplans) {
    // hardcoded building for now
    $scope.building = 1;

    // init
    // current floor
    $scope.floor = 3;
    $scope.day = moment();

    // load all availability data for this building
    $scope.availabsData = Availabs.get({
      building: $scope.building
    });

    // load the entire floorplan
    $scope.floorplanData = Floorplans.get({
      id: $scope.building
    });

    //
    // some utility values
    //

    function getFloorplan(floorplanData, floorNo) {
      return _.find(floorplanData.floors, function(f) { return f.floor == floorNo; });
    }

    $scope.floorplan = null;
    function updateFloorplan() {
      $scope.floorplan = getFloorplan($scope.floorplanData, $scope.floor);
    }
    $scope.$watchCollection('floorplanData', updateFloorplan);
    $scope.$watch('floor', updateFloorplan);

    // change day functions
    $scope.nextDay = function() { $scope.day = $scope.day.add(1, 'day').clone(); }
    $scope.prevDay = function() { $scope.day = $scope.day.subtract(1, 'day').clone(); }
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
