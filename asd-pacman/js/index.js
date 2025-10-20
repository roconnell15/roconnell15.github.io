/* global $, sessionStorage, getLevel */

$(document).ready(function(){
  ////////////////////////////////////////////////////////////////////////////////
  ///////////////////////// INITIALIZATION ///////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  // HTML jQuery Objects
  var $board = $("#board");

  // Constant Variables
  var FPS = 5;
  var BOARD_WIDTH = $board.width();
  var BOARD_HEIGHT = $board.height();
  var SQUARE_SIZE = 20;
  
  // other game variables
  var pacmanTimer;  // for starting/stopping the timer that draws new Pacman frames
  var ghostTimer;   // for starting/stopping the timer that draws new ghost frames
  var pacman;       // an Object to manage Pacman's $element and movement/location data
  var redGhost;     // an Object to manage the redGhost's $element and movement/location data
  var level;        // a 2D representation of the level with numbers representing walls, pellets, etc...
  var pelletsEaten; // the number of pellets eaten by Pacman

  function startGame() {
    // set initial values for the global variables...

    // start the timers to draw new frames
    var timeBetweenPacmanFrames = 1000 / FPS;       // 5 frames per second
    var timeBetweenGhostFrames = 1000 / (FPS - 1);  // 4 frames per second 
    pacmanTimer = setInterval(drawNewPacmanFrame, timeBetweenPacmanFrames);
    ghostTimer = setInterval(drawNewGhostFrame, timeBetweenGhostFrames);
  
    // turn on event handlers
    $(document).on('eventType', handleEvent);
  }
  
  function endGame() {
    // stop the timers
    clearInterval(pacmanTimer);
    clearInterval(ghostTimer);
  
    // turn off event handlers
    $(document).off();
  }

  ////////////////////////////////////////////////////////////////////////////////
  ///////////////////////// CORE LOGIC ///////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////
  
  // start the game
  startGame();

  /* 
  * Called once per "tick" of the pacmanTimer. This function should execute the 
  * high-level logic for drawing new frames of Pacman:
  *   
  * - determine where pacman should move to 
  * - if the next location is a wall:
  *   - don't move pacman
  * - otherwise:
  *   - move and redraw pacman
  * - if pacman is in the same location as a pellet:
  *   - "eat" the pellet by removing it from the DOM
  *   - increase the score 
  * - if pacman is in the same location as a ghost:
  *   - end the game!
  */
  function drawNewPacmanFrame() {
    
  }

  /* 
  * Called once per "tick" of the ghostTimer which is slightly slower than 
  * the pacmanTimer. This function should execute the high-level logic for 
  * drawing new frames of the ghosts:
  * 
  * - determine where the ghost should move to (it should never be a wall)
  * - move and redraw the ghost
  */
  function drawNewGhostFrame() {
    
  }

  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////// HELPER FUNCTIONS ////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////
  

  
  
  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////// EVENT HELPER FUNCTIONS //////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  function handleEvent(event) {

  }
  
});
