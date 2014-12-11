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
  .factory("reservsResource", ["api", "$resource", function (api, $resource) {
    return $resource(
      api + '/reservs/:id/',
      {
        id: "@id"
      }
    );
  }]);
