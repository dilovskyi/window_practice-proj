import "./slider";

import modals from "./modules/modals";
import tabs from "./modules/tabs";
import form from "./modules/forms";
import changeModalState from "./modules/changeModalState";
import timer from "./modules/timer";
import images from "./modules/images";

window.addEventListener("DOMContentLoaded", () => {
	"use strict";

	let modalState = {};

	tabs(".glazing_slider", ".glazing_block", ".glazing_content", "active");
	tabs(".decoration_slider", ".no_click", ".decoration_content > div > div", "after_click");
	tabs(".balcon_icons", ".balcon_icons_img", ".big_img > img", "do_image_more", "inline-block");
	modals();
	form(modalState);
	changeModalState(modalState);
	timer("#timer", [5, 27, 2022]);
	images();
});
