var module = angular.module('maryhillServices')

module.service('restService', function($http, ApiEndpoint){

	var getActivities = function() {
		return $http({
  			method: 'GET',
  			url: ApiEndpoint.url + 'activities'
		}).then(function (result) {
  			return result.data;
  		});
	};

	var getCategories = function() {
		return $http({
  			method: 'GET',
  			url: ApiEndpoint.url + 'categories'
		}).then(function (result) {
  			return result.data;
  		});
	}

	return{
		getAct: getActivities,
		getCat: getCategories
	};
})