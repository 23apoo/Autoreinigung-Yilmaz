// ================================
// MOBILE NAV
// ================================

const navToggle = document.getElementById("navToggle");
const navMobile = document.getElementById("navMobile");

if (navToggle && navMobile) {

    navToggle.addEventListener("click", () => {

        const isOpen = navMobile.classList.toggle("open");

        navToggle.classList.toggle("open");

        navToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");

    });

    navMobile.querySelectorAll("a").forEach(link => {

        link.addEventListener("click", () => {

            navMobile.classList.remove("open");

            navToggle.classList.remove("open");

            navToggle.setAttribute("aria-expanded", "false");

        });

    });

}

// ================================
// CURSOR
// ================================

const cursor = document.querySelector(".cursor");
const ring = document.querySelector(".cursor-ring");

if (cursor && ring) {

    window.addEventListener("mousemove", (e) => {

        cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%,-50%)`;

        ring.animate(
            { transform: `translate(${e.clientX}px, ${e.clientY}px) translate(-50%,-50%)` },
            { duration: 120, fill: "forwards" }
        );

    });

    document.querySelectorAll("a,button").forEach(el => {

        el.addEventListener("mouseenter", () => {
            cursor.style.width = "24px";
            cursor.style.height = "24px";
        });

        el.addEventListener("mouseleave", () => {
            cursor.style.width = "14px";
            cursor.style.height = "14px";
        });

    });

}

// ================================
// NAVBAR BACKGROUND ON SCROLL
// ================================

const nav = document.querySelector("nav");

if (nav) {

    window.addEventListener("scroll", () => {

        if (window.scrollY > 80) {
            nav.style.background = "rgba(5,5,5,.82)";
            nav.style.backdropFilter = "blur(18px)";
        } else {
            nav.style.background = "rgba(0,0,0,.15)";
            nav.style.backdropFilter = "blur(20px)";
        }

    });

}

// ================================
// BACK TO TOP
// ================================

const back = document.getElementById("backToTop");

if (back) {

    window.addEventListener("scroll", () => {

        if (window.scrollY > 600) {
            back.style.opacity = "1";
            back.style.pointerEvents = "auto";
        } else {
            back.style.opacity = "0";
            back.style.pointerEvents = "none";
        }

    });

    back.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });

}

// ================================
// COOKIE BANNER
// ================================

const cookieBanner = document.getElementById("cookieBanner");

if (cookieBanner) {

    if (localStorage.getItem("cookiesAccepted")) {
        cookieBanner.style.display = "none";
    }

    const acceptBtn = document.getElementById("acceptCookies");
    const declineBtn = document.getElementById("declineCookies");

    if (acceptBtn) {
        acceptBtn.onclick = () => {
            localStorage.setItem("cookiesAccepted", "true");
            cookieBanner.style.display = "none";
        };
    }

    if (declineBtn) {
        declineBtn.onclick = () => {
            cookieBanner.style.display = "none";
        };
    }

}

// ================================
// SCROLL-IN ANIMATIONS
// ================================

const observer = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            gsap.fromTo(
                entry.target,
                { opacity: 0, y: 60 },
                { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
            );

            observer.unobserve(entry.target);

        }

    });

}, { threshold: .15 });

document.querySelectorAll(
    ".included-list div, .process-step, .price-teaser"
).forEach(item => {
    observer.observe(item);
});

console.log("Autoreinigung Yilmaz – Detailseite geladen.");
