var module = angular.module('maryhillControllers');

module.controller('superCtrl',function($scope, $state, allInfo, timePicker, restService, AuthService, $ionicHistory, $ionicPopup ){
  
  $scope.logout = function(){
    AuthService.logout();
    $ionicHistory.clearCache().then(function(){
      $state.go("app.activities")
      $scope.setStatus("out");
    });
  }

  $scope.sharedInfo = allInfo.edit;

  $scope.update = function() {
    $state.go('app.super.modify');
  }

  restService.getAct().then(function successCallback(result) {  
    $scope.activities = result;
    }, function errorCallback(response) {
      console.log("failed");
    });

    $scope.editPage = function(item) {
      allInfo.edit = item.data;
      $state.go('app.super.edit');
      console.log(item.data);

    } 

    //---------------------------- New Admin Ctrl ----------------------------//
    $scope.user = {
      username: "asd",
      password: "asdasd"
    };

    

    $scope.newAdmin = function() {
     var user = $scope.userjson = angular.toJson($scope.user);
     console.log(user);
   $http({
      method: 'POST',
      url: ApiEndpoint.url + 'new-admin/',
      data: user,
      headers: {'Content-Type': 'application/json'}
    }).then(function successCallback(response) {
        var alertPopup = $ionicPopup.alert({
          title: 'Success',
          template: 'Admin successfully created!'
        });
      }, function errorCallback(response) {
        var alertPopup = $ionicPopup.alert({
          title: 'Error!',
          template: 'Admin creation failed, check fields and ensure a user with that username doesnt already exist'
        });
      });
    }

    //---------------------------- New Event Ctrl ----------------------------//
    $scope.blankDays = timePicker.blank();

    $scope.nullTime = function(item){
      timePicker.nullTime(item);
    };

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