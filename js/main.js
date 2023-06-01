'use strict'
var gBoard
var gIsWin
var gIsDarkMode = false
var gSecs = 0
var gTens = 0
var gFirstClick = false
var gInterval

const Normal = '😀'
const WIN = '😎'
const LOSE = '🤯'
const gMine = '💣'
const gFlag = '🚩'
var gLevel = {
    SIZE: 4,
    MINES: 2
}

var gGame = {
    isOn: false,
    shownCount: 0,
    markedCount: 0,
    secsPassed: 0
}

function onInit() {
    gInterval = setInterval(setTime, 1000)
    gBoard = buildBoard()
    renderBoard(gBoard)
    setMinesNegsCount(gBoard)
    // randomizeMinesLocation(gBoard)
    var elSmileyBtn = document.querySelector('.smiley-state')
    elSmileyBtn.innerText = Normal
}

function buildBoard() {
    var board = []
    console.log('gLevel', gLevel)
    for (var i = 0; i < gLevel.SIZE; i++) {
        board[i] = []
        for (var j = 0; j < gLevel.SIZE; j++) {
            var cell = {
                minesAroundCount: 0,
                isShown: false,
                isMine: false,
                isMarked: false,
                // location: randMineLocationIdx()
            }
            board[i][j] = cell
        }
    }
    // addMines()
    // setMinesNegsCount()
    // Place the mines 
    board[0][3].isMine = true
    board[2][2].isMine = true

    console.table(board)
    return board
}

function renderBoard(board) {
    var strHTML = ''
    for (var i = 0; i < board.length; i++) {
        strHTML += '<tr>'
        for (var j = 0; j < board[0].length; j++) {

            const currCell = board[i][j].minesAroundCount
            const className = `cell cell-${i}-${j}`

            strHTML += `<td class="${className}" onclick="onCellClicked(this, ${i}, ${j}, event)>${currCell}"</td>`
        }
        strHTML += '</tr>'
    }
    const elContainer = document.querySelector('.board')
    elContainer.innerHTML = strHTML
}

function chooseLevel(boardSizeAndMines) {//boardSizeAndMines = {size, mines}
    console.log('boardSizeAndMines', boardSizeAndMines)
    gLevel = boardSizeAndMines
    console.log('gLevel', gLevel)
    // addMines(gLevel)
    onInit()
}

// function addMines(gLevel) {
//     const emptyPos = getEmptyPos(gLevel)
//     if (!emptyPos) return

//     gBoard[emptyPos.i][emptyPos.j].isMine = true
// }


// function getEmptyPos(gLevel) {
//     const emptyPoss = []
//     console.log('gLevel.MINES',gLevel.MINES)
//     for (var i = 0; i < gLevel.MINES; i++) {
//         for (var j = 0; j < gLevel.MINES; j++) {
//             emptyPoss.push({ i, j }) // {i:1,j:3}
//         }
//     }
//     console.log('emptyPoss',emptyPoss)
//     var randIdx = getRandomInt(0, emptyPoss.length)
//     return emptyPoss[randIdx]
// }


// function getRandomPos(gLevel) {//{size, mines}
//     var rowIdx, colIdx
//     var emptyPositions = []

//     if (gLevel.MINES <= 0) {
//         return null
//     }
//     for (var i = 0; i < gLevel.MINES; i++) {

//         rowIdx = getRandomInt(0, gLevel.SIZE)//gelvel.size
//         colIdx = getRandomInt(0, gLevel.SIZE)//glevel.size
//         emptyPositions.push({ i: rowIdx, j: colIdx })
//         // return as an obj
//     }
//     return emptyPositions
//     // return as an array of obj
// }

// function addMines(gLevel) {
//     console.log('numOfMines', gLevel.MINES)//glevel.mines
//     var mines = getRandomPos(gLevel)//glevel{size, mines}
//     console.log('mines', mines)
//     for (var r = 0; r < mines.length; r++) {
//         var minePos = mines[r]
//         console.log('minePos', minePos)
//         console.log('gBoard', gBoard)
//         gBoard[minePos.i][minePos.j].isMine = true
//     }
// }


// function firstClick(elcell, rowIdx, colIdx) {
//     console.log('first click')
//     // console.log(rowIdx, colIdx)
//     setMines(rowIdx, colIdx)
//     renderBoard(gBoard)
//     elcell.innerText = gBoard[rowIdx][colIdx].str
// }

function onCellClicked(elCell, i, j, ev) {
    // if (!gFirstClick) {
    //     firstClick(elCell, i, j)
    //     gFirstClick = true
    // }

    gGame.isOn = true
    gGame.shownCount++


    const cell = gBoard[i][j]
    cell.isShown = true
    elCell.innerText = cell.minesAroundCount

    if (cell.isMine) {
        elCell.innerText = gMine
        gIsWin = false
    }

}

function setTime() {
    gTens++
    if (gTens <= 9) {
        document.querySelector('.clock').innerText = '0' + gTens
    }
    if (gTens > 9) {
        document.querySelector('.clock').innerText = gTens
    }
    if (gTens > 99) {
        gSecs++
        document.querySelector('.clock').innerText = '0' + gSecs
        gTens = 0
        document.querySelector('.clock').innerText = '0' + 0
    }
    if (gSecs > 9) {
        document.querySelector('.clock').innerText = gSecs
    }
}





function setMinesNegsCount(board) {
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[0].length; j++) {
            var currCell = board[i][j]
            if (!currCell.isMine) {
                currCell.minesAroundCount = MinesNegsCount(board, i, j)
            }
        }
    }
    return board
}

function MinesNegsCount(board, rowIdx, colIdx) {
    var minesCount = 0
    for (var i = rowIdx - 1; i <= rowIdx + 1; i++) {
        if (i < 0 || i >= board.length) continue
        for (var j = colIdx - 1; j <= colIdx + 1; j++) {
            if (i === rowIdx && j === colIdx) continue
            if (j < 0 || j >= board[0].length) continue
            var currCell = board[i][j]
            if (currCell.isMine) minesCount++
        }
    }
    return minesCount
}

// function expandShown(board, elCell, i, j) {

// }

// function onCellMarked(elCell) {

// }

function checkGameOver(isWin) {
if (gIsWin) {
    var elMsg = document.querySelector('.user-msg')
    elMsg.innerText = 'You Win!'
} else {
    elMsg.innerText = 'You Win!'
}
}

function onRestart() {
    onInit()
}

function onDarkMode() {
    gIsDarkMode = true
    var elBody = document.querySelector('body')
    elBody.style.backgroundColor = '#292626'
    elBody.style.color = 'white'
    var elDarkModeBtn = document.querySelector('dark-mode')
    elDarkModeBtn.style.backgroundColor = 'whitesmoke'
    elDarkModeBtn.style.color = 'black'
    elDarkModeBtn.innerText = 'Bright Mode ☀'
    // outOfDarkMode()
}

// function randMineLocationIdx() {
//     var randIdxI = getRandomIntInclusive(1, gBoard.length - 1)
//     var randIdxj = getRandomIntInclusive(1, gBoard[0].length - 1)
//     var RandMindeLocation = {
//         i: randIdxI,
//         j: randIdxj
//     }
//     return RandMindeLocation
// }

// function outOfDarkMode() {
//     var elBody = document.querySelector('body')
//     elBody.style.backgroundColor = 'beige'
//     elBody.style.color = 'black'
//     var elDarkModeBtn = document.querySelector('dark-mode')
//     elDarkModeBtn.style.backgroundColor = 'black'
//     elDarkModeBtn.style.color = 'white'
//     elDarkModeBtn.innerText = 'Dark Mode 🌙'
// }