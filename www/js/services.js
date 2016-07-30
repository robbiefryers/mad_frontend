angular.module('maryhillServices', [])

.service('AuthService', function($q, $http, ApiEndpoint, USER_ROLES){
	var LOCAL_TOKEN_KEY = 'yourTokenKey';
	var isAuthenticated = false;
	var role;
	var authToken;

	function loadUserCredentials() {
		var token = window.localStorage.getItem(LOCAL_TOKEN_KEY);
		if (token) {
			useCredentials(token);
		}
	}

	function storeUserCredentials(token, userG) {
		window.localStorage.setItem(LOCAL_TOKEN_KEY, token);
		useCredentials(token, userG);
	}

	function useCredentials(token, userG) {
		isAuthenticated = true;
		authToken = token;
		if(userG =='SuperAdmin'){
			role = USER_ROLES.super;
		}
		if(userG =='Admin'){
			role = USER_ROLES.admin;
		}
				if(userG =='User'){
			role = USER_ROLES.public;
		}

		//very important line, set token as header for future requests!
		//$http.defaults.headers.common.Authorization = authToken;
	}

	function destroyUserCredentials() {
		authToken = undefined;
		isAuthenticated = false;
		$http.defaults.headers.common.Authorization = undefined;
		window.localStorage.removeItem(LOCAL_TOKEN_KEY);
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

			}).then(function(result) {

				if (result.data.success) {
					storeUserCredentials(result.data.token, result.data.userGroup);
					resolve(role);
					console.log("success");
				} else {
					console.log("failed");
					reject('log in failed');
				}
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
		isAuthorized: isAuthorized,
		isAuthenticated: function() {return  isAuthenticated;},
		role: function() {return role;}
	};
})

.factory('AuthInterceptor', function ($rootScope, $q, AUTH_EVENTS) {
  return {
    responseError: function (response) {
      $rootScope.$broadcast({
        401: AUTH_EVENTS.notAuthenticated,
        403: AUTH_EVENTS.notAuthorized
      }[response.status], response);
      return $q.reject(response);
    }
  };
})

.config(function ($httpProvider) {
  $httpProvider.interceptors.push('AuthInterceptor');
});

