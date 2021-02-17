var userpattern=[];
var gamepattern=[];
var level=0;
var started=false;
var buttoncolors=["red","blue","green","yellow"];

$(document).on("keypress",function(){
	if(!started){
		//$("#level-title").text("Level " + level);
		nextSequence();
		started=true
	}
})
function nextSequence()
{
	userpattern=[];
	level++;
	$("#level-title").text("Level "+level);
	var randomno=Math.floor(Math.random()*4);
	var randomcolor=buttoncolors[randomno];
	gamepattern.push(randomcolor);
	
	$("#"+randomcolor).fadeIn(100).fadeOut(100).fadeIn(100);
	playSound(randomcolor)
}	

$('.btn').click(function(){
	var colorchosen=$(this).attr('id');
	userpattern.push(colorchosen);
	playSound(colorchosen);
	animatePress(colorchosen);
	checkanswer(userpattern.length-1);
});

function checkanswer(index)
{
	if(gamepattern[index]===userpattern[index])
	{
		console.log("success");
		if(userpattern.length===gamepattern.length)
		{
			setTimeout(function() {
				nextSequence()
			}, 1000);
		}
	}
	else
	{
		console.log("wrong");
		playSound("wrong");
		$("body").addClass("game-over");
		setTimeout(function() {
			$("body").removeClass("game-over");
		}, 200);
		$("#level-title").text("Game Over, Press Any Key to Restart");
		startover();
	}
}

function startover()
{
	level=0;
	gamepattern=[];
	started=false;
}

function playSound(name)
{
	var audio=new Audio("sounds/"+name+".mp3");
	audio.play();
}

function animatePress(currentColour){
	$("#"+currentColour).addClass("pressed");
	setTimeout(function() {
		$("#"+currentColour).removeClass("pressed");
	}, 100);
}