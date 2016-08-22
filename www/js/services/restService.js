var module = angular.module('maryhillServices')

module.service('restService', function($http, ApiEndpoint, $q){

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

	var putActivity = function(updatedInfo, pk) {
		return $q(function(resolve, reject) {
			$http({
				method: "PUT",
				url: ApiEndpoint.url + 'activities/' + pk + '/',
				data: updatedInfo,
				headers: {'Content-Type': 'application/json'}

			}).then(function successCallback(response) {

				resolve(response);
				 
			}, function errorCallback(response) {
				console.log("faile");
				reject(response);
			});
		});	
	}

	var newAdmin = function(userInfo) {
		return $q(function(resolve, reject) {
			$http({
				method: "POST",
				url: ApiEndpoint.url + 'new-admin/',
				data: userInfo,
				headers: {'Content-Type': 'application/json'}
			}).then(function successCallback(response){
				resolve(response);
			}, function errorCallback(response){
				reject(response);
			});
		});
	}

	return{
		getAct: getActivities,
		getCat: getCategories,
		putAct: putActivity,
		newAdmin: newAdmin
	};
})