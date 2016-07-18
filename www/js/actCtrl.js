var module = angular.module('maryhillControllers');

module.controller('ActivityCtrl', function($scope, $http, $state, $ionicModal,ApiEndpoint, allInfo) {

	$scope.modalDays = [
		{day: "Monday", checked: false},
		{day: "Tuesday", checked: false},
		{day: "Wednesday", checked: false},
		{day: "Thursday", checked: false},
		{day: "Friday", checked: false},
		{day: "Saturday", checked: false},
		{day: "Sunday", checked: false},
	];

	$scope.agesUp = 65;
	$scope.agesLow = 0;
	$scope.startTime = 8;
	$scope.endTime = 24;

	$scope.clearFilters = function() {
		$scope.agesUp =65;
		$scope.agesLow = 0;
		$scope.startTime = 8;
		$scope.endTime = 24;
		for(i=0; i<7; i++){
			$scope.modalDays[i].checked=false;
		}
		
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

	$scope.searchTimes = function(item) {
		for (i=0; i<item.days.length; i++){
			if($scope.startTime <= parseInt(item.days[i].startTime.substring(0, 2)) && 
				$scope.endTime >= parseInt(item.days[i].endTime.substring(0, 2))){
				return true;
			}

		}	
		return false;
	}

	$scope.searchAges = function(item) {
		//case when max age is above max filtering age
		if ($scope.agesUp == 65){
			if($scope.agesLow <= item.agesUpper && ($scope.agesUp+34) >= item.agesLower) {
				return true;
			}
		}
		else{
			if($scope.agesLow <= item.agesUpper && $scope.agesUp >= item.agesLower){
				return true
			}
		}
		return false;
	}

    $scope.searchDays = function(item) {
    	//go through monday to friday check boxes
    	var count=0;
    	for (i=0; i<$scope.modalDays.length; i++) {
    		//if a check box is checked, loop through items days to see if 
    		//they match the check box day
    		if($scope.modalDays[i].checked == true) {
    			count ++;
    			for (j=0; j<item.days.length; j++){
    				if ((item.days[j].day.indexOf($scope.modalDays[i].day)) !=-1){
    					return true; 
    				}
    			}
    		}
    	}
		//the count will be 0 if no checkboxes are checked in which case we want to
		//return all of the items
   		if (count == 0 ){
   			return true;
   		}
    	return false;
    };




  // Modal 1
    $ionicModal.fromTemplateUrl('templates/filterMainModal.html', function(modal) {
      $scope.oModal1 = modal;
      }, {
        id: '1',
        scope: $scope,
        animation: 'scale-in',//'slide-left-right', 'slide-in-up', 'slide-right-left'
        focusFirstInput: true
      });

    // Modal 2
    $ionicModal.fromTemplateUrl('templates/dayModal.html', function(modal) {
      $scope.oModal2 = modal;
      }, {
        id: '2',
        scope: $scope,
        animation: 'scale-in',//'slide-left-right', 'slide-in-up', 'slide-right-left'
        focusFirstInput: true
      });

  

    $scope.openModal = function(index) {
      if (index == 1) $scope.oModal1.show();
      else $scope.oModal2.show();
    };

    $scope.closeModal = function(index) {
      if (index == 1) $scope.oModal1.hide();
      else $scope.oModal2.hide();
    };




    $http({
      method: 'GET',
      url: ApiEndpoint.url + 'activities'
    }).then(function successCallback(response) {
      $scope.myData = response.data;
      console.log($scope.myData);
      }, function errorCallback(response) {

      });


    $scope.movePage = function(n) {
      allInfo.details = n.data;
      $state.go('app.activityInfo');

    };


})