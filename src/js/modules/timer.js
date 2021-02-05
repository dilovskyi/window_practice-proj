const timer = (id, deadline) => {
	const getTimeRemaining = (endtime) => {
		const t = Date.parse(endtime) - Date.now();
		const seconds = Math.round((t / 1000) % 60);
		const minutes = Math.round((t / 1000 / 60) % 60);
		const hours = Math.round((t / 1000 / 60 / 60) % 24);
		const days = Math.round(t / 1000 / 60 / 60 / 24);

		return {
			t,
			seconds,
			minutes,
			hours,
			days,
		};
	};

	const addZero = (num) => {
		if (num <= 9) {
			return "0" + num;
		} else {
			return num;
		}
	};

	const setClock = (id) => {
		const timer = document.querySelector(id);
		const days = timer.querySelector("#days");
		const hours = timer.querySelector("#hours");
		const minutes = timer.querySelector("#minutes");
		const seconds = timer.querySelector("#seconds");
		let total = getTimeRemaining(deadline);

		let updateTime = () => {
			if (total.t <= 0) {
				days.textContent = "00";
				hours.textContent = "00";
				minutes.textContent = "00";
				seconds.textContent = "00";
				clearInterval(tick);
			} else {
				days.textContent = addZero(total.days);
				hours.textContent = addZero(total.hours);
				minutes.textContent = addZero(total.minutes);
				seconds.textContent = addZero(total.seconds);
			}
		};
		const tick = setInterval(() => {
			total = getTimeRemaining(deadline);
			updateTime();
		}, 1000);
		updateTime();
	};
	setClock(id, deadline);
};

export default timer;
