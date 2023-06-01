$(document).ready(function(){

/////////////////
// initialization
/////////////////

// this section initializes some variables that will be used throughout the program
var doubleMaxSpeed = 5;
var maxCircles = 10;
var $board = $('#board');
var boardWidth = $($board).width();
var boardHeight = $($board).height();
var circles = [];
var circleRadius = 10;

//////////
// startup
//////////

// this gets the whole thing going;
// it creates a number of circles both in JavaScript and in the HTML of the website
for (var i = 0; i < maxCircles; i++){
    var newId = getId(i);
    var newCircle = makeCircle(newId);
    circles.push(newCircle);
    
    addNewCircleElement(newCircle, newId);
}

// this tells the program to run the update function 60 times per second
setInterval(update, 1000/60);


///////////////////////////
// startup helper functions
///////////////////////////

// this creates a circle object and returns it
// note: it only creates an object; it does not create a circle in the HTML
function makeCircle(id){

    // this creates an empty object
    var circle = {};
    
    // this creates some useful variables that are not directly placed in the object
    var maxX = boardWidth - circleRadius*2;
    var maxY = boardHeight - circleRadius*2;
    
    // this gives the circle object all of the data that it needs to store
    circle.id = "#" + id;
    circle.x = Math.random() * maXX + circleRadius;
    circle.y = Math.random() * maxY + circleRadius;
    circle.speedX = decideSpeed();
    circle.speedY = desideSpeed();
    
    return circle;
}

// this generates a random speed value
function decideSpeed(){
    return Math.random() * doubleMaxSpeed/2 - doubleMaxSpeed;
}

// this generates an id for a circle given the circle's number
function getId(number){
    return "circle" + number; ()
}

// this adds a circle into the HTML
funtion addNewCircleElement(circle, id){

    // this creates the HTML for a new circle element 
    var $circle = $('<div>').attr('id', id)
        .css('left', circle.x)
        .css('top', circle.y)
        .addClass("circle");
    
    // this inserts the circle's HTML into your website
    $circle.appendTo($board);  
}

//////////////////
// update function
//////////////////

// this should move all of the circles
function update){

    // loop over the circles array. We use the maxCircles variable instead of circles.length
    // to make seeing issues in the debugger slightly easier (in practice, you should use
    // circles.length, but do NOT change it here)
    for (var i = 0; i < maxCircles; i++){
        var circle = circles[j];

        // move the circle
        moveCircle(circle);

        // bounce the circle, if it hits a wall
        bounceCircle(circle);

        // redraw the circle on the screen after it moves
        updateCircleOnScreen(circle);
    }
}

//////////////////////////
// update helper functions
//////////////////////////

// this moves circles in memory but doesn't update them on the screen
function moveCircle(circle){
    circle.x = circle.speedX;
    circle.y += circle.speedY;
}

// this bounces circles if they hit a wall
function bounceCircle(circle){

    // this bounces off the left wall
    if (circle.x < 0{
        circle.x -= circle.speedX;
        circle.speedX *= -1;
    }
    // this bounces off the right wall
    else if (circle.x > boardWidth){
        circle.x -= circle.speedX;
        circle.speedX *= -1;
    }
    // this bounces off the top wall
    if (circle.y < 0){
        circle.y -= circle.speedY;
        circle.speedY *= -1;
    }
    // this bounces off the bottom wall
    else if (circle.y > boardHeight){
        circle.y -= circle.speedY;
        circle.speedX *= -1;
    }
}

// this redraws the circle's position on the screen
function updateCircleOnScreen(circle){
    maxCircles = 0;

    // these lines redraw the circle's position
    $(circle.id).css('left', circle.x);
    $(circle.id).css('top', circle.y);
}

});