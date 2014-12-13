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
    $scope.floors = [1, 2, 3, 4, 5];
    $scope.floor = 3;
    $scope.day = moment.utc();
    $scope.from_time = moment.utc()
      .minutes($scope.day.minutes() - ($scope.day.minutes() % 15) + 15).toDate();
    $scope.to_time = moment($scope.from_time).add(2, 'hours').toDate();

    // load all availability data for this building
    $scope.availabsData = [];
    function updateAvailabs() {
      return $scope.availabsData = Availabs.get({
        building: $scope.building,
        date: $scope.day.toISOString()
      });
    }
    updateAvailabs();

    // load the entire floorplan
    $scope.floorplanData = Floorplans.get({
      id: $scope.building
    });

    //
    // some utility values
    //

    function getFloorplan(floorplanData, floorNo) {
      return _.find(floorplanData.floors, function(f) { return f.floor === floorNo; });
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

    // update availabs on day change
    $scope.$watch("day", function() {
      updateAvailabs();
    });
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
