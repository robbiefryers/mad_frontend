var module = angular.module('maryhillControllers');

module.controller('ActivityCtrl', function($scope, $timeout, $http, $filter, $state, $ionicModal,$ionicPopup, ApiEndpoint, allInfo, $ionicLoading) {

  $ionicLoading.show({
    content: 'Loading',
    animation: 'fade-in',
    showBackdrop: true,
    maxWidth: 200,
    showDelay: 0
  });


	$scope.modalDays = [
		{day: "Monday", checked: false},
		{day: "Tuesday", checked: false},
		{day: "Wednesday", checked: false},
		{day: "Thursday", checked: false},
		{day: "Friday", checked: false},
		{day: "Saturday", checked: false},
		{day: "Sunday", checked: false},
	];

	$scope.catData =[];
	$scope.agesUp = 65;
	$scope.agesLow = 0;
	$scope.startTime = 8;
	$scope.endTime = 24;


    $http({
      method: 'GET',
      url: ApiEndpoint.url + 'activities'
    }).then(function successCallback(response) {
      $scope.myData = response.data;
      console.log($scope.myData);
      $scope.filteredData = response.data;

      }, function errorCallback(response) {
      	$scope.showAlert();

      }).finally(function() {
		$ionicLoading.hide();
      });

    $http({
      method: 'GET',
      url: ApiEndpoint.url + 'categories'
    }).then(function successCallback(response) {
		for(i=0; i<response.data.length; i++) {
			$scope.catData[i] = {cat: response.data[i].name , checked: false};
		}
      }, function errorCallback(response) {
      	$scope.showAlert();

      });

    $scope.filters = function() {
    	$scope.closeModal(1);
    	$ionicLoading.show({content: 'Loading',animation: 'fade-in', showBackdrop: true, maxWidth: 200, showDelay: 0});

    	//allow 300 ms delay for modal css transition to complete
		$timeout(function () {
	   		var dayss = [];
	   		var catss = [];
	    	for(i=0; i<7; i++){
	    		if($scope.modalDays[i].checked==true){
	    			dayss.push($scope.modalDays[i].day);
	    		}
	    	}
	    	for(i=0; i<$scope.catData.length; i++){
	    		if($scope.catData[i].checked == true){
	    			catss.push($scope.catData[i].cat);
	    		}
	    	}
	    	$scope.myData = $filter('searchAll')($scope.filteredData, dayss, $scope.startTime, $scope.endTime, $scope.agesLow, $scope.agesUp, catss);
	    	$ionicLoading.hide();
		}, 300);
    }


	$scope.clearFilters = function() {
		$scope.agesUp =65;
		$scope.agesLow = 0;
		$scope.startTime = 8;
		$scope.endTime = 24;
		for(i=0; i<7; i++){
			$scope.modalDays[i].checked=false;
		}
		for(i=0; i<$scope.catData.length; i++){
			$scope.catData[i].checked=false;
		}
		$scope.myData = $scope.filteredData;	
	}

	$scope.increaseStartTime = function() {
		if($scope.startTime !=23) {
			if($scope.startTime+1 == $scope.endTime){
				$scope.endTime++;
			}
			$scope.startTime++;
		}
	};

	$scope.decreaseStartTime = function() {
		if($scope.startTime !=8) {
			$scope.startTime--;
		}
	};

	$scope.increaseEndTime = function() {
		if($scope.endTime !=24) {
			$scope.endTime++;
		}
	};

	$scope.decreaseEndTime = function() {
		if($scope.endTime !=9) {
			if($scope.endTime-1 == $scope.startTime){
				$scope.startTime--;
			}
			$scope.endTime--;
		}
	};


	$scope.increaseLowAge = function() {
		if($scope.agesLow !=60) {
			if($scope.agesLow+5 == $scope.agesUp){
				$scope.agesUp +=5;
			}
			$scope.agesLow +=5;
		}
	};

	$scope.decreaseLowAge = function() {
		if($scope.agesLow !=0) {
			$scope.agesLow -=5;
		}
	};
	$scope.increaseHighAge = function() {
		if($scope.agesUp != 65){
			$scope.agesUp += 5;
		}
	};

	$scope.decreaseHighAge = function() {

		if($scope.agesUp != 5){
			if($scope.agesUp-5 == $scope.agesLow){		
				$scope.agesLow -=5;
			}
			$scope.agesUp -= 5;
		}
	};	

  // Modal 1
    $ionicModal.fromTemplateUrl('templates/activities/filterMainModal.html', function(modal) {
      $scope.oModal1 = modal;
      }, {
        id: '1',
        scope: $scope,
        animation: 'scale-in',//'slide-left-right', 'slide-in-up', 'slide-right-left'
        focusFirstInput: true
      });

    // Modal 2
    $ionicModal.fromTemplateUrl('templates/activities/dayModal.html', function(modal) {
      $scope.oModal2 = modal;
      }, {
        id: '2',
        scope: $scope,
        animation: 'scale-in',//'slide-left-right', 'slide-in-up', 'slide-right-left'
        focusFirstInput: true
      });

    // Modal 3
    $ionicModal.fromTemplateUrl('templates/activities/categoryModal.html', function(modal) {
      $scope.oModal3 = modal;
      }, {
        id: '3',
        scope: $scope,
        animation: 'scale-in',//'slide-left-right', 'slide-in-up', 'slide-right-left'
        focusFirstInput: true
      });
  

    $scope.openModal = function(index) {
      if (index == 1) $scope.oModal1.show();
      else if (index ==2) $scope.oModal2.show();
      else $scope.oModal3.show();
    };

    $scope.closeModal = function(index) {
      if (index == 1) $scope.oModal1.hide();
      else if (index ==2) $scope.oModal2.hide();
      else $scope.oModal3.hide();
    };

  $scope.showAlert = function() {
    var alertPopup = $ionicPopup.alert({
     	title: "Network Error",
      template: "M.A.D. could not retrieve the activities for you. Please check your data connection and 'pull down' the page to refresh",
      okType: "button-positive"
    });
    
    alertPopup.then(function(res) {
    
    });
  }; 

    $scope.doRefresh = function() {
		$http({
			method: 'GET',
			url: ApiEndpoint.url + 'activities'
		}).then(function successCallback(response) {
			$scope.myData = response.data;
			$scope.filteredData = response.data;

		}, function errorCallback(response) {
			$scope.showAlert();
		});
    	$scope.$broadcast('scroll.refreshComplete');
  };


    $scope.movePage = function(n) {
      allInfo.details = n.data;
      $state.go('app.activityInfo');
    };


})