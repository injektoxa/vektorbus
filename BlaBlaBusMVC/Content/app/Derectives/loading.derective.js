angular.module('VektorApp')
	.directive('loading', ['$http', '$timeout', function ($http, $timeout) {
	return {
		restrict: 'A',
		link: function (scope, elm, attrs) {
			scope.isLoading = function () {
				return $http.pendingRequests.length > 0;
			};

			scope.$watch(scope.isLoading, function (newValue) {
				if (newValue) {
				    elm.show();
				} else {
					elm.hide();
				}
			});
		}
	};

}]);