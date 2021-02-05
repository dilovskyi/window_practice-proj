import checkNumInputs from "./checkNumInputs";

const form = (state) => {
	const forms = document.querySelectorAll("form");
	const inputs = document.querySelectorAll("input");

	checkNumInputs('input[name="user_phone"]');

	const message = {
		loading: "Загрузка...",
		success: "Спасибо! Скоро мы с Вами свяжемся",
		failure: "Что-то пошло не так...",
	};

	const postData = async (url, data) => {
		document.querySelector(".status").innerHTML = message.loading;
		const res = await fetch(url, {
			method: "POST",
			body: data,
		});
		return await res.text();
	};

	const clearInputs = () => {
		inputs.forEach((input) => {
			input.value = "";
		});
	};

	forms.forEach((form) => {
		form.addEventListener("submit", (e) => {
			e.preventDefault();

			let statusMessage = document.createElement("div");
			statusMessage.classList.add("status");
			form.append(statusMessage);

			const formData = new FormData(form);

			if (form.getAttribute("data-calc") == "end") {
				for (let key in state) {
					formData.append(key, state[key]);
				}
			}

			postData("assets/server.php", formData)
				.then((result) => {
					console.log(result);
				})
				.then(() => {
					statusMessage.textContent = message.success;
				})
				.catch(() => {
					statusMessage.textContent = message.failure;
				})
				.finally(() => {
					clearInputs();
					setTimeout(() => {
						statusMessage.remove();
					}, 5000);
				});
		});
	});
};

export default form;
