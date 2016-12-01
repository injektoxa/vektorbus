'use strict';

// Register `modalAgent` component, along with its associated controller and template
angular.
  module('modalAgent').
  component('modalAgent', {
    templateUrl: 'agent-list/modal/modalAgent-template.html',

    bindings: {
      resolve: '<',
      close: '&',
      dismiss: '&'
    },

    controller: function () {
      var that = this;

      that.$onInit = function () {
        that.agent = that.resolve.agent;
        if (that.agent && that.agent.Id > 0) {
          that.headerTitle = 'Редактирование';
        } else {
          that.headerTitle = 'Создание';
        }
      };

      that.ok = function () {
          that.close({ $value: that.agent });
      };

      that.cancel = function () {
        that.dismiss({ $value: 'cancel' });
      };
    }
  });