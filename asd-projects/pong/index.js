/* global $, sessionStorage */


$(document).ready(runProgram); // wait for the HTML / CSS elements of the page to fully load, then execute runProgram()

function runProgram(){
  ////////////////////////////////////////////////////////////////////////////////
  //////////////////////////// SETUP /////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  // Constant Variables
  const FRAME_RATE = 60;
  const FRAMES_PER_SECOND_INTERVAL = 1000 / FRAME_RATE;
  const KEYS = { //This object serves for greater ease when marking keyboard events
    UP: 38,
    DOWN: 40,
    W: 87,
    S: 83,
  }
  const BOARD_HEIGHT = 800;
  const BOARD_WIDTH = 1760;
  
  // Game Item Objects
var ball = { //This object represents the ball
  x: 300,
  y: 300,
  xSpeed: 0,
  ySpeed:0,
  right: 440,
  bottom: 440,
  height: 50,
  width: 50,
  id: "#ball",
}

function createPaddle(left, id){ 
  return {
    y: 295,
    x: left,
    right: left + 50,
    bottom: 625,
    height: 330,
    width: 50,
    id: id,
    xSpeed: 0,
    ySpeed: 0,
    heightLoss: 0,
  }
}


var paddle1 = createPaddle(10, "#paddle1");
var paddle2 = createPaddle(1700, "#paddle2");
var leftScore = 0;
var rightScore = 0;
var expectedY;

  // one-time setup
  var playerCount = 2;
  startBall();
  let interval = setInterval(newFrame, FRAMES_PER_SECOND_INTERVAL);   // execute newFrame every 0.0166 seconds (60 Frames per second)
  $(document).on('keydown', handleKeyDown);                           // change 'eventType' to the type of event you want to handle
  $(document).on('keyup', handleKeyUp);
  $("#twoPlayer").on("click", multiplayer);
  leftScore = 0;
  rightScore = 0;
  $("#scoreLeft").text("Score: " + leftScore);
  $("#scoreRight").text("Score: " + rightScore);
  ////////////////////////////////////////////////////////////////////////////////
  ///////////////////////// CORE LOGIC ///////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  /* 
  On each "tick" of the timer, a new frame is dynamically drawn using JavaScript
  by calling this function and executing the code inside.
  */
  function newFrame() {
    moveObject(ball);
    moveObject(paddle1);
    moveObject(paddle2);
    paddleBallCollision();
  }
  
  /* 
  Called in response to events.
  */
  function handleKeyDown(event) {
    if (event.which == KEYS.W){
      paddle1.ySpeed = -4;
    }
    if (event.which == KEYS.S){
      paddle1.ySpeed = 4;
    }
    if (playerCount == 2){
      if (event.which == KEYS.UP){
        paddle2.ySpeed = -4;
     }
     if (event.which == KEYS.DOWN){
       paddle2.ySpeed = 4;
     }
  }
  }
function handleKeyUp(event){ //These allow the paddles to stop moving
  if (event.which == KEYS.W){
    paddle1.ySpeed += 4;
  }
  if (event.which == KEYS.S){
    paddle1.ySpeed -= 4;
  }
  if (playerCount == 2){
    if (event.which == KEYS.UP){
      paddle2.ySpeed += 4;
   }
   if (event.which == KEYS.DOWN){
     paddle2.ySpeed -= 4;
   }
}
}
  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////// HELPER FUNCTIONS ////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  
  function endGame() {
    // stop the interval timer
    clearInterval(interval);

    // turn off event handlers
    $(document).off();
  }
  
function startBall(){ //This gives the ball a random starting posiition and velocity
  ball.y = Math.random() * (700 - 80) + 80;
  ball.x = Math.random() * 1680;
  ball.xSpeed = Math.max(Math.random() * 7, 4);
  ball.ySpeed = Math.random() * 7;
  expectY();
  paddle1.y = 295 + paddle1.heightLoss;
  paddle2.y = 295 + paddle2.heightLoss;
}
function moveObject(obj){ //This moves the ball and makes the calculations to figure where to move it to, along with moving the paddles
  
  wallCollision(obj);
  obj.x += obj.xSpeed;
  obj.y += obj.ySpeed;
  $(obj.id).css("left", obj.x);
  $(obj.id).css("top", obj.y);
}
function wallCollision(obj){ //This function checks if the ball or paddles have collided with the wall
  if (obj.x <= 0 || obj.x + obj.width >= BOARD_WIDTH){
    if (ball.x <= 0){
      score("right");
      paddle2.height -= 30;
      $(paddle2.id).css("height", paddle2.height);
      paddle2.y -= 30;
      paddle2.heightLoss += 30;}
    else{
      score("left");
      paddle1.height -= 30;
      $(paddle1.id).css("height", paddle1.height);
      paddle1.y -= 30
      paddle2.heightLoss += 30;;
    }
  }
  if (ball.y <= 0 || ball.y + ball.height >= BOARD_HEIGHT){
    if (ball.ySpeed < 0){
    ball.ySpeed = (ball.ySpeed - 0.5) * -1;
  }
    else{
      ball.ySpeed = (ball.ySpeed + 0.5) * -1;
    }
    if (ball.xSpeed < 0){
      ball.xSpeed -= 0.5;
    }
    else {
      ball.xSpeed += 0.5;
    }
  }
  if (paddle1.y <= 0 || (paddle1.y + paddle1.height > BOARD_HEIGHT)){
    paddle1.ySpeed = 0;
    if (paddle1.y <= 0 ){
      paddle1.y += 100;
    }
    else {
      paddle1.y -= 100;
    }
  }
  if (paddle2.y <= 0 || (paddle2.y + paddle2.height > BOARD_HEIGHT)){
    paddle2.ySpeed = 0;
    if (paddle2.y <= 0 ){
      paddle2.y += 100;
    }
    else {
      paddle2.y -= 100;
    }
  }
}
function paddleBallCollision(){ //This function checks for collisions between the balls and the paddles
  if (ball.x < paddle1.right && ball.x > paddle1.x && (ball.y < paddle1.y + paddle1.height && ball.y > paddle1.y)){
  ball.xSpeed = (ball.xSpeed - 1) * -1;
  expectY();
}
  if (ball.x + 50 < paddle2.right && ball.x + 50 > paddle2.x && (ball.y < paddle2.y + paddle2.height && ball.y > paddle2.y)){
    ball.xSpeed = (ball.xSpeed + 1) * -1;
}
}
function score(direction){
  if (direction == "left"){
      leftScore += 1;
  }
  else {rightScore += 1;}
  startBall();
  $("#scoreLeft").text("Score: " + leftScore);
  $("#scoreRight").text("Score: " + rightScore);
  if (leftScore == 7 || rightScore == 7){
    if (leftScore == 7){
      $("h1").text("Player 1 Wins!");
    } 
    else {
      $("h1").text("Player 2 Wins!");}
    endGame();
  }
}

function expectY(){
  var expectedFrames = (paddle2.x - ball.x) / ball.xSpeed;
  expectedY = ball.y + (ball.ySpeed * expectedFrames);
  var bounce = 0;
  if (expectedY < 0){
    expectedY *= -1;
  }
  while (expectedY >= BOARD_HEIGHT){
    expectedY = expectedY - BOARD_HEIGHT;
    bounce += 1;
}
  expectedY = ball.y + ((ball.ySpeed + (bounce * 0.5)) * expectedFrames);
  if (expectedY < 0){
    expectedY *= -1;
  }
  while (expectedY >= BOARD_HEIGHT){
    expectedY = expectedY - BOARD_HEIGHT;
  }
    console.log(bounce);
    console.log(expectedY);
  }
}

