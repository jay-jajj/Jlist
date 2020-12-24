const body = document.querySelector("body"),
    btn = document.querySelector(".btn");

const IMG_NUM = 4;


const COLORS = ["#00C9C0", "#FF50A4", "#3C7EFF", "#000000"]

function getRendomNUM() {
    const num = Math.floor(Math.random() * IMG_NUM);
    return num;
}

function setThemeColor(num) {
    body.style.color = COLORS[num];
    btn.style.color = COLORS[num];
}

function init() {
    const randomNum = getRendomNUM();
    setThemeColor(randomNum);
}
init()