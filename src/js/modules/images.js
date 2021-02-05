const images = () => {
	const imgPopup = document.createElement("div");
	const workSection = document.querySelector(".works");
	const bigImg = document.createElement("img");

	imgPopup.classList.add("popup");
	imgPopup.style.justifyContent = "center";
	imgPopup.style.alignItems = "center";
  imgPopup.style.display = "none";

  workSection.append(imgPopup);
	imgPopup.append(bigImg);

	workSection.addEventListener("click", (e) => {
		e.preventDefault();
		const target = e.target;

		if (target && target.classList.contains("preview")) {
			imgPopup.style.display = "flex";
			const path = target.parentNode.getAttribute("href");
			bigImg.setAttribute("src", path);
		}

		if (target && target.matches("div.popup")) {
			imgPopup.style.display = "none";
		}
	});
};
export default images;
