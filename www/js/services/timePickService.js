var module = angular.module('maryhillServices')

module.service('timePicker', function(){

	var blankDaysArrray = function() {
		return [
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
	}

	var increaseStartTime = function(item){
		if(item.data.startHour !=23) {
			if(((item.data.startMin +15)%60)==0){
				item.data.startHour++;
			}
			item.data.startMin = (item.data.startMin +15)%60;
		}
		//occurs when start time is taking over end time, push end time back 15 mins each time
		if(item.data.startHour==item.data.endHour && item.data.startMin==item.data.endMin){
			if(((item.data.endMin +15)%60)==0){
				item.data.endHour++;
			}
			item.data.endMin = (item.data.endMin +15)%60;		
		}
	};

	var decreaseStartTime = function(item){
		if((item.data.startHour ==8 && item.data.startMin==0)==false) {	
			if(item.data.startMin%60==0){
				item.data.startHour--;
				item.data.startMin = 45;
			}
			else {item.data.startMin = (item.data.startMin -15)%60;}	
		}
	};

	var increaseEndTime = function(item){
		if(item.data.endHour !=24) {
			if(((item.data.endMin +15)%60)==0){
				item.data.endHour++;
			}
			item.data.endMin = (item.data.endMin +15)%60;
		}
	};

	var decreaseEndTime = function(item){
		if((item.data.endHour ==8 && item.data.endMin==0)==false) {	
			if(item.data.endMin%60==0){
				item.data.endHour--;
				item.data.endMin = 45;
			}
			else {item.data.endMin = (item.data.endMin -15)%60;}	

			if(item.data.startHour==item.data.endHour && item.data.startMin==item.data.endMin){
				if(item.data.startMin%60==0){
					item.data.startHour--;
					item.data.startMin = 45;
				}
				else {item.data.startMin = (item.data.startMin -15)%60;}
			}
		}
	};

	var nullTime = function(item){
		if(item.data.checked==true){
			item.data.startHour = 12; item.data.startMin = 0;
			item.data.endHour = 14; item.data.endMin = 0;
		}
		else{
			item.data.startHour = null; item.data.startMin = null;
			item.data.endHour = null; item.data.endMin = null;
		}

	};

	return{
		increaseStart: increaseStartTime,
		decreaseStart: decreaseStartTime,
		increaseEnd: increaseEndTime,
		decreaseEnd: decreaseEndTime,
		nullTime: nullTime,
		blank: blankDaysArrray
	};

});