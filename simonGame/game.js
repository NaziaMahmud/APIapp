/*//Set color button to hold
var buttonColours = ["red", "blue", "green", "yellow"];

//creating empty array
var gamePattern = [];

//Create a new function called nextSequence()
function nextSequence() {
  
  //Generate a new random number between 0 and 3
  var randomNumber = Math.floor(Math.random() * 4);

  //Use the randomNumber to select a random colour from buttonColours
  var randomChosenColour = buttonColours[randomNumber];

  //Add the selected colour to the gamePattern array
  gamePattern.push(randomChosenColour);

  

  //For testing, log the result
  //console.log("Random Colour Chosen: " + randomChosenColour);
  //console.log("Game Pattern: ", gamePattern);

function nextSequence() {
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  // Flash the button
  $("#" + randomChosenColour).fadeOut(100).fadeIn(100);

  // Play the sound
  playSound(randomChosenColour);
}

}*/

var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattren = [];
var started = false;
var level = 0;

$(document).keypress(function(){
    if(!started) {
        $("#level-title".text("Level1 " + level));
    nextSequence();
started = true;
}
});

function nextSequence() {
    
  level++;
  
  $("level-title").text("level" + level );
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  //1. Use jQuery to select the button with the same id as the randomChosenColour
  //2. Use Google/Stackoverflow to figure out how you can use jQuery to animate a flash to the button selected in step 1.
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  
  playSound (randomChosenColour);
}

function playSound(name) {
  //3. Use Google/Stackoverflow to figure out how you can use Javascript to play the sound for the button colour selected in step 1.
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

$(".btn").click(function() {
 var userChosenColour = $(this).attr("id");
 userClickedPattern.push(userChosenColour);
 //1. In the same way we played sound in nextSequence() , when a user clicks on a button, the corresponding sound should be played.
 playSound(userChosenColour);
});


function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");

    setTimeout(function (){
        $("#" + currentColor.removeClass("pressed"));
    }, 100);
}

function checkAnswer(currentLevel){
  if (gamePattren[currentLevel] == userClickPattren[currentLevel]) {
    console.log("success");

    if (userClickedPattren.length == gamePattren.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    console.log("wrong");
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over");
    }, 200);
     
    $("#level-title").text("Game over, Press any key to Restart");
    
  }
}