'use strict';

// Offscreen document for audio playback in MV3 service workers.
// Receives playSound messages from the background service worker.

chrome.runtime.onMessage.addListener(function(request) {
	if (request.req !== 'playSound' || !request.url)
		return;

	try {
		var audio = new Audio(request.url);
		audio.play().catch(function() {});
	}
	catch (e) {}
});
