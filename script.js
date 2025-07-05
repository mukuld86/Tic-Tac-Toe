let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#newGame-btn");
let msgContainer = document.querySelector(".hide");
let msg = document.querySelector("#msg");
let scores = document.querySelector("#scores");

let scoreO = 0;
let scoreX = 0;
let turnO = true;
let gameOver = false;

const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

newGameBtn.addEventListener("click", () => {
    console.log("New game started");
    boxes.forEach((box) => {
        box.innerText = "";
        box.disabled = false;
    });
    msg.innerText = "";
    turnO = true;
    gameOver=false;
});

resetBtn.addEventListener("click", ()=>{
    console.log("Resetting game");
    boxes.forEach((box) => {
        box.innerText = "";   
        box.disabled = false;
    });
    turnO = true;
    gameOver = false;
    msgContainer.classList.add("hide");
    msgContainer.classList.remove("msg-container");
});

const showWinner = (winner) => {
    msgContainer.classList.remove("hide");
    msgContainer.classList.add("msg-container");
    msg.innerText = "User " + winner + " won the game!";
    msg.style.fontSize = "5vmin";
    if(turnO){
        scoreX++;
    }else{
        scoreO++;
    }
    scores.innerText = `Player O: ${scoreO} points
    Player X: ${scoreX} points`;
}

function won() {
    gameOver = true;
    console.log("Game Over");
    boxes.forEach((box) => {
        box.disabled = true;
    });
    showWinner(turnO ? "X" : "O");
}
const checkWinner = () => {
    for(let pattern of winPatterns) {
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;
        if(pos1Val!="" && pos2Val!="" && pos3Val!="" && pos1Val === pos2Val && pos2Val === pos3Val  ){
            won();
            return;
        };
    }
} 



boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if(turnO){
            turnO = false;
            box.innerText = "O";
            box.disabled = true;
        }else{
            turnO = true;
            box.innerText = "X";
            box.disabled = true;
        }
        checkWinner();
    })
})