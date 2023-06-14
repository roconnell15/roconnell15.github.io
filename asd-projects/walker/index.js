/* global $, sessionStorage */

$(document).ready(runProgram); // wait for the HTML / CSS elements of the page to fully load, then execute runProgram()
  
function runProgram(){
  ////////////////////////////////////////////////////////////////////////////////
  //////////////////////////// SETUP /////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  // Constant Variables
  var FRAME_RATE = 60;
  var FRAMES_PER_SECOND_INTERVAL = 1000 / FRAME_RATE;
  const KEYS = {
    LEFT: 37,
    RIGHT: 39,
    UP: 38,
    DOWN: 40
  }


  // Game Item Objects
        var positionX = 0;
        var positionY = 0;
        var speedX = 0;
        var speedY = 0;

  // one-time setup
  var interval = setInterval(newFrame, FRAMES_PER_SECOND_INTERVAL);   // execute newFrame every 0.0166 seconds (60 Frames per second)
  $(document).on('keydown', handleKeyDown);                           // change 'eventType' to the type of event you want to handle
  $(document).on('keyup', handleKeyUp)

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

  }
  
  /* 
  Called in response to events.
  */
  function handleKeyDown(event) {
      if(event.which === KEYS.UP){
        console.log("UP PRESSED")
        speedY = -5;
      }
      if(event.which === KEYS.LEFT){
        speedX = -5;
        console.log("LEFT PRESSED")
      }
      if(event.which === KEYS.RIGHT){
        console.log("RIGHT PRESSED")
        speedX = 5;
      }
      if(event.which === KEYS.DOWN){
        console.log("DOWN PRESSED")
        speedY = 5;
      }
  }
  function handleKeyUp(){
    var speedX = 0;
    var speedY = 0;
  }



  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////// HELPER FUNCTIONS ////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////
  function repositionGameItem(){
    positionX += speedX;
    positionY += speedY;
  }

  function redrawGameItem(){
    $("#walker").css("left", positionX);
    $("#walker").css("right", positionX);
    $("#walker").css("top", positionY);
    $("#walker").css("bottom", positionY);
  }
  
  function endGame() {
    // stop the interval timer
    clearInterval(interval);

    // turn off event handlers
    $(document).off();
  }
  
}
