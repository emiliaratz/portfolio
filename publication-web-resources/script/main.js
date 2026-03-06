var currentPage = 0;
const totalHtmlFiles = 13;

function getPageUrl(index) {
	var base = window.location.href.substring(0, window.location.href.lastIndexOf("/") + 1);
	base = base + "publication-web-resources/html/";
	return index === 0
		? base + "publication.html"
		: base + "publication-" + index + ".html";
}

function initScrollNavigation() {
	var container = document.getElementById("scrollContainer");

	for (var i = 0; i < totalHtmlFiles; i++) {
		var slide = document.createElement("div");
		slide.className = "scroll-slide";
		slide.dataset.index = i;

		var iframe = document.createElement("iframe");
		iframe.src = getPageUrl(i);
		iframe.className = "page-iframe";
		iframe.scrolling = "no";

		slide.appendChild(iframe);
		container.appendChild(slide);
	}

	// Track which slide is currently visible
	var observer = new IntersectionObserver(function(entries) {
		entries.forEach(function(entry) {
			if (entry.isIntersecting) {
				currentPage = parseInt(entry.target.dataset.index);
				showHideArrows();
			}
		});
	}, { threshold: 0.5 });

	container.querySelectorAll(".scroll-slide").forEach(function(slide) {
		observer.observe(slide);
	});
}

function showNextPage() {
	scrollToPage(currentPage + 1);
}

function showPreviousPage() {
	scrollToPage(currentPage - 1);
}

function scrollToPage(index) {
	if (index < 0 || index >= totalHtmlFiles) return;
	var slides = document.querySelectorAll(".scroll-slide");
	if (slides[index]) {
		slides[index].scrollIntoView({ behavior: "smooth" });
	}
}

function showHideArrows() {
	var prev = document.querySelector(".prev");
	var next = document.querySelector(".next");
	if (prev) prev.style.visibility = currentPage === 0 ? "hidden" : "visible";
	if (next) next.style.visibility = currentPage === (totalHtmlFiles - 1) ? "hidden" : "visible";
}

window.addEventListener("load", function() {
	initScrollNavigation();
	showHideArrows();
});
