const modals = () => {
	function bindModal(triggerSelector, modalSelector, closeSelector, closeClickOverlay = true) {
		const trigger = document.querySelectorAll(triggerSelector);
		const modal = document.querySelector(modalSelector);
		const close = document.querySelector(closeSelector);
		const windows = document.querySelectorAll("[data-modal]");
		const scroll = calcScroll();
		console.log(scroll);

		function hideAllModals() {
			windows.forEach((item) => {
				item.style.display = "none";
			});
		}

		trigger.forEach((item) => {
			item.addEventListener("click", (e) => {
				if (e.target) {
					e.preventDefault();
				}
				hideAllModals();
				modal.style.display = "block";
				document.body.style.overflow = "hidden";
				document.body.style.marginRight = `${scroll}px`;
			});
		});

		close.addEventListener("click", () => {
			modal.style.display = "none";
			document.body.style.overflow = "unset";
			hideAllModals();
			document.style.marginRight = `0px`;
		});

		modal.addEventListener("click", (e) => {
			if (e.target === modal && closeClickOverlay) {
				modal.style.display = "none";
				document.body.style.overflow = "unset";
				hideAllModals();
				document.body.style.marginRight = `0px`;
			}
		});
	}

	function showModalByTime(selector, time) {
		setTimeout(() => {
			document.querySelector(selector).style.display = "block";
			document.body.style.overflow = "hidden";
		}, time);
	}

	function calcScroll() {
		const div = document.createElement("div");
		div.style.width = "100%";
		div.style.height = "100%";
		div.style.overflowY = "scroll";
		div.style.visibility = "hidden";
		div.style.backgroundColor = "red";
		document.body.append(div);

		const scrollWidth = div.offsetWidth - div.clientWidth;
		// div.remove();
		return scrollWidth;
	}

	bindModal(".popup_engineer_btn", ".popup_engineer", ".popup_engineer .popup_close");
	bindModal(".phone_link", ".popup", ".popup .popup_close");
	bindModal(".popup_calc_btn", ".popup_calc", ".popup_calc_close");
	bindModal(".popup_calc_button", ".popup_calc_profile", ".popup_calc_profile_close", false);
	bindModal(".popup_calc_profile_button", ".popup_calc_end", ".popup_calc_end_close", false);
	// showModalByTime(".popup", 60000);
};

export default modals;
