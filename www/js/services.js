angular.module('maryhillServices', [])

.service('AuthService', function($q, $http, ApiEndpoint){
	var LOCAL_TOKEN_KEY = 'yourTokenKey';
	var isAuthenticated = false;
	var authToken;

	function loadUserCredentials() {
		var token = window.localStorage.getItem(LOCAL_TOKEN_KEY);
		if (token) {
			useCredentials(token);
		}
	}


	function storeUserCredentials(token) {
		window.localStorage.setItem(LOCAL_TOKEN_KEY, token);
		useCredentials(token);
	}

	function useCredentials(token) {
		isAuthenticated = true;
		authToken = token;
		console.log("authenticated is true")

		//very important line, set token as header for future requests!
		//$http.defaults.headers.common.Authorization = authToken;
	}

	function destroyUserCredentials() {
		authToken = undefined;
		isAuthenticated = false;
		console.log("token destroyed");
		$http.defaults.headers.common.Authorization = undefined;
		window.localStorage.removeItem(LOCAL_TOKEN_KEY);
		console.log("header removed");
	}


	var register = function(user) {
		return $q(function(resolve, reject) {
			 $http({
      method: 'POST',
      url: ApiEndpoint.url + 'test/',
      data: user
    }).then(function(result){
				if(result.data.success){
					resolve(result.data.msg);
				}
				else {
					reject(result.data.msg);
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
          storeUserCredentials(result.data.token);
          resolve(result.data.msg);
        } else {
          reject(result.data.msg);
        }
      });
    });
  };


	var logout = function() {
		destroyUserCredentials();
	};

	loadUserCredentials();

	return {
		login: login,
		register: register,
		logout: logout,
		isAuthenticated: function() {return isAuthenticated;},
	};
})

.factory('AuthInterceptor', function($rootScope, $q, AUTH_EVENTS) {
	return {
		responseError: function(response) {
			$rootScope.$broadcast({
				401: AUTH_EVENTS.notAuthenticated,
			}[response.status], response);
			return $q.reject(response);
		}
	};
})

.config(function($httpProvider) {
	$httpProvider.interceptors.push('AuthInterceptor');
});
