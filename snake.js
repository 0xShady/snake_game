var snake;
var em = 20;
var shots = [];
var movement = [];
var highscore = 0;
var gameState = 'init';
var fr = 10;
var foodSound = document.getElementById('sound1');
var loseSound = document.getElementById('sound2');
var winSound = document.getElementById('sound3');

function setup(){
  createCanvas(600, 600);
  frameRate(fr);
}

function initGame(){
  background(50, 50, 100);
  var name = 'L7anch';
  textSize(50);
  fill(255);
  nameWidht = textWidth(name);
  text(name, (width - nameWidht)/2, height/2 - 40);
  startBtn = createButton('9sser');
  startBtn.position(width/2 - startBtn.width/2, height - 50);
  startBtn.mousePressed(startGame);
  noLoop();
}

function startGame(){
  removeElements();
  gameState = 'play';
  snake = new Snake();
  food(1);
  loop();
}

function runGame(){
  background(50, 50, 100);
  textSize(12);
  fill(255);
  text("score: " + snake.tail.length, 1, 10);
  text("highscore: " + highscore, 1, 24);
//   pauseBtn = createButton('7bess');
//   pauseBtn.position(width/2 - startBtn.width/2 - 50, height + 10);
//   pauseBtn.mousePressed(pause);

//   playBtn = createButton('tle9');
//   playBtn.position(width/2 - startBtn.width/2 + 50, height + 10);
//   playBtn.mousePressed(playbtn);
  snake.update();
  snake.show();
  snake.checkDeath();

  fill(0, 255, 0, 100);
  for(var i=0;i<shots.length;i++){
	rect(shots[i].x, shots[i].y, em, em);
	if(snake.eat(shots[i])){
	  snake.tail.push(createVector(snake.x, snake.y));
	  shots.splice(i, 1);
	  food(1);
	  fr++;
	  foodSound.play();
	//   if(snake.tail.length > highscore)
	//   highscore = snake.tail.length;
	}
  }
}

function endGame(){
  background(255, 0, 0);
  textSize(40);
  var msg = 'Game Over';
  msgWidht = textWidth(msg);
  fill(255);
  text(msg, (width - msgWidht)/2, height/2 - 40);
  startBtn = createButton('3awdass');
  startBtn.position(width/2 - startBtn.width/2, height - 50);
  startBtn.mousePressed(startGame);
  noLoop();
}

function draw(){
  frameRate(fr);
  if(gameState == 'init'){
	initGame();
  }
  else if(gameState == 'play'){
	runGame();
  }
  else if(gameState == 'end'){
	endGame();
  }
}

function food(num){
  var cols = floor(width / em);
  var rows = floor(height / em);
  for(var i=0;i<num;i++){
	var location = createVector(floor(random(cols)), floor(random(rows))).mult(em);
	while(snake_intersect(location)){
	  location = createVector(floor(random(cols)), floor(random(rows))).mult(em);
	}
	shots.push(location);
  }
}

function snake_intersect(location){
  var intersect = false;
  if(location.x == snake.pos.x && location.y == snake.pos.y){
	intersect = true;
  }else{
	for(var i=0;i<snake.tail.length;i++){
	  if(location.x == snake.tail[i].x && location.y == snake.tail[i].y){
		intersect = true;
		break;
	  }
	}
	for(var i=0;i<shots.length;i++){
	  if(location.x == shots[i].x && location.y == shots[i].y){
		intersect = true;
		break;
	  }
	}
  }
  return intersect;
}

function keyPressed(){
  if(keyCode === DOWN_ARROW){
	movement.push([0, 1]);
  }
  else if(keyCode === UP_ARROW){
	movement.push([0, -1]);
  }
  else if(keyCode === LEFT_ARROW){
	movement.push([-1, 0]);
  }
  else if(keyCode === RIGHT_ARROW){
	movement.push([1, 0]);
  }
}

function Snake(){
	this.show = function(){
	  fill(255);
	  for(var i=0;i<this.tail.length;i++){
		rect(this.tail[i].x, this.tail[i].y, em, em);
	  }
		rect(this.pos.x, this.pos.y, em, em)
	}
	this.update = function(){
	  if(movement.length){
		if(snake.speed.x != movement[0][0]*-1 && snake.speed.y != movement[0][1]*-1){
		  snake.dir(movement[0][0], movement[0][1]);
		}
		movement.splice(0, 1);
	  }
	  this.tail.unshift(createVector(this.pos.x, this.pos.y));
	  this.tail.pop();
	  this.pos.x += this.speed.x * em;
	  this.pos.y += this.speed.y * em;
	}
	this.dir = function(x, y){
	  this.speed.x = x;
	  this.speed.y = y;
	}
	this.checkDeath = function(){
	  if(this.pos.x >= width || this.pos.y >= height || this.pos.x < 0 || this.pos.y < 0){
		gameState = 'end';
		if(snake.tail.length > highscore)
		{
			highscore = snake.tail.length;
			winSound.play();
		}
		else
		  loseSound.play();
	  }
	  for(var i=0;i<this.tail.length;i++){
	    if(this.tail[i].x == this.pos.x && this.tail[i].y == this.pos.y){
		  gameState = 'end';
		  if(snake.tail.length > highscore)
		  {
			  highscore = snake.tail.length;
		      winSound.play();
		  }
		  else
		    loseSound.play();
	    }
	  }
	}
	this.eat = function(pos){
	  return this.pos.x == pos.x && this.pos.y == pos.y;
	}
	this.reset = function(){
	  shots = [];
	  this.tail = [];
	  this.pos = createVector(0, 0);
	  this.speed = createVector(1, 0);
	  fr = 10;
	}
	this.reset();
  }