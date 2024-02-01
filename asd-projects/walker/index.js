/* global $, sessionStorage */

$(document).ready(runProgram); // wait for the HTML / CSS elements of the page to fully load, then execute runProgram()
  
function runProgram(){
  ////////////////////////////////////////////////////////////////////////////////
  //////////////////////////// SETUP /////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  // Constant Variables
  var FRAME_RATE = 60;
  var FRAMES_PER_SECOND_INTERVAL = 1000 / FRAME_RATE;
  var KEYS = {
    "LEFT": 37,
    "RIGHT": 39,
    "UP": 38,
    "DOWN": 40,
    "W": 87,
    "A": 65,
    "S": 83,
    "D": 68,
  }

  var boardWidth = 700;
  var boardHeight = 700;


  // Game Item Objects
var walker = {   
  "positionX" : 0,
  "positionY" : 0,
  "speedX" : 0,
  "speedY" : 0,
}

var runner = {
  "positionX" : 700,
  "positionY" : 700,
  "speedX" : 0,
  "speedY" : 0,
}

  // one-time setup
  var interval = setInterval(newFrame, FRAMES_PER_SECOND_INTERVAL);   // execute newFrame every 0.0166 seconds (60 Frames per second)
  $(document).on('keydown', handleKeyDown);                           // change 'eventType' to the type of event you want to handle
  $(document).on('keydown', handleKeyDownRun); 
  $(document).on('keyup', handleKeyUp);
  $(document).on('keyup', handleKeyUpRun);

  ////////////////////////////////////////////////////////////////////////////////
  ///////////////////////// CORE LOGIC ///////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  /* 
  On each "tick" of the timer, a new frame is dynamically drawn using JavaScript
  by calling this function and executing the code inside.
  */
  function newFrame() {
    repositionGameItem();
    redrawGameItem();
    repositionGameItemRun();
    redrawGameItemRun();
    wallCollision();
  }
  
  /* 
  Called in response to events.
  */
  function handleKeyDown(event) {
    //Start Walker
      if(event.which === KEYS.UP){
        console.log("UP PRESSED")
        walker.speedY = -5;
        $("#walker").css("background-color", "green")
      }
      if(event.which === KEYS.LEFT){
        walker.speedX = -5;
        console.log("LEFT PRESSED")
        $("#walker").css("background-color", "green")
      }
      if(event.which === KEYS.RIGHT){
        console.log("RIGHT PRESSED")
        walker.speedX = 5;
        $("#walker").css("background-color", "green")
      }
      if(event.which === KEYS.DOWN){
        console.log("DOWN PRESSED")
        walker.speedY = 5;
        $("#walker").css("background-color", "green")
      }

  }

function handleKeyDownRun(event){        //Start Runner
        if(event.which === KEYS.W){
          console.log("UP PRESSED")
          runner.speedY = -8;
          $("#runner").css("background-color", "red")
        }
        if(event.which === KEYS.A){
          runner.speedX = -8;
          console.log("LEFT PRESSED")
          $("#runner").css("background-color", "red")
        }
        if(event.which === KEYS.D){
          console.log("RIGHT PRESSED")
          runner.speedX = 8;
          $("#runner").css("background-color", "red")
        }
        if(event.which === KEYS.S){
          console.log("DOWN PRESSED")
          runner.speedY = 8;
          $("#runner").css("background-color", "red")
        }
      }
    function handleKeyUp(){
      walker.speedX = 0;
      walker.speedY = 0;
    }
    function handleKeyUpRun(){
      runner.speedX = 0;
      runner.speedY = 0;
    }



  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////// HELPER FUNCTIONS ////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////
  function repositionGameItem(){
    walker.positionX += walker.speedX;
    walker.positionY += walker.speedY;
  }

  function repositionGameItemRun(){
    runner.positionX += runner.speedX;
    runner.positionY += runner.speedY;
  }

  function redrawGameItemRun(){
    $("#runner").css("left", runner.positionX);
    $("#runner").css("right", runner.positionX);
    $("#runner").css("top", runner.positionY);
    $("#runner").css("bottom", runner.positionY);
  }

  function redrawGameItem(){
    $("#walker").css("left", walker.positionX);
    $("#walker").css("right", walker.positionX);
    $("#walker").css("top", walker.positionY);
    $("#walker").css("bottom", walker.positionY);
  }

  function wallCollision(){
    if(walker.positionX < 0){
      walker.positionX = 0;
      $("#walker").css("background-color", "white")
    }
    if(walker.positionY < 0){
      walker.positionY = 0;
      $("#walker").css("background-color", "white")
    }
    if(walker.positionX > boardWidth){
      walker.positionX = boardWidth;
      $("#walker").css("background-color", "white")
    }
    if(walker.positionY > boardHeight){
      walker.positionY = boardHeight;
      $("#walker").css("background-color", "white")
    }
  }
  
  function endGame() {
    // stop the interval timer
    clearInterval(interval);

    // turn off event handlers
    $(document).off();
  }
  
}
