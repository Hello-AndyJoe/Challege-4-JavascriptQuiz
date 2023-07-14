window.onload = function() {
    // Get the value from localStorage
    var value = localStorage.getItem("playerScoreData");
    
    // Display the value on the page
    var recordedHighscore = document.getElementById("highscores-box");
    recordedHighscore.innerText = value;
};