let boxes = document.querySelectorAll(".box");
let turn = "X";
let isGameOver = false;
let results = document.getElementById("results");
let xScore = 0;
let oScore = 0;

const winCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

document.querySelectorAll('.turn-box').forEach(box => {
    box.addEventListener('click', () => {
        turn = box.innerText;
        document.getElementById('x').style.backgroundColor = turn === 'X' ? '#FF2E63' : '#252A34';
        document.getElementById('o').style.backgroundColor = turn === 'O' ? '#08D9D6' : '#252A34';
    });
});

boxes.forEach(e => {
    e.innerHTML = "";
    e.addEventListener("click", () => {
        if (!isGameOver && e.innerHTML === "") {
            e.innerHTML = turn;
            e.classList.add(turn.toLowerCase());
            checkWin();
            if (!isGameOver) {
                checkDraw();
                changeTurn();
            }
        }
    });
});

function changeTurn() {
    turn = turn === "X" ? "O" : "X";
    document.getElementById('x').style.backgroundColor = turn === 'X' ? '#FF2E63' : '#252A34';
    document.getElementById('o').style.backgroundColor = turn === 'O' ? '#08D9D6' : '#252A34';
}

function checkWin() {
    winCombinations.forEach(combination => {
        let [a, b, c] = combination;
        if (boxes[a].innerHTML === turn && boxes[b].innerHTML === turn && boxes[c].innerHTML === turn) {
            results.innerHTML = `${turn} Wins!`;
            isGameOver = true;
            highlightWinningBoxes(combination);
            updateScore();
        }
    });
}

function checkDraw() {
    let draw = true;
    boxes.forEach(e => {
        if (e.innerHTML === "") {
            draw = false;
        }
    });
    if (draw && !isGameOver) {
        results.innerHTML = "It's a Draw!";
        isGameOver = true;
    }
}

function highlightWinningBoxes(combination) {
    combination.forEach(index => {
        boxes[index].style.backgroundColor = "#FFD700";
    });
}

function updateScore() {
    if (turn === "X") {
        xScore++;
        document.getElementById("x-score").innerText = `X: ${xScore}`;
    } else if (turn === "O") {
        oScore++;
        document.getElementById("o-score").innerText = `O: ${oScore}`;
    }
}

document.getElementById("play-again").addEventListener("click", () => {
    boxes.forEach(e => {
        e.innerHTML = "";
        e.style.backgroundColor = "";
        e.classList.remove("x", "o");
    });
    isGameOver = false;
    turn = "X";
    document.getElementById('x').style.backgroundColor = '#FF2E63';
    document.getElementById('o').style.backgroundColor = '#252A34';
    results.innerHTML = "Let's Play!";
});