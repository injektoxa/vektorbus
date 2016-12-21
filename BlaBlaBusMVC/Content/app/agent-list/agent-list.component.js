'use strict';

// Register `agentList` component, along with its associated controller and template
angular.module('agentList')
  .component('agentList',
  {
    templateUrl: 'agent-list/agent-list.template.html',
    controller: [
      'Agent', '$scope', '$uibModal',
      function (Agent, $scope, $uibModal) {
        var that = this;
        that.agents = Agent.query();
        that.agent = {};

        var modalOptions = {
          animation: true,
          backdrop: 'static',
          component: 'modalAgent',
          resolve: {
            agent: function() {
              return that.agent;
            }
          }
        };

        that.addAgent = function() {
          var modalInstance = $uibModal.open(modalOptions);

          modalInstance.result.then(function(agent) {
            that.agent = agent;
            Agent.add(agent,
              function onSuccess(createdAgent) {
                that.agents.push(createdAgent);
                that.agent = {};
              });
          });
        };

        that.editAgent = function(agent) {
          that.agent = agent;
          var modalInstance = $uibModal.open(modalOptions);

          modalInstance.result.then(function(agent) {
            that.agent = agent;
            Agent.update({ id: agent.Id },
              agent,
              function(editedAgent) {
                that.agent = {};
              });
          });
        };

        that.deleteAgent = function(id) {
          Agent.delete({ id: id },
            function onSuccess(deletedAgent) {
              var index = that.agents.map(function (e) { return e.Id }).indexOf(deletedAgent.Id);
              if (index > -1) {
                that.agents.splice(index, 1);
              }
            });
        }
      }
    ]
  });