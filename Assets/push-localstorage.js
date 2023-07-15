var allScores = [];

window.onload = function() {
    // Get the value from localStorage
    var recoredScore = localStorage.getItem("playerScoreData");
    
    allScores.push(recoredScore);

    localStorage.setItem("allScores", JSON.stringify(allScores));

    // Display the value on the page
    var recordedHighscores = document.getElementById("highscores-box");
    recordedHighscores.innerText = allScores;
};

console.log(allScores);
