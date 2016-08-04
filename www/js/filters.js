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
})