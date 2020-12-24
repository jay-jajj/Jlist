const greetingbox = document.querySelector(".js-greetingbox"),
    nameForm = greetingbox.querySelector("form"),
    greetinginput = greetingbox.querySelector(".greetinginput"),
    greeting = greetingbox.querySelector(".greeting");
//로컬 스토리지 이름과 클래스 네임
const USER_LS = "currentUser",
    NAMEFORM_CL = "nameForm",
    SHOW_CL = "showing";

function getTime() {
    const date = new Date();
    const hours = parseInt(date.getHours());
    console.log(hours);
    let time = "Welcome!";
    if (hours < 12) {
        time = "Good morning!";
    } else if (hours >= 12 && hours <= 18) {
        time = "Good afternoon!";
    } else {
        time = "Good evening!";
    }
    return time;
}
//로컬 스토리지에 이름을저장
function saveName(name) {
    //로컬스토리지는 브라우저가 기억하는 공간이다.
    //localStorage.setItem은 저장할 이름과 데이터를 넣어줘야 한다.
    localStorage.setItem(USER_LS, name);
}

function handleSubmit(event) {
    //기본 동작을 막는 단계 기본적인 동작을 막아버린다.
    event.preventDefault();
    const userName = greetinginput.value;
    paintGreeting(userName);
    saveName(userName);
}

function askForname() {
    //이벤트 리스너 달기 ("이벤트 종류", 함수) 함수 뒤에 괄호를 붙이면 바로 실행하라는것임 그래서 붙이면 안됨.
    nameForm.classList.add(SHOW_CL);
    nameForm.addEventListener("submit", handleSubmit);
}

function paintGreeting(name) {
    let greet = getTime();
    if (greet === undefined) {
        greet = "Welcome!";
    }
    nameForm.classList.remove(SHOW_CL);
    greeting.classList.add(SHOW_CL);
    greeting.innerText = `${greet}  ${name}`;


}

function loadName() {
    currentUser = localStorage.getItem(USER_LS);
    if (currentUser == null) {
        askForname();
    } else {
        paintGreeting(currentUser);
    }
}

function init() {
    loadName();
}

init();
