'use strict';
var gInterval;
var gTotalSeconds;
var gTime;
var isHint = false;
var gHints = [true, true, true];
var gImgIdx;
function startTime() {
    var minutesLabel = document.getElementById("minutes");
    var secondsLabel = document.getElementById("seconds");
    gTotalSeconds = 0;
    gInterval = setInterval(setTime, 1000);
    gTime = [secondsLabel, minutesLabel]

}
function setTime() {

    ++gTotalSeconds;
    gTime[0].innerHTML = pad(gTotalSeconds % 60);
    gTime[1].innerHTML = pad(parseInt(gTotalSeconds / 60));

}
function pad(val) {
    var valString = val + "";


    if (valString.length < 2) {
        return "0" + valString;
    } else {
        return valString;
    }

}
function markCell(elcell) {

    var dataSet = elcell.dataset;
    var posI = +dataSet.i;
    var posJ = +dataSet.j;
    var cell = gBoard[posI][posJ]

    if (!cell.isFlagged && !cell.isShown) {
        cell.isFlagged = true;
        elcell.innerText = "F";
        if (cell.isMine && !cell.isMineCounted) {
            cell.isMineCounted = true;
            gGame.markedMineCount++;
            console.log(gGame.markedMineCount);
        }

    } else if (cell.isFlagged) {
        cell.isFlagged = false;
        elcell.innerText = "O"
        if (cell.isMine && cell.isMineCounted) {
            cell.isMineCounted = false;
            gGame.markedMineCount--;
            console.log(gGame.markedMineCount);
        }


    }
    win()
}



function lose() {
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard[0].length; j++) {
            if (gBoard[i][j].isMine) {
                document.querySelector(`#cell-${i}-${j}`).innerText = ".!.";
            }
        }
    }
    clearInterval(gInterval)
    console.log("you have lost, game will restart in 5 sec");
    setTimeout(function () { innit(); }, 5000);
}
function win() {
    if (gGame.shownCount === ((gLevel.SIZE ** 2) - gLevel.MINES) && gGame.markedMineCount === gLevel.MINES) {
        alert("you win")
        console.log("winner");
        clearInterval(gInterval)
        innit()
    }
}

function buttonClicked(elButton) {
    var dataSet = elButton.dataset;
    var mines = +dataSet.mines;
    var size = +dataSet.size;
    console.log("elbutton size :", dataSet)
    gLevel.SIZE = size;
    gLevel.MINES = mines;
    clearInterval(gInterval)
    innit()
}
function openNegs(elcell) {
    var dataSet = elcell.dataset;
    var posI = +dataSet.i;
    var posJ = +dataSet.j;
    var cell = gBoard[posI][posJ]

    for (var i = posI - 1; i <= posI + 1; i++) {
        for (var j = posJ - 1; j <= posJ + 1; j++) {
            if (i < 0 || i >= gBoard.length || j < 0 || j >= gBoard.length) continue;
            if (!gBoard[i][j].isFlagged && !gBoard[i][j].isCounted) {
                gBoard[i][j].isShown = true;
                gGame.shownCount++;
                gBoard[i][j].isCounted = true;
                console.log(gGame.shownCount);
            }

            if (gBoard[i][j].isFlagged === false) {
                document.querySelector(`#cell-${i}-${j}`).innerText = gBoard[i][j].mineCountNeg;

            }
        }
    }
}
function hint(elimg) {
    var id = elimg.id;
    
   isHint = true;
    switch (id) {
        case 'img1': 
        gImgIdx = 0;

            break;
        case 'img2': 
        gImgIdx = 1;

            break;
        case 'img3': 
        gImgIdx =2;

            break;
      
    } 
    console.log(gImgIdx);
    document.querySelector(`#${id}`).style.borderColor = "yellow";
}
function hintAction(elcell) {
    var dataSet = elcell.dataset;
    var posI = +dataSet.i;
    var posJ = +dataSet.j;
    var cell = gBoard[posI][posJ]

    for (var i = posI - 1; i <= posI + 1; i++) {
        for (var j = posJ - 1; j <= posJ + 1; j++) {
            document.querySelector(`#cell-${i}-${j}`).innerText = gBoard[i][j].mineCountNeg
        }
    }

    setTimeout(function () {
        for (var i = posI - 1; i <= posI + 1; i++) {
            for (var j = posJ - 1; j <= posJ + 1; j++) {
                if (!gBoard[i][j].isShown) {
                    document.querySelector(`#cell-${i}-${j}`).innerText = "O";
                }

            }
        }
    }, 1000);

}

