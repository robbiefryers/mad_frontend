var module = angular.module('maryhillControllers');

module.controller('superEditCtrl',function($scope, $state, AuthService, allInfo, restService, timePicker, $ionicPopup){

	//set sharedInfo to data passed by modify view
	$scope.sharedInfo = allInfo.edit;

	$scope.role = AuthService.role();
	if($scope.sharedInfo.owner===null){
		$scope.owner = {username:null};
	}
	else {
		
		$scope.owner = {username:$scope.sharedInfo.owner.username};
	}


	//Call the API to get a list of all the categories
	restService.getCat().then(function successCallback(result) {  
		$scope.cats= result;
	}, function errorCallback(response) {
		//blank
	});

	//Initialise days array using the JSON array in timePicker service
	$scope.days = timePicker.blank();

	//Set up the days array to match days and times that the activity is already on
	$scope.initialiseDay = function(day, index){
		//get start and finish time hour values and convert them to ints
		$scope.days[day].startHour = parseInt($scope.sharedInfo.days[index].startTime.substring(0, 2));
		$scope.days[day].endHour = parseInt($scope.sharedInfo.days[index].endTime.substring(0, 2));
		$scope.days[day].checked = true;

		//get start and finish time minute values and convert them to ints
		$scope.days[day].startMin = parseInt($scope.sharedInfo.days[index].startTime.substring(3, 5));
		$scope.days[day].endMin = parseInt($scope.sharedInfo.days[index].endTime.substring(3, 5));
	};

	//loop through all the days the activty is on and call the helper method to set up the correct days
	for(i=0; i<$scope.sharedInfo.days.length; i++) {

		switch ($scope.sharedInfo.days[i].day){
			case "Monday":
				$scope.initialiseDay(0, i);
				break;

			case "Tuesday":
				$scope.initialiseDay(1, i);
				break;

			case "Wednesday":
				$scope.initialiseDay(2, i);
				break;

			case "Thursday":
				$scope.initialiseDay(3, i);
				break;

			case "Friday":
				$scope.initialiseDay(4, i);
				break;

			case "Saturday":
				$scope.initialiseDay(5, i);
				break;

			case "Sunday":
				$scope.initialiseDay(6, i);
				break;
		}
	}

	//Initialse JSON Object that will be sent as the put request, the days and categories is a challenge
	//Probably a more elegant way to set them up
	$scope.jsonInfo = {
		name: $scope.sharedInfo.name,
		venue: $scope.sharedInfo.venue,
		postcode: $scope.sharedInfo.postcode,
		agesLower: $scope.sharedInfo.agesLower,
		agesUpper: $scope.sharedInfo.agesUpper,
		contactName: $scope.sharedInfo.contactName,
		contactEmail: $scope.sharedInfo.contactEmail,
		number: $scope.sharedInfo.number,
		special: $scope.sharedInfo.special,
		owner: null,
		days: $scope.days,
		cats: $scope.sharedInfo.cats
	};

	//Represents the 3 option inputs for categories 1,2,3 initialise to null
	$scope.select = {
		option: [null, null, null]
	}

	//got through the categories for the event and if defined set the option element to the category name
	for(i=0; i<3; i++){
		if(angular.isDefined($scope.jsonInfo.cats[i])){
			$scope.select.option[i] = $scope.jsonInfo.cats[i].catName.name;
		}
	}

	//All these methods are taken care of by the timePicker service
	//Used for matching checkboxes with days present and times
	$scope.nullTime = function(item){
		timePicker.nullTime(item);
	};

	$scope.increaseStartTime = function(item){
		timePicker.increaseStart(item);
	};

	$scope.decreaseStartTime = function(item){
		timePicker.decreaseStart(item);
	};

	$scope.increaseEndTime = function(item){
		timePicker.increaseEnd(item);
	};

	$scope.decreaseEndTime = function(item){
		timePicker.decreaseEnd(item);
	};

	$scope.delete = function() {
		restService.delAct($scope.sharedInfo.id).then(function(msg) {
			var alertPopup = $ionicPopup.alert({
      	title: 'Activity Removed',
        template: 'The activity was successfully removed from the database'
      });
     	alertPopup.then(function(res) {
				$scope.checkRole();    
    	});
		}, function(msg){
			//unreachable code as event will always be found before delete
		});

	}
	
	//function that takes care of getting the users selections into the correct JSON format
	//The data is sent via the PUT method in the restService
	//most of the logic is concerned with the days and category arrays
	$scope.update = function() {
		$scope.disableButton=true;
		$scope.daysJSON =[];
		for(i=0; i<$scope.days.length; i++){
			if($scope.days[i].startHour!=null){
				var temp = new Object();
				temp.day = $scope.days[i].day;
				temp.startTime = $scope.days[i].startHour + ":" + $scope.days[i].startMin;
				temp.endTime = $scope.days[i].endHour + ":" + $scope.days[i].endMin;
				$scope.daysJSON.push(temp);
			}
		}
		$scope.jsonInfo.days = $scope.daysJSON;
		$scope.jsonInfo.cats = [];
		for(i=0; i<3; i++){
			if($scope.select.option[i]!=null){
				var catObj = new Object();
				var catObjName = new Object();
				catObjName.name = $scope.select.option[i];
				catObj.catName = catObjName;
				$scope.jsonInfo.cats.push(catObj);
			}
		}
    if(AuthService.role()==='admin_role'){
      var ownObj = new Object();
      ownObj.username = AuthService.uName();
      $scope.jsonInfo.owner = ownObj;
    }

    else {
      if ($scope.owner.username!=null){
        var ownObj = new Object();
        ownObj.username = $scope.owner.username;
        $scope.jsonInfo.owner = ownObj;      
      }
    }

		//once data is ready convert all to proper json format ready for http request
		$scope.eventJSON = angular.toJson($scope.jsonInfo);
		restService.putAct($scope.eventJSON, $scope.sharedInfo.id).then(function(msg) {

	    var alertPopup = $ionicPopup.alert({
	     	title: "Event Updated",
	      template: "Changes successfully made!",
	      okType: "button-positive"
	    });
    
	    alertPopup.then(function(res) {
	    	$scope.checkRole();
	    });

		}, function(msg){
			$scope.disableButton=false;
	    var alertPopup = $ionicPopup.alert({
	     	title: "Event Update Failed",
	      template: "The name, venue and ages fields must not be empty!",
	      okType: "button-positive"
	    });
	    alertPopup.then(function(res) {
				$scope.checkRole();    
    	});
		});
	}
	
	$scope.checkRole = function() {
		if(AuthService.role()==='admin_role'){
			$state.go('app.admin.modify');
		}
		else {
			$state.go('app.super.modify');
		}
	}


})