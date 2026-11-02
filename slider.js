/*jslint browser */

(function () {
    "use strict";

    const line = document.getElementById("slider-line");
    const prevButton = document.getElementById("prev-button");
    const nextButton = document.getElementById("next-button");
    const pager = document.getElementById("pager");
    const total = line.children.length;
    const desktop = window.matchMedia("(min-width: 768px)");
    let current = 0;

    function getVisible() {
        if (desktop.matches) {
            return 3;
        }
        return 1;
    }

    function getPages() {
        return total - getVisible() + 1;
    }

    function updatePager() {
        Array.from(pager.children).forEach(function (dot, index) {
            dot.classList.toggle("active", index === current);
        });
    }

    function showSlide() {
        line.style.transform = "translateX(-" + ((100 / getVisible()) * current) + "%)";
        updatePager();
    }

    function addDot(index) {
        const dot = document.createElement("button");
        dot.type = "button";
        dot.setAttribute("aria-label", "Страница " + (index + 1));
        dot.addEventListener("click", function () {
            current = index;
            showSlide();
        });
        pager.appendChild(dot);
    }

    function buildPager() {
        let index;
        pager.innerHTML = "";
        for (index = 0; index < getPages(); index += 1) {
            addDot(index);
        }
    }

    prevButton.addEventListener("click", function () {
        if (current > 0) {
            current -= 1;
        } else {
            current = getPages() - 1;
        }
        showSlide();
    });

    nextButton.addEventListener("click", function () {
        if (current < getPages() - 1) {
            current += 1;
        } else {
            current = 0;
        }
        showSlide();
    });

    window.addEventListener("resize", function () {
        if (current > getPages() - 1) {
            current = getPages() - 1;
        }
        buildPager();
        showSlide();
    });

    buildPager();
    showSlide();
}());