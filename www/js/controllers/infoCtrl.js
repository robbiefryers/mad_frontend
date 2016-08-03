var module = angular.module('maryhillControllers');

module.controller('infoCtrl', function($scope, $state, allInfo, $ionicPlatform, $cordovaAppAvailability){

	$scope.sharedInfo = allInfo.details;

	//function relies on cordova app availabilty plug in and cordova startApp plugin
	//first checks if the application exists (different for iOS and android)
	//then if it does exist it will open it with the matching address as the parsed uri
	$scope.openMaps = function() {
		
		document.addEventListener("deviceready", function () {
			var scheme;

			if(ionic.Platform.isAndroid()) {
			    scheme = 'com.google.android.apps.maps';
			}
			else if(ionic.Platform.isIOS()) {
			    scheme = 'comgooglemaps://';
			}

			$cordovaAppAvailability.check(scheme).then(function() {
				console.log("maps installed");
				var sApp = startApp.set({
					"action": "ACTION_VIEW",
					"package":"com.google.android.apps.maps",
					"uri": "http://maps.google.co.in/maps?q=" + $scope.sharedInfo.venue.split(' ').join('+')
				}).start()
			}, function () {
				console.log("maps not installed");
			});
		}, false);
	}


	$scope.makeCall = function() {

		document.addEventListener("deviceready", function () {			
			if(ionic.Platform.isAndroid()) {
				if(sharedInfo.number != null){
					console.log($scope.sharedInfo.number);
					startApp.set({
					"action": "ACTION_DIAL",
					"uri": "tel:" + sharedInfo.number
					}).start();
				}
			}
		}, false);
	}
	

})



//String map = "http://maps.google.co.in/maps?q=" + check;

//Intent i = new Intent(Intent.ACTION_VIEW, Uri.parse(map));
        //startActivity(i);