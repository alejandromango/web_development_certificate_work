let quizQuestions = {
    guess1label: ["jaguar",
                "oncilla",
            "iberian lynx"],
    guess2label: ["clouded leopard",
                "ocelot",
            "eurasian lynx"],
    guess3label: ["snow leopard",
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

loadQuestion();
$("#submit").click(guess);

function loadQuestion(){
    loadList = Object.keys(quizQuestions);
    for (let i=0; i<loadList.length; i++) {
        if (loadList[i] != "correct" && loadList[i] != "question_image" ){
            $("#"+loadList[i]).text(quizQuestions[loadList[i]][gameState.currentQuestion]);
        } else if (loadList[i] == "question_image" ){
            $("#"+loadList[i]).attr("src", quizQuestions[loadList[i]][gameState.currentQuestion]);
        }
    }
    $("#q_num").text(gameState.currentQuestion + 1);

}

function guess(){
    let currentGuess = $("input[name='cat_guess']:checked").attr("id");
    if (currentGuess == quizQuestions.correct[gameState.currentQuestion]){
        alert("You got it right!");
        $("#feedback").text(" Correct guess, try a new cat!");
        $("#feedback").css("color", "green");
        gameState.currentQuestion++;
        if (gameState.currentQuestion >= quizQuestions.correct.length) {
            $("#feedback").text(" You got them all!");
            $("#submit").prop("disabled", true);
        } else {
            loadQuestion();
        }
    } else {
        $("#feedback").text(" Incorrect guess, try again");
        $("#feedback").css("color", "red");
    }
}
