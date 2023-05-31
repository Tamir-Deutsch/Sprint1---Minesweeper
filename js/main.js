'use strict'
var gBoard
var gIsWin
var gIsDarkMode = false
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

}

function buildBoard() {
    var board = []
    for (var i = 0; i < gLevel.SIZE; i++) {
        board[i] = []
        for (var j = 0; j < gLevel.SIZE; j++) {
            var cell = {
                minesAroundCount: 4,
                isShown: false,
                isMine: false,
                isMarked: true
            }
            board[i][j] = cell
        }
    }
    // Place the mines 
    board[0][3] = gMine
    board[2][2] = gMine

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

            strHTML += `<td class="${className}">${currCell}</td>`
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

// function onCellClicked(elCell, i, j) {

// }

function setMinesNegsCount(board) {
    MinesNegsCount(board,)

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

// function checkGameOver() {

// }

function onDarkMode() {
    gIsDarkMode = true
    var elBody = document.querySelector('body')
    elBody.style.backgroundColor = '#292626'
    elBody.style.color = 'white'
    var elDarkModeBtn = document.querySelector('dark-mode')
    elDarkModeBtn.style.backgroundColor = 'whitesmoke'
    elDarkModeBtn.style.color = 'black'
    elDarkModeBtn.innerText = 'Bright Mode ☀'
    // outOFDarkMode()
}

// function outOFDarkMode() {
//     var elBody = document.querySelector('body')
//     elBody.style.backgroundColor = 'beige'
//     elBody.style.color = 'black'
//     var elDarkModeBtn = document.querySelector('dark-mode')
//     elDarkModeBtn.style.backgroundColor = 'black'
//     elDarkModeBtn.style.color = 'white'
//     elDarkModeBtn.innerText = 'Dark Mode 🌙'
// }