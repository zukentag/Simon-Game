var gamePattern = [];
var userClickedPattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
var level = 0;
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(name) {
  $("#" + name).addClass("pressed");
  setTimeout(function () {
    $("#" + name).removeClass("pressed");
  }, 100);
}
function over() {
  $("body").addClass("game-over");
  setTimeout(function () {
    $("body").removeClass("game-over");
  }, 200);
  $("h1").text("Game Over, Press Any Key to Restart");
  startOver();
}
function startOver() {
  level = 0;
  gamePattern.length = 0;
  userClickedPattern.length = 0;
  $("h1").text("Press A Key to Start");
}

function nextSequence() {
  level++;
  $("h1").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#" + randomChosenColour)
    .fadeOut(100)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);

  playSound(randomChosenColour);
}

$(".btn").click(function () {
  var userChoiceColour = this.id;
  userClickedPattern.push(userChoiceColour);
  //   console.log(userClickedPattern.length - 1);

  checkAnswer(userClickedPattern.length - 1);

  playSound(userChoiceColour);
  animatePress(userChoiceColour);
});

$(document).on("keypress", function (e) {
  if (level == 0) {
    nextSequence();
  }
  //   console.log(nextSequence());
});

function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] == gamePattern[currentLevel]) {
    if (gamePattern.length == userClickedPattern.length) {
      userClickedPattern.length = 0;
      nextSequence();
    }
  } else {
    playSound("wrong");
    over();
  }
}
