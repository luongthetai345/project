const list = ['ADD', 'APPLE', 'ACCESS', 'APOLOGIZE', 'ASK', 'ANSWER', 'AVAILABLE', 'AM', 'APPROCIATE', 'ACKER', 
			 'BALL', 'BIG', 'BORN', 'BICYCLE', 'BUY', 'BORN', 'BED', 'BAG', 'BASEBALL', 'BAKETBALL',
			 'CAR', 'CAT', 'CHICKEN', 'CUT', 'CONTAIN', 'CINEMA', 'CONTROL', 'CENTER', 'COPY', 'CAMERA', 
			 'DO', 'DIFFICULT', 'DINNER', 'DUCK', 'DANCE', 'DESTROY', 'DOWLOAD', 'DAD', 'DEVIDE', 'DISPLAY',
			 'ENTER', 'ENGINEER', 'ENTERTAINMENT', 'ENGAGE', 'EMBARRASE', 'EMPLOYER', 'EMPLOYEE', 'ENCODE', 'EIGHT', 'ENJOY',
			 'FOOT', 'FOOTBALL', 'FINGER', 'FISH', '', '', '', '', '', '',  
			 'GO', 'GOOD', 'GIFT', 'GUN', 'GIN', 'GENDER', 'GENEROUS', 'GHOST', 'GOAL', 'GOAT',
			 'ZOO'];
var temp = document.querySelector('.time');
var button = document.querySelector("button");
var words = document.querySelector(".words");
var timerDiv = document.querySelector(".time");
var scoreDiv = document.querySelector(".score");
var points = 0;
var spans;
var typed;
var seconds = 60;
var spark = new Audio();

function countdown() {
 	points = 0;
 	var timer = setInterval(function(){
 		button.disabled = true;
    	seconds--;
    	temp.innerHTML = seconds;
    	if (seconds === 0) {
    		alert("Game over! Your score is " + points);
    		scoreDiv.innerHTML = "0";
    		words.innerHTML = "";
    		button.disabled = false;
    		clearInterval(timer);
    		seconds = 60;
    		timerDiv.innerHTML = "60";
    		button.disabled = false;	
    	}
 		}
  , 1000);
}

function random() {
  words.innerHTML = "";
  var random = Math.floor(Math.random() * (10)) + 0;
	var wordArray = list[random].split("");
	for (var i = 0; i < wordArray.length; i++) {
  	var span = document.createElement("span");
  	span.classList.add("span");
  	span.innerHTML = wordArray[i];
  	words.appendChild(span);
  }
  spans = document.querySelectorAll(".span");
}


button.addEventListener("click", function(e){
  countdown();
  random();
  button.disabled = true;	
});
function typing(e) {
  typed = String.fromCharCode(e.which);
  for (var i = 0; i < spans.length; i++) {
  	if (spans[i].innerHTML === typed) { 
  		if (spans[i].classList.contains("bg")) { 
  			continue;
  		} else if (spans[i].classList.contains("bg") === false && spans[i-1] === undefined || spans[i-1].classList.contains("bg") !== false ) { 
  			spans[i].classList.add("bg");
  			break;
  		} 
  	}
  }
  var checker = 0;
  for (var j = 0; j < spans.length; j++) { 
  	if (spans[j].className === "span bg") {
  		checker++;
    }
    if (checker === spans.length) { 
		  spark.currentTime = 0;
      spark.play();
  	  points++; 
  	  scoreDiv.innerHTML = points; 
  	  document.removeEventListener("keydown", typing, false);
  	  setTimeout(function(){
  		  words.className = "words"; 
  		  random(); 
  		  document.addEventListener("keydown", typing, false);
  	  }, 400);
    }
  }
}
document.addEventListener("keydown", typing, false);