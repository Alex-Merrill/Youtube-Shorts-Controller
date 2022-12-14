console.log("Youtube shorts controller loaded");

// handle control inputs
document.addEventListener("keydown", (e) => {
	// if in search field, return
	if (document.activeElement.id === "search") return;

	// get key pressed and short element to manipulate
	cmd = e.key;
	currentShort = document.querySelector("#shorts-player > div.html5-video-container > video");
	if (!currentShort) {
		console.log("Youtube short not detected");
		return;
	}

	// controls
	switch (cmd) {
		// Rewind
		case 'a':
			currentShort.currentTime -= 2.5;
			break;
		case 'A':
			currentShort.currentTime -= 5;
			break;

		// Fast-Forward
		case 'd':
			currentShort.currentTime += 2.5;
			break;
		case 'D':
			currentShort.currentTime += 5;
			break;

		// Decrease Playback Speed
		case 's':
			currentShort.playbackRate -= .25;
			break;

		// Increase Playback Speed
		case 'w':
			currentShort.playbackRate += .25;
			break;
	}
});

// returns ui element for manipulating timestamp/playback elements
// if ui element doesn't exist yet, we return the short container to create a new ui
const getUIEl = () => {
	const currentShortContainer = document.querySelector("#shorts-player > div.html5-video-container > video")
																				.closest("ytd-reel-video-renderer");

	const currentShortUI = currentShortContainer
							.querySelector("div.overlay.style-scope.ytd-reel-video-renderer")
							.querySelector("ytd-reel-player-overlay-renderer")
							.querySelector("div#overlay")
							.querySelector("div#progress-bar")
							.querySelector("div#youtube-shorts-controller-ui");

	if(!currentShortUI) return currentShortContainer;
	return currentShortUI;
}

// update ui every 500ms
ytShortEl = null;
setInterval(() => {
	// if yt short element is not loaded in DOM yet, return
	// if yt short element is loaded in DOM, but not saved, set ytShortEl to video element
	if (!document.querySelector("#shorts-player > div.html5-video-container > video")) return;
	if (!ytShortEl) ytShortEl = document.querySelector("#shorts-player > div.html5-video-container > video"); 

	// get youtube-shorts-controller-ui elemenet if exists and update timestamp/playback,
	// else create elements
	const uiEl = getUIEl();
	if (uiEl.id == "youtube-shorts-controller-ui") {
		// set playback rate
		const playbackRateText = uiEl.childNodes[0];
		playbackRateText.innerText = `x${ytShortEl.playbackRate}`;

		// set timestamp
		const timestampText = uiEl.childNodes[1];
		timestampText.innerText = `${ytShortEl.currentTime.toFixed(0)}s`;
	} else {
		// get youtube progress bar div for current short
		const progBar = uiEl.querySelector("div.overlay.style-scope.ytd-reel-video-renderer")
							.querySelector("ytd-reel-player-overlay-renderer")
							.querySelector("div#overlay")
							.querySelector("div#progress-bar");
		
		// create playback/timestamp elements in container
		const uiContainer = document.createElement("div");
		uiContainer.id = "youtube-shorts-controller-ui"

		const playbackRateText = document.createElement("p");
		playbackRateText.id = "youtube-shorts-controller-playback-rate-text";
		uiContainer.appendChild(playbackRateText);
		
		const timestampText = document.createElement("p");
		timestampText.id = "youtube-shorts-controller-timestamp-text";
		uiContainer.appendChild(timestampText);

		progBar.insertBefore(uiContainer, progBar.firstChild);
	}

}, 250);