buttonColours=["red","blue","green","yellow"]
gamePattern=[]
userClickedPattern=[]
var started=false;
var level=0

$(document).keypress(function(){
    if(!started){
        $("#level-title").text("level"+level);
        nextSequence();
        started=true;
    }

})
$(".btn").click(function(){
    var userChosenColour=$(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour)
    checkAnswer(userClickedPattern.length-1);

})

function checkAnswer(currentLevel){
    if(
        gamePattern[currentLevel]===userClickedPattern[currentLevel]){
            console.log("success");
            if(userClickedPattern.length===gamePattern.length){
                setTimeout(function(){
                    nextSequence()
                },1000)
            }
            
        }
        else{
            console.log("wrong");
            playSound("wrong")
            $("body").addClass("game-over")
            setTimeout(function(){
                $("body").removeClass("game-over")
            },200)
            $("#level-title").text("gameover,press any key to restart")
            startOver();
            
        }

}

function nextSequence(){
    userClickedPattern=[]
    level++
    $("#level-title").text("level"+level);
     var randomNumber=Math.floor(Math.random()*4);
     var randomChosenColours=buttonColours[randomNumber];
     gamePattern.push(randomChosenColours);
    $("#"+randomChosenColours).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColours)
    
}

function playSound(name){
    var audio = new Audio("sounds/"+name+".mp3");
    audio.play();

}

function animatedPress(currentColour){
    $("#"+currentColour).addclass("pressed")
setTimeout(function() {
  $("#"+currentColour).removeClass("pressed")
}, 100);
}
function startOver(){
    level=0
    gamePattern=[]
    started=false;
}