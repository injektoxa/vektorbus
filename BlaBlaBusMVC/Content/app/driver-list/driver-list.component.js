'use strict';

angular.module('driverList')
  .component('driverList',
  {
    templateUrl: 'driver-list/driver-list.template.html',
    bindings: {
      resolve: '<',
      close: '&',
      dismiss: '&'
    },
    controller: [
      'Driver', '$scope', '$uibModal', function (Driver, $scope, $uibModal) {
        var that = this;
        that.drivers = [];
        that.addDriverBlockVisible = false;
        that.addNewClass = "";

        that.$onInit = function () {
          that.drivers = that.resolve.drivers;
        };

        that.closeModal = function() {
          that.close({ $value: that.drivers });
        };

        that.editDriver = function (driver) {
          $scope.$broadcast('editDriverEvent', { driver: driver });
        };

        that.showAddDriverBlock = function() {
          that.addDriverBlockVisible = !that.addDriverBlockVisible;
          that.addNewClass = that.addDriverBlockVisible ? "not-active" : "";
        };

        that.deleteDriver = function(id) {
          $scope.$broadcast('deleteDriverEvent', { id: id });
        };
      }
    ]
  });