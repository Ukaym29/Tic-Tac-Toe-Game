
//  queryselectorAll

let endgameBtn = document.getElementById("endButton")
let btnRef = document.querySelectorAll(".button-option");
let popupRef = document.querySelector(".popup");
let newgameBtn = document.getElementById("new-game");
let restartBtn = document.getElementById("restart");
let msgRef = document.getElementById("message");



// winning pattern array , this is for the game controls, here we set our winning pattern
let winningPattern = [
    [0, 1, 2],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [3, 4, 5],
    [6, 7, 8],
    [0, 4, 8],
    [2, 4, 6],
];
//  we are using "x" and "o" players and 
//  player "x" plays first
let xTurn = true;
let count = 0;
let score = 0;

// Disable all buttons
const disableButtons = () => {
    btnRef.forEach((element) => (element.disabled = true));
    //  After this we enable the popup
    popupRef.classList.remove("hide");

};

// Enable all buttons for ( NEW GAME AND RESTART)
const enableButtons = () => {
    btnRef.forEach(element => {
        element.innerText = "";
        element.disabled = false;
    });
    //  After this we disable popup
    popupRef.classList.add("hide");
};




//  winFunction
// 8. This FUNCTION  is executed when a player wins
const winFunction = (letter) => {
    disableButtons();
    if (letter == "x") {
        msgRef.innerHTML = "&#x1F389; <br>  Player 'x' wins";
        document.getElementById("xScore").innerHTML = "1"
        document.getElementById("oScore").innerHTML = "0"
    } else {
        msgRef.innerHTML = "&#x1F389; <br>  Player 'o' wins"
        document.getElementById("xScore").innerHTML = "0"
        document.getElementById("oScore").innerHTML = "1"
    }
};

//9.  Function for draw
const drawFunction = () => {
    disableButtons();
    msgRef.innerHTML = "&#x1F60E; <br> It's a draw";
    document.getElementById("xScore").innerHTML = "0"
    document.getElementById("oScore").innerHTML = "0"
};

//  After which we set the buttons for new game what happens when new game is clicked
newgameBtn.addEventListener("click", () => {
    count = 0;
    enableButtons();
});

//  then we set for restart button, what it does when clicked
restartBtn.addEventListener("click", () => {
    count = 0;
    enableButtons();
});

//  End game button what it does when clicked

endgameBtn.addEventListener("click", () => {
    alert("Are you sure you want to quit the game")
    count = 0;
    disableButtons();
    if (alert.true) {

        document.getElementById("scores").innerHTML = " Game over"
    } else {
        document.getElementById("xScore").innerHTML = "0"
        document.getElementById("oScore").innerHTML = "0"
        window.onload = document.getElementById("message").innerText = "Welcome! Click on the 'New Game' button to begin playing.";
    }
});



// WIN CHECKER
// winning logic, the brains behind our winning
const winChecker = () => {
    //  we loop through all win patterns
    for (let i of winningPattern) {
        let [element1, element2, element3] = [

            btnRef[i[0]].innerText,
            btnRef[i[1]].innerText,
            btnRef[i[2]].innerText,
        ];

        // check if elements are filled
        //  if 3 empty elements are same give win a under the following constricts

        if (element1 != "" && (element2 != "") & (element3 != "")) {
            if ((element1 == element2 && element2 == element3)) {
                // If all 3 buttons have same values then pass the value to winFunction
                winFunction(element1);
            }
        }

    }
};


// Display x/o on click 
btnRef.forEach((element) => {
    element.addEventListener("click", () => {
        if (xTurn) {
            xTurn = false;
            // Display x
            element.innerText = "x";
            element.disabled = true;
        } else {
            xTurn = true;
            // Display 0
            element.innerText = "o";
            element.disabled = true;
        }
        // increment count on each click
        count += 1;
        if (count == 9) {
            //  it is a draw since there are a total of 9 boxes
            drawFunction();
        }
        //  check for win on every click that is what this function does
        winChecker();
    });
});

// And then finally we disable  buttons and enable popup on page load so instead of oor game
// to start running, our popup welcoming us and telling us to click on new game button shows

window.onload = () => {
    document.getElementById("message").innerText = "Welcome! to Tic-Tac-Toe  Click on the 'New Game' button to begin playing.";
    disableButtons();
};