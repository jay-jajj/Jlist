const logbox = document.querySelector(".js-logbox"),
    todoForm = document.querySelector(".js-todoform"),
    input = todoForm.querySelector("input"),
    divPending = document.querySelector("div.js-pending"),
    pendingList = divPending.querySelector("ul"),
    divFinished = document.querySelector("div.js-finished"),
    finishedList = divFinished.querySelector("ul"),
    listBtn = document.querySelector(".btn");

const SHOWING_CL = "showing",
    BTN_CL = "btn";

const pending = {
    imo: "✅",
    btnHandle: handleFinish,
    ul: pendingList,
    array: [],
    name_LS: "PENDING"
},
    finished = {
        imo: "⏪",
        btnHandle: handleReturn,
        ul: finishedList,
        array: [],
        name_LS: "FINISHED"
    };

function paintList(text, list) {
    const li = document.createElement("li"),
        btn1 = document.createElement("span"),
        btn2 = document.createElement("span");
    const newId = list.array.length + 1;
    li.innerText = text;
    li.id = newId;
    // btn1.classList.add(BTN_CL);
    // btn2.classList.add(BTN_CL);
    btn1.innerHTML = "❌";
    btn1.addEventListener("click", function (event) {
        handleDelete(event, list);
    });
    btn2.innerHTML = list.imo;
    btn2.addEventListener("click", function (event) {
        list.btnHandle(event, list, text);
    });
    li.appendChild(btn1);
    li.appendChild(btn2);
    list.ul.appendChild(li);
    const obj = {
        text,
        id: newId
    };
    list.array.push(obj);
    saveLocalStorage(list.name_LS, list.array);
}
//리스트 삭제시
function handleDelete(event, list) {
    const btn = event.target,
        li = btn.parentElement;
    const cleanArry = list.array.filter(function (toDo) {
        return toDo.id !== parseInt(li.id)
    });
    list.array = cleanArry;
    li.remove()
    saveLocalStorage(list.name_LS, list.array)

}
//리스트 완료시
function handleFinish(event, list, text) {
    paintList(text, finished);
    handleDelete(event, list);
}
//완료 목록에서 할일 목록으로
function handleReturn(event, list, text) {
    paintList(text, pending);
    handleDelete(event, list);
}

function saveLocalStorage(name, array) {
    //Json = javascript object notation (notation:표기법)
    //Json 형식으로 변환
    const json = JSON.stringify(array);
    localStorage.setItem(name, json);
}
function loadLocalStorage(list) {
    const locals = localStorage.getItem(list.name_LS);
    if (locals !== null) {
        //Json 파일을 자바스크립트 객체로 변환
        const parsedLocals = JSON.parse(locals);
        parsedLocals.forEach(function (obj) {
            paintList(obj.text, list);
        });
    }
}


function handleSubmit(event) {
    // 기존의 기능을 제거(이경우는 새로고침을 없애기 위함)
    event.preventDefault();
    const value = input.value;
    //값을 받아서 함수실행
    paintList(value, pending);
    // 입력창 초기화
    input.value = "";
}

function listMode(num = 1) {
    if (num === 1) {
        divPending.classList.add(SHOWING_CL);
        divFinished.classList.remove(SHOWING_CL);
    } else if (num === 2) {
        divPending.classList.remove(SHOWING_CL);
        divFinished.classList.add(SHOWING_CL);
    } else {

    }

}

let mode = 1;
function init() {
    listMode();
    listBtn.addEventListener("click", function (event) {
        if (mode > 1) {
            mode = 1;
        } else {
            mode += 1;
        }
        console.log(mode)
        listMode(mode)
    });
    loadLocalStorage(pending);
    loadLocalStorage(finished);
    todoForm.addEventListener("submit", handleSubmit);

}

init();