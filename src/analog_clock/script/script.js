"use strict";

const area = document.getElementById("clockArea");
const clock = document.getElementById("clock");
const numbers = document.getElementById("numbers");
const hour_hand = document.getElementById("hour");
const minute_hand = document.getElementById("minute");
const second_hand = document.getElementById("second");
displayClock();

function displayClock() {
    let height = window.innerHeight;
    let width = window.innerWidth;
    let diameter = Math.min(height, width);
    let clockDiameter = diameter * 0.9;
    clock.style.width = clockDiameter + "px";
    clock.style.height = clockDiameter + "px";
    while (numbers.firstChild) {
        numbers.removeChild(numbers.firstChild);
    }
    for (let i = 1; i <= 12; i++) {
        const number = document.createElement("div");
        number.className = "number";
        number.innerText = i;

        const rotation = i * 30;
        const rotationRad = (rotation - 90) * (Math.PI / 180);

        const radius = clock.offsetWidth / 2.3; //Distance des nombres par rapport au centre
        const x = clock.offsetWidth / 2 + radius * Math.cos(rotationRad);
        const y = clock.offsetHeight / 2 + radius * Math.sin(rotationRad);

        number.style.transform = `translate(-50%, -50%) translate(${x}px, ${y}px)`;

        numbers.appendChild(number);
    }
};

setInterval(() => {
    displayClock();
    let d = new Date();
    let hour = d.getHours();
    let min = d.getMinutes();
    let sec = d.getSeconds();
    let hr_rotation = 30 * hour + min / 2;
    let min_rotation = 6 * min;
    let sec_rotation = 6 * sec;

    hour_hand.style.transform = `rotate(${hr_rotation}deg)`;
    minute_hand.style.transform = `rotate(${min_rotation}deg)`;
    second_hand.style.transform = `rotate(${sec_rotation}deg)`;
}, 1000);