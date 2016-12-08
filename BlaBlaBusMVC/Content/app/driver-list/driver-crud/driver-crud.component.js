'use strict';

angular.module('driverCrud')
  .component('driverCrud',
  {
    templateUrl: 'driver-list/driver-crud/driver-crud.template.html',
    controller: [
      'Driver', '$scope', function (Driver, $scope) {
        var that = this;

        that.driver = {};

        that.cancel = function() {
          $scope.$parent.$ctrl.showAddDriverBlock();
        };

        that.save = function (driver) {
          that.driver = driver;
          if (driver.Id > 0) {
            Driver.update({ id: driver.Id },
              driver,
              function (editedDriver) {
                $scope.$parent.$ctrl.showAddDriverBlock();
                that.driver = {};
              });
          } else {
            Driver.add(driver,
              function onSuccess(createdDriver) {
                $scope.$parent.$ctrl.drivers.push(createdDriver);
                $scope.$parent.$ctrl.showAddDriverBlock();
                that.driver = {};
              });
          }
        };

        that.deleteDriver = function(id) {
          Driver.delete({ id: id },
            function onSuccess(deletedDriver) {
              var index = $scope.$parent.$ctrl.drivers.map(function(e) { return e.Id }).indexOf(deletedDriver.Id);
              if (index > -1) {
                $scope.$parent.$ctrl.drivers.splice(index, 1);
              }
            }
          );
        };

        $scope.$on('deleteDriverEvent',
          function(event, params) {
            that.deleteDriver(params.id);
          }
        );

        $scope.$on('editDriverEvent',
          function (event, params) {
            that.driver = params.driver;
            $scope.$parent.$ctrl.showAddDriverBlock();
          }
        );
      }
    ]
  });