'use strict';

// Register `busList` component, along with its associated controller and template
angular.module('busList')
  .component('busList',
  {
    templateUrl: 'bus-list/bus-list.template.html',
    controller: [
      'Bus', '$scope', '$uibModal',
      function (Bus, $scope, $uibModal) {
        var that = this;
        that.buses = Bus.query();
        that.bus = {};

        var modalOptions = {
          animation: true,
          backdrop: 'static',
          component: 'modalBus',
          resolve: {
            bus: function() {
              return that.bus;
            }
          }
        };

        that.addBus = function() {
          var modalInstance = $uibModal.open(modalOptions);

          modalInstance.result.then(function(bus) {
            that.bus = bus;
            Bus.add(bus,
              function onSuccess(createdBus) {
                that.buses.push(createdBus);
                that.bus = {};
              });
          });
        };

        that.editBus = function(bus) {
          that.bus = bus;
          var modalInstance = $uibModal.open(modalOptions);

          modalInstance.result.then(function(bus) {
            that.bus = bus;
            Bus.update({ id: bus.Id },
              bus,
              function(editedBus) {
                that.bus = {};
              });
          });
        };

        that.deleteBus = function(id) {
          Bus.delete({ id: id },
            function onSuccess(deletedBus) {
              var index = that.buses.map(function (e) { return e.Id }).indexOf(deletedBus.Id);
              if (index > -1) {
                that.buses.splice(index, 1);
              }
            });
        }
      }
    ]
  });