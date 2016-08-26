var module = angular.module('maryhillServices')

module.service('AuthService', function($q, $http, ApiEndpoint, USER_ROLES){
	var LOCAL_TOKEN_KEY = 'yourTokenKey';
	var USERNAME = '';
	var isAuthenticated = false;
	var role;
	var authToken;

	function loadUserCredentials() {
		var token = window.localStorage.getItem(LOCAL_TOKEN_KEY);
		if (token) {
			useCredentials(token);
		}
	}

	function storeUserCredentials(token, userG, username) {
		window.localStorage.setItem(LOCAL_TOKEN_KEY, token);
		window.localStorage.setItem(USERNAME, username);
		USERNAME = username;
		useCredentials(token, userG);
	}

	function useCredentials(token, userG) {
		isAuthenticated = true;
		authToken = token;
		if(userG =='SuperAdmin'){
			role = USER_ROLES.super;
		}
		if(userG =='ActivityAdministrators'){
			role = USER_ROLES.admin;
		}
				if(userG =='User'){
			role = USER_ROLES.public;
		}

		//very important line, set token as header for future requests!
		$http.defaults.headers.common.Authorization = "Token " + authToken;
		
		
		
	}

	function destroyUserCredentials() {
		authToken = undefined;
		isAuthenticated = false;
		$http.defaults.headers.common.Authorization = undefined;
		window.localStorage.removeItem(LOCAL_TOKEN_KEY);
		role ='';
		//console.log(isAuthenticated);
	}


	var register = function(user) {
		return $q(function(resolve, reject) {
			$http({
			      method: 'POST',
			      url: ApiEndpoint.url + 'test/',
			      data: user

    		}).then(function(result){

				if(result.data.success){
					resolve('sign up success');
				}
				else {
					reject('sign up failed');
				}
			});
		});
	};

	var login = function(user) {
		return $q(function(resolve, reject) {
			$http({
				method: "POST",
				url: ApiEndpoint.url + 'login/',
				data: user,
				headers: {'Content-Type': 'application/json'}

			}).then(function successCallback(response) {
				if (response.data.success) {
					console.log(response.data)
					storeUserCredentials(response.data.token, response.data.userGroup, response.data.username);
					resolve(response.data.firstTime);
				} 

			}, function errorCallback(response) {

				reject(role);
			});
		});
	};

	var updatePassword = function(newPass) {
		return $q(function(resolve, reject) {
			$http({
				method: "POST",
				url: ApiEndpoint.url + 'new-pass/',
				data: newPass,
				headers: {'Content-Type': 'application/json'}
			}).then(function successCallback(response) {
					resolve(response);
			}, function errorCallback(response) {
				reject(response);
			});
		});
	};

	var logout = function() {
		destroyUserCredentials();
	};

	var isAuthorized = function(authorizedRoles) {
		if (!angular.isArray(authorizedRoles)) {
			authorizedRoles = [authorizedRoles];
		}
		return (isAuthenticated && authorizedRoles.indexOf(role) !== -1);
	};

	loadUserCredentials();

	return {
		login: login,
		register: register,
		logout: logout,
		updatePass: updatePassword,
		isAuthorized: isAuthorized,
		uName: function() {return USERNAME;},
		isAuthenticated: function() {return  isAuthenticated;},
		role: function() {return role;}
	};
})

module.factory('AuthInterceptor', function ($rootScope, $q, AUTH_EVENTS) {
	return true;
})

module.config(function ($httpProvider) {
  $httpProvider.interceptors.push('AuthInterceptor');
});