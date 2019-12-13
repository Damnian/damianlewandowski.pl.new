window.addEventListener('load', function() {

function coloredNavbar() {
	const navbar = document.querySelector('.navbar');

	window.addEventListener('scroll', function() {
		navbar.classList.toggle('active', window.scrollY > 100);
	}, false);
}

coloredNavbar();

}, false);