var gamePattern = []; 
var userClickedPattern = []; 
var buttonColours = ["red", "blue", "green", "yellow"];
var started = true;
var level = 0;


$(document).on("keypress", function() {
    if(started === true) {
        // $("#level-title").text("Level " + level);
        nextSequence();
        started = false;
    }

});


$(".btn").click(function() {
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour); 
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAns(userClickedPattern.length - 1);
});


function checkAns(clicks) {
    if ((gamePattern[clicks] === userClickedPattern[clicks])){
        console.log("success");
        if(gamePattern.length === userClickedPattern.length){
            setTimeout(function() {
                nextSequence();
            }, 1000);
        }
    }
    else {
        playSound("wrong");
        $("#level-title").text("Game Over, Press Any Key to Restart");
        $("body").addClass("game-over");
        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 200);
        console.log("wrong");
        startOver();
    } 
}


function nextSequence() {
    userClickedPattern = [];
    level++;  
    $("#level-title").text("Level " + level);
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber]; 
    gamePattern.push(randomChosenColour);
    $("#" + randomChosenColour).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour); 
}


function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}


function animatePress(currentColor) {
    $("." + currentColor).addClass("pressed");
    
    setTimeout(function() {
        $("." + currentColor).removeClass("pressed")
    }, 100);
}


function startOver() {
    level = 0;
    started = true;
    gamePattern = [];
}




