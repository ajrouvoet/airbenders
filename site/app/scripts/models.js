/// <reference path="../_libs.ts" />

angular.module("airbender.models", ["ngResource"])

  // users
  .factory("userResource", ["$resource", function ($resource) {
    return $resource(
      'api/1.0/users/:id/',
      {
        id: "@id"
      }
    );
  }])

  // reservations
  .factory("reservsResource", ["$resource", function ($resource) {
    return $resource(
      'api/1.0/reservs/:id/',
      {
        id: "@id"
      }
    );
  }]);
