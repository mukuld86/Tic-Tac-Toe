let playerForm = document.querySelector("#playerForm");
playerForm.addEventListener("submit", startGame);

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

let player1Name = "";
let player2Name = "";
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

const showWinner = (winner) => {
    msgContainer.classList.remove("hide");
    msgContainer.classList.add("msg-container");
    msg.innerText = `🎉 ${winner === "O" ? player1Name : player2Name} won the game!`; 
    msg.style.fontSize = "5vmin";
    if(turnO){
        scoreX++;
    }else{
        scoreO++;
    }
    scores.innerText = `${player1Name} (O): ${scoreO} points\n${player2Name} (X): ${scoreX} points`;

}

function won() {
    gameOver = true;
    console.log("Game Over");
    boxes.forEach((box) => {
        box.disabled = true;
    });
    showWinner(turnO ? "X" : "O");
}

function startGame(e){
    e.preventDefault();
    const player1 = document.querySelector("#player1").value;
    const player2 = document.querySelector("#player2").value;
    
    player1Name = player1;
    player2Name = player2;

    if(!player1 || !player2){
        alert("Please enter both player names");
        return;
    }
    const home = document.querySelector(".homePage");
    home.classList.add("homePage-Hide");
    home.classList.remove("homePage");
    
    const main = document.querySelector(".mainGame")
    main.classList.add("mainGame-Display");
    main.classList.remove("mainGame");

    console.log("Game started with players:", player1, player2);

}

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