'use strict'
var gBoard
var gIsWin
var gIsDarkMode = false
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
    gBoard = buildBoard()
    renderBoard(gBoard)
    setMinesNegsCount(gBoard)
    // randomizeMinesLocation(gBoard)
    var elSmileyBtn = document.querySelector('.smiley-state')
    elSmileyBtn.innerText = Normal
}

function buildBoard() {
    var board = []
    for (var i = 0; i < gLevel.SIZE; i++) {
        board[i] = []
        for (var j = 0; j < gLevel.SIZE; j++) {
            var cell = {
                minesAroundCount: 0,
                isShown: false,
                isMine: false,
                isMarked: true
            }
            board[i][j] = cell
        }
    }
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

            strHTML += `<td class="${className}" onclick="onCellClicked(this, ${i}, ${j})>${currCell}"</td>`
        }
        strHTML += '</tr>'
    }
    const elContainer = document.querySelector('.board')
    elContainer.innerHTML = strHTML
}

function chooseLevel(size) {
    gLevel = size
    onInit()
    // stopTimer()
    // clearTimer()
}

function onCellClicked(elCell, i, j) {
    const cell = gBoard[i][j]
    cell.isShown = true
    cell.isMark = false
    elCell.innerText = cell.minesAroundCount

    if (cell.isMine) {
        elCell.innerText = gMine
        gIsWin = false
    }
}

// function randomizeMinesLocation(board) {
//     for (var i = 0; i < board.length; i++) {
//         for (var j = 0; j < board[0].length; j++) {
//             var currCell = board[i][j]
//         }
//     }
//     return board

//     const cell = gBoard[i][j]
//     var randIdxI = getRandomInt(0, gBoard.length - 1)
//     var randIdxj = getRandomInt(0, gBoard[0].length - 1)

//     if (cell.isMine) {
//         elCell.innerText = gMine
//     }
// }



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

// function checkGameOver(isVictorious) {

// }

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

// function outOfDarkMode() {
//     var elBody = document.querySelector('body')
//     elBody.style.backgroundColor = 'beige'
//     elBody.style.color = 'black'
//     var elDarkModeBtn = document.querySelector('dark-mode')
//     elDarkModeBtn.style.backgroundColor = 'black'
//     elDarkModeBtn.style.color = 'white'
//     elDarkModeBtn.innerText = 'Dark Mode 🌙'
// }