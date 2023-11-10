// Modal variables
let modalOuterEl = document.querySelector("#modalOuter");
let modalInnerEl = document.querySelector("#modalInner");
let congratsEl = document.querySelector("#congrats");
let emojisEl = document.querySelector("#emoji");

// Game box variables
let input = document.querySelector("#input");
let guessEl = document.querySelector("#guess");
let guessEmojiEl = document.querySelector("#guessEmoji");
let checkButton = document.querySelector("#checkButton");
let replayButton = document.querySelector("#replayButton");
let remainChances = document.querySelector("#chances");

// Set the focus on input field
input.focus();
let randomNum = Math.floor(Math.random() * 100 + 1);
console.log(randomNum);
chance = 5;


function closeModal() {
    modalOuterEl.classList.remove("open");
    window.location.reload();
}
  
function reduceChances(e) {
    chance--;
    // Get the value from the input field
    let inputValue = input.value;

    // Check is it equal?
    if (inputValue == randomNum) {
        modalOuterEl.classList.add("open");
        emojisEl.textContent = "🥳";
        congratsEl.textContent = "Congratulations";
        replayButton.addEventListener("click", closeModal);
    
    //Check is it larger than random number and smaller or equal 100?
    } else if (inputValue > (randomNum + 5) && inputValue <= 100) {
    
        [guessEmojiEl.textContent, guessEl.textContent, remainChances.textContent, guessEl.style.color, input.value, document.body.style.backgroundColor] = ["😡", "Your guess is high", chance, "red", "", "red"];
    
    //Check is it close by a range of 5 to WIN
    } else if (inputValue < (randomNum + 5) && inputValue > (randomNum - 5)) {
    
        [guessEmojiEl.textContent, guessEl.textContent, remainChances.textContent] = ["😅 😅", "You are almost there", chance];
        guessEl.style.color = "green";
        document.body.style.backgroundColor = "lightgreen";
        input.value = "";


    //Check is it smaller than random number and larger than 0?
    } else if (inputValue < (randomNum - 5) && inputValue > 0) {
    
        [guessEmojiEl.textContent, guessEl.textContent, remainChances.textContent] = ["🤓", "Your guess is low", chance];
        guessEl.style.color = "red";
        input.value = "";
        document.body.style.backgroundColor = "lightgrey";

    // If the input is not within the range?
    } else {
    
        [guessEmojiEl.textContent, guessEl.textContent, remainChances.textContent] = ["😡 😡 😡", "Come on .. I told you between 1 - 100", chance];
        guessEl.style.color = "#DE0611";
        document.body.style.backgroundColor = "black";
        input.value = "";
    }
    // Check if the chances is zero?
    if (chance == 0) {
    
        modalOuterEl.classList.add("open");
        emojisEl.textContent = "🫠";
        congratsEl.textContent = "You lost the game";
        checkButton.textContent = "replay";
        replayButton.addEventListener("click", closeModal);
    }

    // Check if the input less than zero?
    if (chance < 0) {
        window.location.reload();
    }
}


modalOuterEl.addEventListener("click", function (e) {
    const isOutside = !e.target.closest(".modal-inner");
    if (isOutside) {
        closeModal();
    }
});
  
window.addEventListener("keydown", (e) => {
    console.log(e);
    if (e.key === "Escape") {
        closeModal();
    }
});

 
// Listen for the click event and keydown event
checkButton.addEventListener("click", reduceChances);
window.addEventListener("keydown", (e) => {
// console.log(e);
    if (e.key === "Enter") {
        reduceChances();
    }
});