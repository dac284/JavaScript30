/* Get elements */
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');
const fullScreen = player.querySelector('.full-screen__button');


/* build fcns */

function playVideo() {
	const method = video.paused ? 'play' : 'pause';
	video[method]();
}

function updateButton() {
	toggle.textContent = this.paused ? "►" : "||";
}

function skip() {
	// console.log('skippin');
	video.currentTime += parseFloat(this.dataset.skip);
}

function handleRangeUpdate() {
	video[this.name] = this.value;
}

function handleProgress() {
	const percent = (video.currentTime/video.duration) * 100;
	progressBar.style.flexBasis = `${percent}%`;
}

function scrub(e) {
	const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
	video.currentTime = scrubTime;
}

function toggleFullScreen() {
	const request = video.fullscreenEneabled ? 'exitFullscreen' :'requestFullscreen';
	video[request]();
}


/* hook up event listeners */
toggle.addEventListener('click', playVideo);
video.addEventListener('click', playVideo);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);

skipButtons.forEach(button => button.addEventListener('click',skip))

ranges.forEach(range =>  range.addEventListener('input', handleRangeUpdate));


video.addEventListener('timeupdate', handleProgress);

let mousedown =  false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);
fullScreen.addEventListener('click',toggleFullScreen);
