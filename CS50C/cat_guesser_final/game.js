/* Students: Please use this week's project for Week 6: Assignment 6: Enhanced User Interfaces.
     You will need to replace the contents of this JavaScript file with your own work,
     and create any other files, if any, required for the assignment.
     When you are done, be certain to submit the assignment in both Repl.it and Canvas to be graded. */
let quizQuestions = {
    guess1: ["jaguar",
                "oncilla",
            "iberian lynx"],
    guess2: ["clouded leopard",
                "ocelot",
            "eurasian lynx"],
    guess3: ["snow leopard",
                "margay",
            "canada lynx"],
    attribution: ["Dr. Raju Kasambe, CC BY-SA 4.0 <https://creativecommons.org/licenses/by-sa/4.0>, via Wikimedia Commons",
                    "Groumfy69, CC BY-SA 3.0 <https://creativecommons.org/licenses/by-sa/3.0>, via Wikimedia Commons",
                    "Aconcagua, CC BY-SA 3.0 <https://creativecommons.org/licenses/by-sa/3.0>, via Wikimedia Commons"],
    question_image: ["https://upload.wikimedia.org/wikipedia/commons/a/ab/Clouded_Leopard_Neofelis_nebulosa_by_Dr_Raju_Kasambe_DSC_7497_%2828%29.JPG",
                "https://upload.wikimedia.org/wikipedia/commons/3/32/Leopardus_tigrinus_-_Parc_des_F%C3%A9lins.jpg",
                "https://upload.wikimedia.org/wikipedia/commons/4/49/Lynx_Nationalpark_Bayerischer_Wald_01.jpg"],
    correct: ["guess2", "guess1", "guess2"]
}
let gameState = {
    currentQuestion: 0,
    currentAnswer: null
}

let total = 0, count = 1;
while (count <= 10) {
  total += count;
  count += 1;
}
console.log(total);

$("#guess1,#guess2,#guess3").draggable({revert: true, revertDuration: 300});
$("#question_image").droppable({drop: guess});
$("#q_num").progressbar({value: 0, max: quizQuestions.correct.length});
$("#feedback-accordion").accordion({collapsible: true});
loadQuestion();

function loadQuestion(){
    loadList = Object.keys(quizQuestions);
    for (let i=0; i<loadList.length; i++) {
        if (loadList[i] != "correct" && loadList[i] != "question_image" ){
            $("#"+loadList[i]).text(quizQuestions[loadList[i]][gameState.currentQuestion]);
        } else if (loadList[i] == "question_image" ){
            $("#"+loadList[i]).attr("src", quizQuestions[loadList[i]][gameState.currentQuestion]);
        }
    }
    $("#q_num").progressbar({value: gameState.currentQuestion, max: quizQuestions.correct.length})

}

function guess(event, ui){
    let currentGuess = ui.draggable[0].id
    console.log(ui.draggable[0].id)
    if (currentGuess == quizQuestions.correct[gameState.currentQuestion]){
        $("#feedback").text(" Correct guess, try a new cat!");
        $("#feedback").css("color", "green");
        gameState.currentQuestion++;
        if (gameState.currentQuestion >= quizQuestions.correct.length) {
            $("#feedback").text(" You got them all!");
            $("#question_image").droppable("disable");
        }
        loadQuestion();
    } else {
        $("#feedback").text(" Incorrect guess, try again");
        $("#feedback").css("color", "red");
    }

}
