// Header shadow on scroll
window.addEventListener("scroll", function () {
	var header = document.querySelector("header");
	if (window.scrollY > 0) {
		header.classList.add("navbar-shadow");
	} else {
		header.classList.remove("navbar-shadow");
	}
});

function showSignupForm() {
	var signupWrapper = document.querySelector(".auth-container > .wrapper");
	var loginWrapper = document.getElementById("login-section");

	// Toggle visibility
	if (
		signupWrapper.style.display === "none" ||
		signupWrapper.style.display === ""
	) {
		signupWrapper.style.display = "block"; // Show signup form and its wrapper
		loginWrapper.style.display = "none"; // Hide login section
	} else {
		signupWrapper.style.display = "none"; // Hide signup form and its wrapper
		loginWrapper.style.display = "block"; // Show login section
	}
}
