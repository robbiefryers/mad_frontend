var module = angular.module('maryhillControllers');

module.controller('newEventCtrl',function($scope, $state, timePicker, restService, $ionicPopup ){

  //Initialise days array using the JSON array in timePicker service
  $scope.blankDays = timePicker.blank();

  //Call the API to get a list of all the categories
  restService.getCat().then(function successCallback(result) {  
       $scope.cats= result;
    }, function errorCallback(response) {
      //blank
    });

  $scope.select = {
  option: [null, null, null]
  }

  //set up JSON Object
  $scope.jsonData= {
    name: null,
    venue: null,
    postcode: null,
    agesLower: null,
    agesUpper: null,
    contactName: null,
    contactEmail: null,
    number: null,
    special: null,
    admin: null,
    days: [],
    cats: []
  };


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

  $scope.create = function() {
    for(i=0; i<$scope.blankDays.length; i++){
      if($scope.blankDays[i].startHour!=null){
        var temp = new Object();
        temp.day = $scope.blankDays[i].day;
        temp.startTime = $scope.padTime($scope.blankDays[i].startHour, $scope.blankDays[i].startMin);
        temp.endTime = $scope.padTime($scope.blankDays[i].endHour, $scope.blankDays[i].endMin);
        $scope.jsonData.days.push(temp);
      }
    }
    $scope.jsonData.cats = $scope.select.option;
    console.log($scope.jsonData);
  };

  //ensure time is in format HH:MM:00 for django rest
  $scope.padTime = function(hour, min){
  var s = ""
    if(hour<10){s="0" + hour}
    else {s = "" + hour}
    s+= ":"
    if (min<10){s+= "0" + min}
    else{s+= min}
    s+=":00";
    return s;
  };

})

