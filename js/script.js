
/* =========================================
   KOOLAPERIYAVAN VILAI
   Main JavaScript
========================================= */

document.addEventListener("DOMContentLoaded", function () {
    "use strict";

    // 1. MOBILE NAVIGATION
    const menuToggle = document.querySelector(".menu-toggle");
    const mainNav = document.querySelector(".main-nav");

    if (menuToggle && mainNav) {
        function closeMenu() {
            mainNav.classList.remove("open");
            menuToggle.setAttribute("aria-expanded", "false");
            menuToggle.setAttribute("aria-label", "Open menu");
            menuToggle.textContent = "☰";
        }

        menuToggle.addEventListener("click", function () {
            const isOpen = mainNav.classList.toggle("open");

            menuToggle.setAttribute("aria-expanded", String(isOpen));
            menuToggle.setAttribute(
                "aria-label",
                isOpen ? "Close menu" : "Open menu"
            );
            menuToggle.textContent = isOpen ? "✕" : "☰";
        });

        // Close menu after selecting a navigation link
        mainNav.querySelectorAll("a").forEach(function (link) {
            link.addEventListener("click", closeMenu);
        });

        // Close menu when clicking outside
        document.addEventListener("click", function (event) {
            if (
                mainNav.classList.contains("open") &&
                !mainNav.contains(event.target) &&
                !menuToggle.contains(event.target)
            ) {
                closeMenu();
            }
        });

        // Reset mobile menu when returning to desktop layout
        window.addEventListener("resize", function () {
            if (window.innerWidth > 760) {
                closeMenu();
            }
        });

        // Close menu with Escape key
        document.addEventListener("keydown", function (event) {
            if (event.key === "Escape") {
                closeMenu();
            }
        });
    }

    // 2. AUTOMATIC ACTIVE NAVIGATION
    const currentPage = window.location.pathname
        .split("/")
        .pop()
        .toLowerCase();

    document.querySelectorAll(".main-nav a").forEach(function (link) {
        const linkPage = link.getAttribute("href")
            .split("/")
            .pop()
            .toLowerCase();

        if (linkPage === currentPage) {
            link.classList.add("active");
            link.setAttribute("aria-current", "page");
        } else {
            link.classList.remove("active");
            link.removeAttribute("aria-current");
        }
    });

    // 3. AUTOMATIC COPYRIGHT YEAR
    const year = new Date().getFullYear();

    document.querySelectorAll(".current-year").forEach(function (element) {
        element.textContent = year;
    });

    // 4. HANDLE BROKEN IMAGES
    document.querySelectorAll("img").forEach(function (image) {
        image.addEventListener("error", function () {
            // Avoid repeatedly trying to load a failed image
            if (image.dataset.fallbackTried === "true") {
                return;
            }

            image.dataset.fallbackTried = "true";

            // The HTML may already have an onerror fallback.
            // If that fallback also fails, hide the broken image.
            image.style.backgroundColor = "#101f16";
            image.style.color = "#d8b86a";
        });
    });

    // 5. EXTERNAL LINKS OPEN SAFELY
    document.querySelectorAll('a[target="_blank"]').forEach(function (link) {
        link.setAttribute("rel", "noopener noreferrer");
    });

    // 6. REDUCE ANIMATION WHEN REQUESTED
    const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    );

    if (reduceMotion.matches) {
        document.documentElement.style.scrollBehavior = "auto";
    }

    console.log("Koolaperiyavan Vilai website initialized.");
});
