const zoneList = document.querySelectorAll(".zone-item");
const modal = document.querySelector(".modal");
const modalTitle = document.querySelector(".modal-info-title");
const modalMoves = document.querySelector(".modal-info-moves");
const historyBtn = document.querySelector(".modal-info-history");
const historyBlock = document.querySelector(".modal-history");
const historyList = document.querySelector(".modal-history-list");
const audio = document.querySelector('.audio');

let winSide;
let filledCount = 0;
let resultsList = [];
let resultObj;

getStorage();

function getStorage() {
    if (localStorage.resultsList) {
        resultsList = JSON.parse(localStorage.resultsList);
    }
}

function saveStorage(winSide) {
    resultObj = {
        'win': winSide,
        'moves': Math.ceil(filledCount / 2),
        'time': new Date().toLocaleString()
    }
    resultsList.push(resultObj);
    if (resultsList.length > 10) {
        resultsList.shift();
    }

    localStorage.resultsList = JSON.stringify(resultsList);
}



zoneList.forEach(function(item) {
    item.addEventListener("click", myTurn);
})

function myTurn(event) {
    if (event.target.classList.contains("filled")) {
        event.target.removeEventListener("click", myTurn);
        return;
    }
    audio.currentTime = 0;
    audio.play();
    event.target.firstChild.classList.add("cross");
    event.target.firstChild.classList.add("filled");
    event.target.classList.add("filled");
    filledCount += 1;
    if (checkWin()) {
        zoneList.forEach(function(item) {
            item.removeEventListener("click", myTurn);
        })
        setTimeout(() => win("Crosses"), 700);
    } else if (filledCount < 9) {
        aiTurn();
    } else {
        setTimeout(() => draw(), 700);
    }
}

function aiTurn() {
    let cellNumber = getRandomInt(0, 8);
    if (zoneList[cellNumber].classList.contains("filled")) {
        aiTurn();
    } else {
        zoneList[cellNumber].firstChild.classList.add("circle");
        zoneList[cellNumber].firstChild.classList.add("filled");
        zoneList[cellNumber].classList.add("filled");
        filledCount += 1;
        if (checkWin()) {
            zoneList.forEach(function(item) {
                item.removeEventListener("click", myTurn);
            })
            setTimeout(() => win("Circles"), 700);
        }
    }
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function win(winSide) {
    audio.src = `./sounds/${winSide}.mp3`;
    audio.play();
    modal.style.display = "block";
    modalTitle.innerHTML = `${winSide} won!`;
    modalMoves.innerHTML = `Number of moves: ${Math.ceil(filledCount / 2)}`;
    
    saveStorage(winSide);
}

function draw() {
    zoneList.forEach(function(item) {
        item.removeEventListener("click", myTurn);
    })
    audio.src = `./sounds/draw.mp3`;
    audio.play();
    modal.style.display = "block";
    modalTitle.innerHTML = `Draw!`;
    modalMoves.innerHTML = ``;

    saveStorage("Draw");
}

function checkWin() {
    if (zoneList[0].firstChild.classList.contains("cross") && zoneList[1].firstChild.classList.contains("cross") && zoneList[2].firstChild.classList.contains("cross")) {
        console.log("cross win");
        zoneList[0].style.backgroundColor = "red";
        zoneList[1].style.backgroundColor = "red";
        zoneList[2].style.backgroundColor = "red";
        return true;
    } else if (zoneList[3].firstChild.classList.contains("cross") && zoneList[4].firstChild.classList.contains("cross") && zoneList[5].firstChild.classList.contains("cross")) {
        console.log("cross win");
        zoneList[3].style.backgroundColor = "red";
        zoneList[4].style.backgroundColor = "red";
        zoneList[5].style.backgroundColor = "red";
        return true;
    } else if (zoneList[6].firstChild.classList.contains("cross") && zoneList[7].firstChild.classList.contains("cross") && zoneList[8].firstChild.classList.contains("cross")) {
        console.log("cross win");
        zoneList[6].style.backgroundColor = "red";
        zoneList[7].style.backgroundColor = "red";
        zoneList[8].style.backgroundColor = "red";
        return true;
    } else if (zoneList[0].firstChild.classList.contains("cross") && zoneList[3].firstChild.classList.contains("cross") && zoneList[6].firstChild.classList.contains("cross")) {
        console.log("cross win");
        zoneList[0].style.backgroundColor = "red";
        zoneList[3].style.backgroundColor = "red";
        zoneList[6].style.backgroundColor = "red";
        return true;
    } else if (zoneList[1].firstChild.classList.contains("cross") && zoneList[4].firstChild.classList.contains("cross") && zoneList[7].firstChild.classList.contains("cross")) {
        console.log("cross win");
        zoneList[1].style.backgroundColor = "red";
        zoneList[4].style.backgroundColor = "red";
        zoneList[7].style.backgroundColor = "red";
        return true;
    } else if (zoneList[2].firstChild.classList.contains("cross") && zoneList[5].firstChild.classList.contains("cross") && zoneList[8].firstChild.classList.contains("cross")) {
        console.log("cross win");
        zoneList[2].style.backgroundColor = "red";
        zoneList[5].style.backgroundColor = "red";
        zoneList[8].style.backgroundColor = "red";
        return true;
    } else if (zoneList[0].firstChild.classList.contains("cross") && zoneList[4].firstChild.classList.contains("cross") && zoneList[8].firstChild.classList.contains("cross")) {
        console.log("cross win");
        zoneList[0].style.backgroundColor = "red";
        zoneList[4].style.backgroundColor = "red";
        zoneList[8].style.backgroundColor = "red";
        return true;
    } else if (zoneList[2].firstChild.classList.contains("cross") && zoneList[4].firstChild.classList.contains("cross") && zoneList[6].firstChild.classList.contains("cross")) {
        console.log("cross win");
        zoneList[2].style.backgroundColor = "red";
        zoneList[4].style.backgroundColor = "red";
        zoneList[6].style.backgroundColor = "red";
        return true;
    } else if (zoneList[0].firstChild.classList.contains("circle") && zoneList[1].firstChild.classList.contains("circle") && zoneList[2].firstChild.classList.contains("circle")) {
        console.log("circle win");
        zoneList[0].style.backgroundColor = "red";
        zoneList[1].style.backgroundColor = "red";
        zoneList[2].style.backgroundColor = "red";
        return true;
    } else if (zoneList[3].firstChild.classList.contains("circle") && zoneList[4].firstChild.classList.contains("circle") && zoneList[5].firstChild.classList.contains("circle")) {
        console.log("circle win");
        zoneList[3].style.backgroundColor = "red";
        zoneList[4].style.backgroundColor = "red";
        zoneList[5].style.backgroundColor = "red";
        return true;
    } else if (zoneList[6].firstChild.classList.contains("circle") && zoneList[7].firstChild.classList.contains("circle") && zoneList[8].firstChild.classList.contains("circle")) {
        console.log("circle win");
        zoneList[6].style.backgroundColor = "red";
        zoneList[7].style.backgroundColor = "red";
        zoneList[8].style.backgroundColor = "red";
        return true;
    } else if (zoneList[0].firstChild.classList.contains("circle") && zoneList[3].firstChild.classList.contains("circle") && zoneList[6].firstChild.classList.contains("circle")) {
        console.log("circle win");
        zoneList[0].style.backgroundColor = "red";
        zoneList[3].style.backgroundColor = "red";
        zoneList[6].style.backgroundColor = "red";
        return true;
    } else if (zoneList[1].firstChild.classList.contains("circle") && zoneList[4].firstChild.classList.contains("circle") && zoneList[7].firstChild.classList.contains("circle")) {
        console.log("circle win");
        zoneList[1].style.backgroundColor = "red";
        zoneList[4].style.backgroundColor = "red";
        zoneList[7].style.backgroundColor = "red";
        return true;
    } else if (zoneList[2].firstChild.classList.contains("circle") && zoneList[5].firstChild.classList.contains("circle") && zoneList[8].firstChild.classList.contains("circle")) {
        console.log("circle win");
        zoneList[2].style.backgroundColor = "red";
        zoneList[5].style.backgroundColor = "red";
        zoneList[8].style.backgroundColor = "red";
        return true;
    } else if (zoneList[0].firstChild.classList.contains("circle") && zoneList[4].firstChild.classList.contains("circle") && zoneList[8].firstChild.classList.contains("circle")) {
        console.log("circle win");
        zoneList[0].style.backgroundColor = "red";
        zoneList[4].style.backgroundColor = "red";
        zoneList[8].style.backgroundColor = "red";
        return true;
    } else if (zoneList[2].firstChild.classList.contains("circle") && zoneList[4].firstChild.classList.contains("circle") && zoneList[6].firstChild.classList.contains("circle")) {
        console.log("circle win");
        zoneList[2].style.backgroundColor = "red";
        zoneList[4].style.backgroundColor = "red";
        zoneList[6].style.backgroundColor = "red";
        return true;
    } else {
        return false;
    }
}

historyBtn.addEventListener("click", viewHistory);

function viewHistory() {
    historyBlock.style.display = "block";
    historyList.textContent = "";
    resultsList.forEach(function(item) {
        if(item.win == "Draw") {
            historyList.insertAdjacentHTML('afterbegin', `<div class="modal-history-item">Draw, ${item.time}</div>`);
        } else {
            historyList.insertAdjacentHTML('afterbegin', `<div class="modal-history-item">${item.win} wins, moves: ${item.moves}, ${item.time}</div>`);
        }
    })
}