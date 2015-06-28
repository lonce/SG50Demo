define(
	function () {
		exports = {};
		exports.webAudioEnabled=true;

		if ((!window.AudioContext) && (!window.webkitAudioContext)){
			alert("SG50sound: Web Audio API is not supported. ");
			exports.webAudioEnabled=false;
		}

		exports.touchMarginOfError = 3; //px, used for "selecting" items on the score
		exports.minSndDuration=60; // must be longer than frame duration so start and stop and not sent to the synthesizer at the same time. 
		return exports;
});

