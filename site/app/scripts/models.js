/// <reference path="../_libs.ts" />

angular.module("airbender.models", ["ngResource", "airbender.config"])

  // users
  .factory("userResource", ["api", "$resource", function (api, $resource) {
    return $resource(
      api + '/users/:id/',
      {
        id: "@id"
      }
    );
  }])

  // reservations
  .factory("reservResource", ["api", "$resource", function (api, $resource) {
    return $resource(
      api + '/reservs/:id/',
      {
        id: "@id"
      }
    );
  }])

  // rooms
  .factory("roomResource", ["api", "$resource", function (api, $resource) {
    return $resource(
      api + '/rooms/:id/',
      {
        id: "@id"
      }
    );
  }])

  // rooms
  .factory("buildingResource", ["api", "$resource", function (api, $resource) {
    return $resource(
      api + '/buildingls/:id/',
      {
        id: "@id"
      }
    );
  }]);
