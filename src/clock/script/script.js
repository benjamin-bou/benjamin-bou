"use strict";
const home_button = document.getElementById("home-btn");
const area = document.getElementById("clockArea");

const analogClock = document.getElementById("AnalogClock");
const numbers = document.getElementById("numbers");
const hour_hand = document.getElementById("hour");
const minute_hand = document.getElementById("minute");
const second_hand = document.getElementById("second");

const digitalClock = document.getElementById("digitalClock");
const digitalHours = document.getElementById("digitalHours");
const digitalMinutes = document.getElementById("digitalMinutes");
const digitalSecondes = document.getElementById("digitalSecondes");

const switchButton = document.getElementById("clockSwitch");
const toggleSwitch = document.getElementById("toggle");
displayClock();

switchButton.addEventListener('click', handleSwitch);
home_button.addEventListener("click", handleHomeBtn);

function handleHomeBtn(event) {
    window.location.href = "../../"
}

function displayClock() {
    let height = window.innerHeight;
    let width = window.innerWidth;
    let diameter = Math.min(height, width);
    let clockDiameter = diameter * 0.8;
    analogClock.style.width = clockDiameter + "px";
    analogClock.style.height = clockDiameter + "px";
    while (numbers.firstChild) {
        numbers.removeChild(numbers.firstChild);
    }
    for (let i = 1; i <= 12; i++) {
        const number = document.createElement("div");
        number.className = "number";
        number.innerText = i;

        const rotation = i * 30;
        const rotationRad = (rotation - 90) * (Math.PI / 180);

        const radius = analogClock.offsetWidth / 2.3; //Distance des nombres par rapport au centre
        const x = analogClock.offsetWidth / 2 + radius * Math.cos(rotationRad);
        const y = analogClock.offsetHeight / 2 + radius * Math.sin(rotationRad);

        number.style.transform = `translate(-50%, -50%) translate(${x}px, ${y}px)`;

        numbers.appendChild(number);
    }
};

function handleSwitch(event) {
    switchButton.classList.toggle("active");
    toggleSwitch.classList.toggle("active");

    if (switchButton.dataset.clock === "analog") {
        switchButton.dataset.clock = "digital";
        analogClock.style.display = "none";
        digitalClock.style.display = "flex";
    }
    else {
        switchButton.dataset.clock = "analog";
        analogClock.style.display = "block";
        digitalClock.style.display = "none";
    }
}

setInterval(() => {
    displayClock();
    let d = new Date();
    let hour = d.getHours();
    let min = d.getMinutes();
    let sec = d.getSeconds();

    /*Analog Clock*/
    let hr_rotation = 30 * hour + min / 2;
    let min_rotation = 6 * min;
    let sec_rotation = 6 * sec;

    hour_hand.style.transform = `rotate(${hr_rotation}deg)`;
    minute_hand.style.transform = `rotate(${min_rotation}deg)`;
    second_hand.style.transform = `rotate(${sec_rotation}deg)`;

    /*Digital Clock*/
    if (hour < 10) {
        hour = '0' + hour;
    }
    if (min < 10) {
        min = '0' + min;
    }
    if (sec < 10) {
        sec = '0' + sec;
    }
    digitalHours.innerHTML = hour;
    digitalMinutes.innerHTML = min;
    digitalSecondes.innerHTML = sec;
}, 1000);
