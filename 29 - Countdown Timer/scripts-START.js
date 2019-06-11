const buttons = document.querySelectorAll('[data-time]');
const endTime = document.querySelector('.display__end-time');
const timerDisplay = document.querySelector('.display__time-left');

let countdown = 0;

function startTimer() {
	const seconds = parseInt(this.dataset.time);
	timer(seconds);
}

function timer(seconds) {
	// clear existing timers
	clearInterval(countdown);

	const now = Date.now();
	const then = now + seconds * 1000;

	displayTimeLeft(seconds);
	displayEndTime(then);

	countdown = setInterval(() => {
		const secondsLeft = Math.round( (then - Date.now()) / 1000 );
		// check for stop
		if (secondsLeft < 0) {
			clearInterval(countdown);
			return;
		}
		// display
		displayTimeLeft(secondsLeft)
	}, 1000);

}

function displayTimeLeft(seconds) {

	const minutes = Math.floor( seconds / 60 );
	const remainderSeconds = seconds % 60;
	const display  = `${minutes}:${remainderSeconds < 10 ? 0 : ''}${remainderSeconds}`;

	document.title = display;
	timerDisplay.textContent = display;
}

function displayEndTime(timestamp) {

	const end = new Date(timestamp);
	const hours = end.getHours();
	const adustedHour = hours > 12 ? hours - 12 : hours;
	const minutes = end.getMinutes();

	endTime.textContent = `Be back at ${adustedHour}:${minutes < 10 ? '0' : ''}${minutes}`;
}


buttons.forEach(button => button.addEventListener('click', startTimer));
document.customForm.addEventListener('submit', function(e) {
	e.preventDefault();
	const mins = this.minutes.value;
	timer(mins * 60);
	this.reset();
})








