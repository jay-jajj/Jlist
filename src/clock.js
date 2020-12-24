const clockContainer = document.querySelector(".js-clock"),
    timeText = clockContainer.querySelector(".js-time"),
    dateText = clockContainer.querySelector(".js-date");

function getTime() {
    const time = new Date();
    const hour = time.getHours();
    const min = time.getMinutes();
    const sec = time.getSeconds();
    timeText.innerText = `${hour < 10 ? `0${hour}` : hour}:${min < 10 ? `0${min}` : min
        }:${sec < 10 ? `0${sec}` : sec}`;
}

function getDate() {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const currentdate = date.getDate();
    const day = dayChanger(date.getDay());
    dateText.innerText = `${year}/${month < 10 ? `0${month}` : month
        }/${currentdate}/${day}`;
}

function dayChanger(day) {
    switch (day) {
        case 1:
            return "Mon";
            break;
        case 2:
            return "Tue";
            break;
        case 3:
            return "Wed";
            break;
        case 4:
            return "Thu";
            break;
        case 5:
            return "Fri";
            break;
        case 6:
            return "Sat";
            break;
        case 0:
            return "Sun";
            break;
    }
}

function init() {
    getTime();
    getDate();
    //setInterval함수는 일정시간마다 실행시키는 함수 첫번째인자로는 실행시킬 함수, 두번째는 시간
    setInterval(getTime, 1000);
}

init();
