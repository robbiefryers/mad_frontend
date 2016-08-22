var module = angular.module('maryhillControllers');

module.controller('ActivityCtrl', function($scope, $timeout, allInfo, restService, $filter, $state, $ionicModal,$ionicPopup, $ionicLoading) {

	//Show a loading overlay while the controller fetches data from the API endpoint
  $ionicLoading.show({
    content: 'Loading',
    animation: 'fade-in',
    showBackdrop: true,
    maxWidth: 200,
    showDelay: 0
  });

  //first get the list of actiivites and assing them to the 2 scope variables
  //If the activity list was successfully retrieved, fetch the category list for the cat filter modal
  //otherwise show the network error pop up
  restService.getAct().then(function successCallback(result) {  
  	$scope.myData = result;
		$scope.filteredData = result;
		
			restService.getCat().then(function successCallback(result) { 
				$scope.catData =[];
				for(i=0; i<result.length; i++) {
					$scope.catData[i] = {cat: result[i].name , checked: false};
				}
			}, function errorCallback(response) {
				$scope.showAlert();
			});

  }, function errorCallback(response) {
		$scope.showAlert();
  }).finally(function() {
  	$ionicLoading.hide();
  });

  //set up an array that matches days with a boolean, model used for day filters
	$scope.modalDays = [
		{day: "Monday", checked: false},
		{day: "Tuesday", checked: false},
		{day: "Wednesday", checked: false},
		{day: "Thursday", checked: false},
		{day: "Friday", checked: false},
		{day: "Saturday", checked: false},
		{day: "Sunday", checked: false},
	];
	//initialise the other filter values
	$scope.agesUp = 65;
	$scope.agesLow = 0;
	$scope.startTime = 8;
	$scope.endTime = 24;

	//invoked by filterMainModals 'Ok' button, firstly close the modal and then display the loading overlay
	$scope.filters = function() {
		$scope.closeModal(1);
		$ionicLoading.show({content: 'Loading',animation: 'fade-in', showBackdrop: true, maxWidth: 200, showDelay: 0});

		//allow 300 ms delay for modal css transition to complete
		//set up the days and cats array that match the ones that are selected by the user ready to pass to filters
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
			/*Pass in a copy of all the data and filter selections and reassign myData(used by then ng-repeat in view)
			 to the result of the filtered data, hide the loading overlay on completion*/
			$scope.myData = $filter('searchAll')($scope.filteredData, dayss, $scope.startTime, $scope.endTime, $scope.agesLow, $scope.agesUp, catss);
			$ionicLoading.hide();
		}, 300);
	}

	//function to clear filters and display all the activities again
	$scope.clearFilters = function() {
		$ionicLoading.show({content: 'Loading',animation: 'fade-in', showBackdrop: true, maxWidth: 200, showDelay: 0});
		$timeout(function () {
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
			$ionicLoading.hide();	
		}, 300);
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
	},{
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
  
  //Function called by each modals open button, takes in index to open/close appropraite modal
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

	//Pop up alert which is called when the a bad http response is received
  $scope.showAlert = function() {
    var alertPopup = $ionicPopup.alert({
     	title: "Network Error",
      template: "M.A.D. could not retrieve the activities for you. Please check your data connection and 'pull down' the page to refresh",
      okType: "button-positive"
    });
    
    alertPopup.then(function(res) {
    
    });
  }; 

  //Pull to refresh fuction
	$scope.doRefresh = function() {
		restService.getAct().then(function successCallback(result) {  
			$scope.myData = result;
			$scope.filteredData = result;
		}, function errorCallback(response) {
			$scope.showAlert();
		});
		$scope.$broadcast('scroll.refreshComplete');
	};

	//Pass activity data to allInfo service so it can be accessed on the next page
	$scope.movePage = function(n) {
	  allInfo.details = n.data;
	  $state.go('app.activityInfo');
	};


})