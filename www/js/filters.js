angular.module('maryhillFilters', [])

//Will check all filter conditions in one go
//the passes variable will be at 3 if all the conditions of the filters are met

.filter("searchAll", function() {
	return function(dataSet, dayss, start, end, ageL, ageU, cats) {
		var out = [];
		angular.forEach(dataSet, function(individualItem) {
			var passes = 0;

			//Loop for days check
			if(dayss.length==0){passes++;}
			
			daysLoop1: for(i=0; i<dayss.length; i++){
				
				daysLoop2: for(j=0; j<individualItem.days.length; j++){

					if(dayss[i].indexOf(individualItem.days[j].day) !=-1){
						passes++;

						break daysLoop1;
					}
				}
			}

			//Loop for categories check
			if(cats.length==0){passes++;}
			catsLoop1: for(i=0; i<cats.length; i++){
				
				catsLoop2: for (j=0; j<individualItem.cats.length; j++){
					if ((individualItem.cats[j].catName.name.indexOf(cats[i])) !=-1){
						passes++;
						break catsLoop1;
					}
				}
			}


			//Loop times check
			for(i=0; i<individualItem.days.length; i++){
				if(start <= parseInt(individualItem.days[i].startTime.substring(0, 2)) && 
				end >= parseInt(individualItem.days[i].endTime.substring(0, 2))){
					passes++;
					break;
				}
			}

			//ages check
			if(ageU == 65){
				if(ageL <= individualItem.agesUpper && (ageU+34) >= individualItem.agesLower) {
					passes++;
				}
			}
			else{
				if(ageL <= individualItem.agesUpper && ageU >= individualItem.agesLower){
					passes++;
				}
			}
			if(passes==4){out.push(individualItem);}
			
		});

		return out;
	}
})


/*
angular.module('maryhillFilters', [])

.filter("searchDays", function() {
	return function(dataSet, dayss) {
		if (dayss==0) {return dataSet};
		var out = [];
		angular.forEach(dataSet, function(individualItem) {
			for(i=0; i<individualItem.days.length; i++){
				for(j=0; j<dayss.length; j++){
					if(dayss[j].indexOf(individualItem.days[i].day) !=-1){
						out.push(individualItem);
					}
				}
			}			
		});
		return out;
	}
})*/