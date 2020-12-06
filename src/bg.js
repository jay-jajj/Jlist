const body = document.querySelector("body"),
    btn = document.querySelector(".btn");

const IMG_NUM = 3;


const COLORS = ["#14FFDA", "#FF50A4", "#3C7EFF"]

function paintImage(imgNum = 1) {
    const img = document.createElement("img");
    img.src = `images/${imgNum + 1}.png`;
    img.classList.add("bgimg");
    body.appendChild(img);
}
function getRendomNUM() {
    const num = Math.floor(Math.random() * 3);
    return num;
}

function setThemeColor(num) {
    body.style.color = COLORS[num];
    btn.style.color = COLORS[num];
}

function init() {
    const randomNum = getRendomNUM();
    // paintImage(randomNum);
    setThemeColor(randomNum);
}
init()