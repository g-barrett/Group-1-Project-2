// Header shadow on scroll
window.addEventListener("scroll", function () {
	var header = document.querySelector("header");
	if (window.scrollY > 0) {
		header.classList.add("navbar-shadow");
	} else {
		header.classList.remove("navbar-shadow");
	}
});
