var module = angular.module('maryhillControllers');

module.controller('newEventCtrl',function($scope, $state, timePicker, AuthService, restService, $ionicPopup ){

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
  };

  $scope.owner = {username:null};

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
    owner: null,
    days: [],
    cats: []

  };

  $scope.role = AuthService.role();



  $scope.nullTime = function(item){
    timePicker.nullTime(item);
    console.log($scope.role);
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
    for(i=0; i<3; i++){
      if($scope.select.option[i]!=null){
        var catObj = new Object();
        var catObjName = new Object();
        catObjName.name = $scope.select.option[i];
        catObj.catName = catObjName;
        $scope.jsonData.cats.push(catObj);
      }
    }
    
    if(AuthService.role()==='admin_role'){
      var ownObj = new Object();
      ownObj.username = AuthService.uName();
      $scope.jsonData.owner = ownObj;
    }

    else {

      if ($scope.owner.username!=null){
        var ownObj = new Object();
        ownObj.username = $scope.owner.username;
        $scope.jsonData.owner = ownObj;      
      }
    }

    //once data is ready convert all to proper json format ready for http request
    $scope.eventJSON = angular.toJson($scope.jsonData);
    restService.newAct($scope.eventJSON).then(function(msg) {

      var alertPopup = $ionicPopup.alert({
        title: "Event Created",
        template: "The new event was added to the directory",
        okType: "button-positive"
      });
      
      alertPopup.then(function(res) {
        if(AuthService.role()==='admin_role'){
          $state.go('app.admin.modify');
        }
        else {
          $state.go('app.super.modify');
        }
      
      });
   
    }, function(msg){
      alert("fail " + msg);
    });
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

});

