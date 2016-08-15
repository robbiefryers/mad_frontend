var module = angular.module('maryhillServices')

module.service('settingsService', function(){

	var tutorialOn = true;

	//set up setting variables in local storage on first time app opened
	if (window.localStorage.getItem(tutorialOn) ==null){
		window.localStorage.setItem(tutorialOn, true);
	}

	function getTutorialOption() {
		return window.localStorage.getItem(tutorialOn);
	}

	function setTutorialOption() {
		bool = JSON.parse(getTutorialOption());
		boolChange = !bool;
		window.localStorage.setItem(tutorialOn, boolChange);
		return getTutorialOption();
	}
	return {
		getTut: getTutorialOption,
		setTut: setTutorialOption,
		tutorial: tutorialOn,
	}
})