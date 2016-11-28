'use strict';

// Register `modalBus` component, along with its associated controller and template
angular.
  module('modalBus').
  component('modalBus', {
    templateUrl: 'bus-list/modal/modalBus-template.html',
    bindings: {
      resolve: '<',
      close: '&',
      dismiss: '&'
    },
    controller: function () {
      var that = this;

      that.$onInit = function () {
        that.bus = that.resolve.bus;
        if (that.bus && that.bus.Id > 0) {
          that.headerTitle = 'Редактирование';
        } else {
          that.headerTitle = 'Создание';
        }
      };

      that.ok = function () {
          that.close({ $value: that.bus });
      };

      that.cancel = function () {
        that.dismiss({ $value: 'cancel' });
      };
    }
  });