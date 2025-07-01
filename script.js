let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");

let turnO = true;

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

function resetGame() {
    console.log("Resetting game");
    boxes.forEach((box) => {
        box.innerText = "";
        box.disabled = false;
    });
    turnO = true;
}

function won() {
    console.log("Game Over");
    boxes.forEach((box) => {
        box.disabled = true;
    });
    alert("User " + (turnO ? "X" : "O") + " won the game!");
}
const checkWinner = () => {
    for(let pattern of winPatterns) {
        // console.log(pattern[0],pattern[1],pattern[2]);
        // console.log(boxes[pattern[0]].innerText,boxes[pattern[1]].innerText,boxes[pattern[2]].innerText);
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
        console.log("Box clicked");
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
resetBtn.addEventListener("click", resetGame);