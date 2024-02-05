"use strict";
const home_button = document.getElementById("home-btn");
const cookie = document.getElementById("cookie");
const displayerCookies = document.getElementById("displayerCookies");
const clicUpgrader = document.getElementById("upgradeButton");
const multipliers = document.getElementsByClassName("multiplier");
const generatorsName = ["Maman", "Mamie", "Pâtissier", "Biscuiterie", "Arbre à cookie"];

let cookies = 0;
let clicUpgrade = 1;
let clicUpgradeCost = 5;
let autoGenerating = 0;
let multiplier = 1;

let generatorsLevel = [0, 0, 0, 0, 0];
let generatorsCost = [50, 200, 1000, 5000, 10000];
let generatorsGen = [0.2, 1, 5, 100, 1000];

function setupEventListeners() {
    home_button.addEventListener("click", handleHomeBtn)
    cookie.addEventListener("click", handleClick);
    clicUpgrader.addEventListener("click", handleClicUpgradeClick);
    for (let i = 0; i < multipliers.length; i++) {
        multipliers[i].addEventListener("click", handleMultiplierClick);
    }

}

displayCookies();
displayClicUpgradeButton();
displayGenerators();

function handleHomeBtn(event) {
    window.location.href = "../../";
}

function handleClick(event) { //Clic sur le cookie
    cookies += clicUpgrade;

    var mouseX = event.clientX;
    var mouseY = event.clientY;

    let showCookie = document.createElement("p");
    showCookie.textContent = "+ " + clicUpgrade;
    showCookie.id = 'showCookie';
    showCookie.style.left = mouseX - 25 + "px";
    showCookie.style.top = mouseY - 40 + "px";

    setTimeout(function () {
        showCookie.classList.add('hidden');
    }, 10);
    let clickerArea = document.getElementById("clicker");
    clickerArea.appendChild(showCookie);
    setTimeout(function () {
        clickerArea.removeChild(showCookie);
    }, 2000);
}

function handleClicUpgradeClick() { //Clic sur le bouton d'amélioration du clic
    if (cookies >= clicUpgradeCost) { //Achat du multiplicateur
        cookies -= clicUpgradeCost;
        clicUpgrade += 1;
        clicUpgradeCost *= 2;
        displayClicUpgradeButton();
    }
}

function handleMultiplierClick(event) { //Clic sur les boutons de multiplicateurs d'achat
    let mult = event.currentTarget;
    let mults = mult.parentNode.children;
    if (mult.dataset.pressed == "true") {
        mult.dataset.pressed = "false";
        mult.style.backgroundColor = "rgb(185, 160, 121)";
        multiplier = 1;
    } else {
        for (let i = 0; i < mults.length; i++) {
            mults[i].dataset.pressed = "false";
            mults[i].style.backgroundColor = "rgb(185, 160, 121)";
        }
        mult.dataset.pressed = "true";
        mult.style.backgroundColor = "rgb(145, 111, 67)";
        multiplier = mult.dataset.value;
        updateGenerators();
    }
}

function handleGeneratorClick(event) { //Clic sur un générateur
    let generateur = event.currentTarget;
    let nomGenerateur = generateur.dataset.name;
    let index = generatorsName.indexOf(nomGenerateur);
    let cost = calculateCost(multiplier, index);
    if (cookies >= cost) {
        generatorsLevel[index] += 1 * multiplier;
        generatorsCost[index] *= 2 * multiplier;
        autoGenerating += generatorsGen[index] * multiplier;
        cookies -= cost;
        displayGenerators();
    }
}

function handleGeneratorHover(event) { //Hover sur un générateur
    let generatorDetails = document.getElementById("generatorDetails");
    let targetGenerator = event.target;
    if (!event.target.dataset.name) {
        targetGenerator = event.target.parentNode;
    }
    let generatorIndex = generatorsName.indexOf(targetGenerator.dataset.name);
    let generatorName = targetGenerator.dataset.name
    let generating = generatorsGen[generatorIndex] * generatorsLevel[generatorIndex];
    let pourcentGenerating = autoGenerating != 0 ? Math.round((generating / autoGenerating) * 10000) / 100 : 0;
    generatorDetails.innerHTML = `<p>Chaque ` + generatorName + " génère " + generatorsGen[generatorIndex] + ` cookies par seconde.</p><br>
        <p>L'ensemble des ` + generatorName + ` génère ${Math.round(generating * 100) / 100} cookies par seconde.</p><br>
        <p>Soit ` + pourcentGenerating + `% des cps totaux</p>`;
    var rect = targetGenerator.getBoundingClientRect();
    generatorDetails.style.inset = "" + rect.top + "px auto auto " + (rect.left - 400) + "px";
    generatorDetails.style.display = 'block';
}

function handleGeneratorLeave() { //Sortie du hover sur un générateur
    let generatorDetails = document.getElementById("generatorDetails");
    generatorDetails.style.display = 'none';
}

function displayCookies() {
    displayerCookies.innerHTML = `<p style='text-align: center'>${numeral(Math.round(cookies * 100) / 100).format('0.00a')} cookies !</p><p style='text-align: center'>${numeral(Math.round(autoGenerating * 100) / 100).format('0.00a')} cps</p>`;
}

function displayClicUpgradeButton() {
    let displayerClicUpgradeLevel = document.getElementById("upgradeLevel");
    let displayerClicUpgradeCost = document.getElementById("upgradeCost");
    displayerClicUpgradeLevel.innerHTML = "Niveau du clic : " + clicUpgrade;
    displayerClicUpgradeCost.innerHTML = numeral(clicUpgradeCost).format('0.00a') + " cookies";
}

function updateClicUpgradeButton() {
    const clicUpgradeButton = document.getElementById("upgradeButton");
    if (cookies < clicUpgradeCost) {
        clicUpgradeButton.style.backgroundColor = "rgb(198, 152, 67)";
    } else {
        clicUpgradeButton.style.backgroundColor = null;
    }
}

function displayGenerators() {
    let generatorsDiv = document.getElementById("generators");
    while (generatorsDiv.firstChild) {
        generatorsDiv.removeChild(generatorsDiv.firstChild);
    }
    for (let i = 0; i < generatorsName.length; i++) {
        let generatorItem = document.createElement("div");
        let generatorName = document.createElement("p");
        let generatorCost = document.createElement("div");
        let generatorLevel = document.createElement("div");

        generatorItem.classList += "generator";
        generatorItem.dataset.name = generatorsName[i];
        generatorItem.addEventListener("click", handleGeneratorClick);
        generatorItem.addEventListener("mouseenter", handleGeneratorHover);
        generatorItem.addEventListener("mouseleave", handleGeneratorLeave);

        generatorName.style.marginTop = "12px";
        generatorName.style.marginBottom = "6px";
        generatorLevel.style.width = "100%"; //Force le level à prendre toute la largeur pour le passer en dessous
        generatorLevel.style.marginBottom = "5px";
        generatorCost.style.alignItems = "bottom";

        generatorName.innerHTML = generatorsName[i];
        generatorCost.innerHTML = "<p>" + generatorsCost[i] + " cookies</p>";
        generatorLevel.innerHTML = "quantité : " + generatorsLevel[i];
        generatorItem.appendChild(generatorName);
        generatorItem.appendChild(generatorCost);
        generatorItem.appendChild(generatorLevel);
        generatorsDiv.appendChild(generatorItem);
    }
    updateGenerators();
}

function updateGenerators() {
    let generatorsDiv = document.getElementById("generators");
    let generators = generatorsDiv.children;
    for (let i = 0; i < generators.length; i++) {
        let generator = generators[i].children;

        //Gestion du coût d'amélioration
        let generatorCost = generator[1]; //Accède à la balise HTML correspondante au coût de chaque générateur
        let multipleCost = calculateCost(multiplier, i);
        generatorCost.innerHTML = numeral(multipleCost).format('0.00a') + " cookies";

        //Gestion du background color selon la possibilité de l'achat
        if (cookies < multipleCost) {
            generators[i].style.backgroundColor = "rgb(198, 152, 67)";
        } else {
            generators[i].style.backgroundColor = null;
        }
    }
}

function calculateCost(quantite, generatorIndex) { //Calcule le prix d'achat d'un générateur avec un achat multiple
    const cout = generatorsCost[generatorIndex];
    const growthRate = 2;
    const coutTotal = cout * ((Math.pow(growthRate, quantite) - 1) / (growthRate - 1));
    return coutTotal;
}

function gameLoop() {
    displayCookies();
    updateClicUpgradeButton();
    updateGenerators();
    requestAnimationFrame(gameLoop);
}

setInterval(function () {
    cookies += autoGenerating / 10;
}, 100);

gameLoop();
setupEventListeners();