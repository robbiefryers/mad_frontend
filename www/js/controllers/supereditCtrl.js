var module = angular.module('maryhillControllers');

module.controller('superEditCtrl',function($scope, $state, allInfo, restService, timePicker){
	$scope.sharedInfo = allInfo.edit;

	  restService.getCat().then(function successCallback(result) {  
	       $scope.cats= result;

	    }, function errorCallback(response) {
	    	//blank
	    });


		$scope.days =  [
      	{
      		"day": "Monday",
      		"startHour": null,
      		"endHour": null,
      		"startMin": null,
      		"endMin": null,
      		"checked": false,
      		"quarter": 0
      	},
      	{
      		"day": "Tuesday",
      		"startHour": null,
      		"endHour": null,
      		"startMin": null,
      		"endMin": null,
      		"checked": false,
      		"quarter": 0
      	},
      	{
      		"day": "Wednesday",
      		"startHour": null,
      		"endHour": null,
      		"startMin": null,
      		"endMin": null,
      		"checked": false,
      		"quarter": 0
      	},
      	{
      		"day": "Thursday",
      		"startHour": null,
      		"endHour": null,
      		"startMin": null,
      		"endMin": null,
      		"checked": false,
      		"quarter": 0
      	},
      	{
      		"day": "Friday",
      		"startHour": null,
      		"endHour": null,
      		"startMin": null,
      		"endMin": null,
      		"checked": false,
      		"quarter": 0
      	},
      	{
      		"day": "Saturday",
      		"startHour": null,
      		"endHour": null,
      		"startMin": null,
      		"endMin": null,
      		"checked": false,
      		"quarter": 0
      	},
      	{
      		"day": "Sunday",
      		"startHour": null,
      		"endHour": null,
      		"startMin": null,
      		"endMin": null,
      		"checked": false,
      		"quarter": 0
      	}
      ];

    $scope.initialiseDay = function(day, index){
    	//get start and finish time hour values and convert them to ints
		$scope.days[day].startHour = parseInt($scope.sharedInfo.days[index].startTime.substring(0, 2));
		$scope.days[day].endHour = parseInt($scope.sharedInfo.days[index].endTime.substring(0, 2));
		$scope.days[day].checked = true;

		//get start and finish time minute values and convert them to ints
		$scope.days[day].startMin = parseInt($scope.sharedInfo.days[index].startTime.substring(3, 5));
		$scope.days[day].endMin = parseInt($scope.sharedInfo.days[index].endTime.substring(3, 5));
	};


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

	//set up JSON Object
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
      days: $scope.days,
      cats: $scope.sharedInfo.cats
    };

 	$scope.select = {
 		option: [null, null, null]
 	}

    for(i=0; i<3; i++){
    	if(angular.isDefined($scope.jsonInfo.cats[i])){
			$scope.select.option[i] = $scope.jsonInfo.cats[i].catName.name;
    	}
    }

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



	$scope.update = function() {
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
	}


})