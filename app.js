let gameseq = [];
let userseq = [];

let btns = ["red", "blue", "yellow", "green"];

let start = false;
let level = 0;
let body = document.querySelector("body");
let h2 = document.querySelector("h2");
let allBtn = document.querySelectorAll(".btn");

allBtn.forEach(btn => btn.classList.add("disabled"));

// Unified start function
function startGame() {
    if (start === false) {
        start = true;
        allBtn.forEach(btn => btn.classList.remove("disabled"));
        levelup();
    }
}

// Start on keypress (desktop)
body.addEventListener("keypress", startGame);

// Start on touch/click (mobile)
body.addEventListener("click", startGame);

// Flash functions
function flash(btn) {
    btn.classList.add("flash");
    setTimeout(function () {
        btn.classList.remove("flash");
    }, 300);
}

function userFlash(btn) {
    btn.classList.add("blackflash");
    setTimeout(function () {
        btn.classList.remove("blackflash");
    }, 300);
}

// Go to next level
function levelup() {
    userseq = [];
    level++;
    h2.innerHTML = `Level ${level}`;
    let random = Math.floor(Math.random() * 4); // Fixed bug: Math.random()*3 → should be *4
    let randColor = btns[random];
    let ranBtn = document.querySelector(`.${randColor}`);
    gameseq.push(randColor);
    flash(ranBtn);
}

// Check answer
function checkAns(idx) {
    if (userseq[idx] === gameseq[idx]) {
        if (userseq.length === gameseq.length) {
            setTimeout(levelup, 1000);
        }
    } else {
        h2.innerHTML = `Game Over! Your Score is: ${gameseq.length - 1}<br>Tap or press any key to restart`;
        body.style.backgroundColor = "red";

        setTimeout(() => {
            body.style.backgroundColor = "white";
            allBtn.forEach(btn => btn.classList.add("disabled"));
            reset();
        }, 1000); // Delay so user sees the score
    }
}

// Button press handler
function btnPress() {
    if (!start) return;
    let btn = this;
    flash(btn);
    userFlash(btn);
    let usercolor = btn.getAttribute("id");
    userseq.push(usercolor);
    checkAns(userseq.length - 1);
}

// Add click listeners to buttons
for (let b of allBtn) {
    b.addEventListener("click", btnPress);
}

// Reset game
function reset() {
    start = false;
    gameseq = [];
    userseq = [];
    level = 0;
}
