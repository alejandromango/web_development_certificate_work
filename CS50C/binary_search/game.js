let gameState = {
    wins: 0,
    losses: 0,
    guessList: [],
    avgGuesses: 0,
    maxNumber: 100,
    target: -1
}

let maxGuesses = Math.ceil(Math.log2(gameState.maxNumber));
gameState.target = Math.ceil(Math.random() * gameState.maxNumber);
document.getElementById("submit").addEventListener("click", guess);
document.getElementById("guess").addEventListener("change", checkValidity);

function guess(){
    let currentGuess = Number(document.getElementById("guess").value);
    console.log(currentGuess);
    if (gameState.guessList.includes(currentGuess)) {
        alert("You already guessed that, try again");
    } else if (currentGuess > gameState.target){
        gameState.guessList.push(currentGuess);
        document.getElementById("feedback").innerHTML = "Feedback: Too high!";
        updateFeedback();
    } else if (currentGuess < gameState.target){
        gameState.guessList.push(currentGuess);
        document.getElementById("feedback").innerHTML = "Feedback: Too low!";
        updateFeedback();
    } else {
        gameState.guessList.push(currentGuess);
        document.getElementById("feedback").innerHTML = "Feedback: You got it, start guessing a new number!";
        gameState.wins++;
        setupRound();
    }
    if (gameState.guessList.length >= maxGuesses) {
        document.getElementById("feedback").innerHTML = "Feedback: You didn't get it, start guessing a new number!";
        gameState.losses++;
        setupRound();

    }
}

function setupRound(){
    let roundsPlayed = gameState.wins + gameState.losses;
    gameState.avgGuesses = ((gameState.avgGuesses * (roundsPlayed - 1)) + gameState.guessList.length)/roundsPlayed;
    gameState.guessList = [];
    gameState.target = Math.ceil(Math.random() * gameState.maxNumber);
    updateFeedback()

}

function updateFeedback(){
    document.getElementById("wins").innerHTML = "Wins: " + gameState.wins;
    document.getElementById("losses").innerHTML = "Losses: " + gameState.losses;
    document.getElementById("remain").innerHTML = "Guesses Remaining: " + (maxGuesses - gameState.guessList.length); 
    document.getElementById("guesses").innerHTML = "Average Guesses for Win: " + gameState.avgGuesses;   
}

function checkValidity(){
    let currentGuess = document.getElementById("guess").value;
    if (isNaN(currentGuess) || currentGuess < 1 || currentGuess > gameState.maxNumber){
        document.getElementById("submit").disabled = true;
    } else {
        document.getElementById("submit").disabled = false;
    }
}