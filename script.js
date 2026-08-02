// ================================
// LOADER
// ================================

window.addEventListener("load", () => {

    gsap.to(".loader-progress", {
        width: "100%",
        duration: 1.2,
        ease: "power2.out"
    });

    gsap.to("#loader", {
        opacity: 0,
        duration: 0.8,
        delay: 1.2,
        pointerEvents: "none",
        onComplete: () => {
            document.getElementById("loader").style.display = "none";
        }
    });

});

// ================================
// HERO INTRO
// ================================

gsap.from(".hero-hotspots .hotspot",{
    opacity:0,
    scale:.5,
    stagger:.2,
    delay:2.2
});

// ================================
// MOBILE NAV
// ================================

const navToggle=document.getElementById("navToggle");
const navMobile=document.getElementById("navMobile");

if(navToggle && navMobile){

navToggle.addEventListener("click",()=>{

const isOpen=navMobile.classList.toggle("open");

navToggle.classList.toggle("open");

navToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");

});

navMobile.querySelectorAll("a").forEach(link=>{

link.addEventListener("click",()=>{

navMobile.classList.remove("open");

navToggle.classList.remove("open");

navToggle.setAttribute("aria-expanded","false");

});

});

}

// ================================
// CURSOR
// ================================

const cursor=document.querySelector(".cursor");
const ring=document.querySelector(".cursor-ring");

window.addEventListener("mousemove",(e)=>{

cursor.style.transform=`translate(${e.clientX}px, ${e.clientY}px) translate(-50%,-50%)`;

ring.animate(
{
transform:`translate(${e.clientX}px, ${e.clientY}px) translate(-50%,-50%)`
},
{
duration:120,
fill:"forwards"
}
);

});

document.querySelectorAll("a,button").forEach(el=>{

el.addEventListener("mouseenter",()=>{

cursor.style.width="24px";
cursor.style.height="24px";

});

el.addEventListener("mouseleave",()=>{

cursor.style.width="14px";
cursor.style.height="14px";

});

});

// ================================
// HOTSPOTS
// ================================

document.querySelectorAll(".hotspot").forEach(hotspot=>{

hotspot.addEventListener("click",()=>{

const target=document.getElementById(hotspot.dataset.target);

if(!target) return;

target.scrollIntoView({

behavior:"smooth"

});

});

});

// ================================
// BACK TO TOP
// ================================

const back=document.getElementById("backToTop");

window.addEventListener("scroll",()=>{

if(window.scrollY>600){

back.style.opacity="1";
back.style.pointerEvents="auto";

}else{

back.style.opacity="0";
back.style.pointerEvents="none";

}

});

back.addEventListener("click",()=>{

window.scrollTo({

top:0,
behavior:"smooth"

});

});

// ================================
// HOTSPOT GLOW
// ================================

document.querySelectorAll(".hotspot").forEach(item=>{

item.addEventListener("mouseenter",()=>{

gsap.to(item,{
scale:1.15,
duration:.25
});

});

item.addEventListener("mouseleave",()=>{

gsap.to(item,{
scale:1,
duration:.25
});

});

});
// ================================
// CONFIGURATOR
// ================================

const vehicles = document.querySelectorAll(".vehicle");
const packages = document.querySelectorAll(".package");
const extras = document.querySelectorAll(".extras-grid input");

const vehicleOutput = document.getElementById("vehicleOutput");
const packageOutput = document.getElementById("packageOutput");
const extrasOutput = document.getElementById("extrasOutput");
const priceOutput = document.getElementById("priceOutput");

let vehiclePrice = 0;
let packagePrice = 49;

function updatePrice() {

let extrasPrice = 0;
let extrasText = [];

extras.forEach(extra => {

if(extra.checked){

extrasPrice += Number(extra.value);

extrasText.push(
extra.parentElement.textContent.trim()
);

}

});

if(extrasText.length===0){

extrasOutput.textContent="Keine";

}else{

extrasOutput.textContent=extrasText.join(", ");

}

const total =
vehiclePrice+
packagePrice+
extrasPrice;

priceOutput.textContent=total+" €";

}

vehicles.forEach(vehicle=>{

vehicle.addEventListener("click",()=>{

vehicles.forEach(v=>v.classList.remove("active"));

vehicle.classList.add("active");

vehiclePrice=Number(vehicle.dataset.price);

vehicleOutput.textContent=vehicle.textContent.trim();

updatePrice();

});

});

packages.forEach(pack=>{

pack.addEventListener("click",()=>{

packages.forEach(p=>p.classList.remove("active"));

pack.classList.add("active");

packagePrice=Number(pack.dataset.price);

packageOutput.textContent=pack.textContent.trim();

updatePrice();

});

});

extras.forEach(extra=>{

extra.addEventListener("change",updatePrice);

});

updatePrice();

// ================================
// COOKIE BANNER
// ================================

const cookieBanner=document.getElementById("cookieBanner");

if(localStorage.getItem("cookiesAccepted")){

cookieBanner.style.display="none";

}

document.getElementById("acceptCookies").onclick=()=>{

localStorage.setItem("cookiesAccepted","true");

cookieBanner.style.display="none";

};

document.getElementById("declineCookies").onclick=()=>{

cookieBanner.style.display="none";

};

// ================================
// BOOKING MODAL
// ================================

const bookingModal=document.getElementById("bookingModal");

document.querySelectorAll('a[href="#kontakt"]').forEach(button=>{

button.addEventListener("click",(e)=>{

e.preventDefault();

document.getElementById("kontakt").scrollIntoView({

behavior:"smooth"

});

});

});
document.getElementById("closeBooking").onclick=()=>{

bookingModal.style.display="none";

};

bookingModal.addEventListener("click",(e)=>{

if(e.target===bookingModal){

bookingModal.style.display="none";

}

});

// ================================
// CONTACT FORM
// ================================

const contactForm=document.getElementById("contactForm");

contactForm.addEventListener("submit",(e)=>{

e.preventDefault();

alert("Vielen Dank! Deine Anfrage wurde erfolgreich gesendet.");

contactForm.reset();

});

// ================================
// BOOKING FORM
// ================================

const bookingForm=document.querySelector(".booking-form");

bookingForm.addEventListener("submit",(e)=>{

e.preventDefault();

alert("Vielen Dank! Wir melden uns schnellstmöglich.");

bookingForm.reset();

bookingModal.style.display="none";

});

// ================================
// SCROLL ANIMATIONS
// ================================

const observer=new IntersectionObserver((entries)=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

gsap.fromTo(

entry.target,

{
opacity:0,
y:80
},

{
opacity:1,
y:0,
duration:1,
ease:"power3.out"
}

);

observer.unobserve(entry.target);

}

});

},{
threshold:.15
});

document.querySelectorAll(

".experience-card,.price-card,.review-card,.stat,.summary-card,.contact-card"

).forEach(item=>{

observer.observe(item);

});

// ================================
// PARALLAX HERO
// ================================

window.addEventListener("scroll",()=>{

const y=window.scrollY;

const video=document.getElementById("heroVideo");

video.style.transform=`scale(1.08) translateY(${y*0.18}px)`;

});

// ================================
// NAVBAR BACKGROUND
// ================================

window.addEventListener("scroll",()=>{

const nav=document.querySelector("nav");

if(window.scrollY>80){

nav.style.background="rgba(5,5,5,.82)";
nav.style.backdropFilter="blur(18px)";

}else{

nav.style.background="rgba(0,0,0,.15)";
nav.style.backdropFilter="blur(20px)";

}

});

// ================================
// END
// ================================

console.log("Autoreinigung Yilmaz erfolgreich geladen.");

const heroTl = gsap.timeline({ defaults: { ease: "power4.out" } });

heroTl
.from(".hero-top", {
    y: 40,
    opacity: 0,
    duration: .8
}, .3)
.from(".hero-content h1 .word", {
    y: 90,
    opacity: 0,
    rotate: 4,
    duration: 1,
    stagger: .12
}, .5)
.from(".hero-text", {
    y: 40,
    opacity: 0,
    duration: .8
}, "-=.4")
.from(".hero-buttons", {
    y: 40,
    opacity: 0,
    duration: .8
}, "-=.5")
.from(".hero-badge", {
    y: 20,
    opacity: 0,
    duration: .7
}, "-=.4")
.from(".scroll-indicator", {
    opacity: 0,
    duration: 1
}, "-=.3")
.from(".hero-marquee", {
    y: 30,
    opacity: 0,
    duration: 1
}, "-=.8");

// ================================
// HERO MOUSE PARALLAX
// ================================

const heroSection = document.querySelector(".hero");
const glowLeft = document.querySelector(".hero-glow-left");
const glowRight = document.querySelector(".hero-glow-right");

if (heroSection && glowLeft && glowRight) {

    heroSection.addEventListener("mousemove", (e) => {

        const { innerWidth, innerHeight } = window;

        const relX = (e.clientX / innerWidth - 0.5) * 2;
        const relY = (e.clientY / innerHeight - 0.5) * 2;

        glowLeft.style.transform = `translate(${relX * -30}px, ${relY * -30}px)`;
        glowRight.style.transform = `translate(${relX * 30}px, ${relY * 30}px)`;

    });

    heroSection.addEventListener("mouseleave", () => {

        glowLeft.style.transform = "translate(0,0)";
        glowRight.style.transform = "translate(0,0)";

    });

}