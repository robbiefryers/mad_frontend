angular.module('maryhillServices', [])

.service('settingsService', function(){
	var preferedFontSize = 16;
	var tutorialOn = true;

	function getFontSize() {
		return window.localStorage.getItem(preferedFontSize);
	}

	function setFontSize(size) {
		console.log('size is ' + size);
		window.localStorage.setItem(preferedFontSize, size);
		angular.element(document.querySelectorAll('*')).css('font-size', size + 'px');
		console.log("adjuested");

	}

	setFontSize(window.localStorage.getItem(preferedFontSize));

	return {
		getFont: getFontSize,
		setFont: setFontSize,
		tutorial: tutorialOn,
	}


})

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
		if(userG =='ActivityAdministrators'){
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
					storeUserCredentials(response.data.token, response.data.userGroup);
					resolve(role);
				} 

			}, function errorCallback(response) {
				console.log("faile");
				reject(role);
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
	return true;
})

.config(function ($httpProvider) {
  $httpProvider.interceptors.push('AuthInterceptor');
});

