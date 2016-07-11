var module = angular.module('maryhillControllers');

module.controller('ActivityCtrl', function($scope, $http, $state, $ionicModal,ApiEndpoint, allInfo) {

  $scope.modalData = [
    {day: "Monday", checked: false},
    {day: "Tuesday", checked: false},
    {day: "Wednesday", checked: false},
    {day: "Thursday", checked: false},
    {day: "Friday", checked: false},
    {day: "Saturday", checked: false},
    {day: "Sunday", checked: false},

];

    $scope.print = function() {
     console.log($scope.daysBox);

     console.log($scope.myData.days);
    }

    $scope.searchDays = function(item) {
    	//go through monday to friday check boxes
    	var count=0;
    	for (i=0; i<$scope.modalData.length; i++) {
    		//if a check box is checked, loop through items days to see if 
    		//they match the check box day
    		if($scope.modalData[i].checked == true) {
    			count ++;
    			for (j=0; j<item.days.length; j++){
    				if ((item.days[j].day.indexOf($scope.modalData[i].day)) !=-1){
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
    }




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
      }, function errorCallback(response) {

      });


    $scope.movePage = function(n) {
      allInfo.details = n.data;
      $state.go('app.activityInfo');

    };


})