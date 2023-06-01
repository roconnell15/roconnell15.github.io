Note: These project instructions are written for Mac OSX

# Snake
Classic Snake Game

<a href = "https://output.jsbin.com/qehader" target="_blank"> Play it here:  (Right Click -> Open Link in New Tab)</a>

**Table of Contents**
- [Installation & Setup](#installation--setup)
- [Part 1 - HTML & CSS](#part-1---html--css)
  - [TODO 1: Add the initial HTML elements](#todo-1-add-the-initial-html-elements)
  - [TODO 2: Add CSS](#todo-2-add-css)
  - [TODO 3: Add JavaScript](#todo-3-add-javascript)
  - [TODO 4: Review your work](#todo-4-review-your-work)
- [Part 2 - Modeling Data & jQuery](#part-2---modeling-data--jquery)
- [Part 3 - Animation and Understanding The `update` Function](#part-3---animation-and-understanding-the-update-function)
- [Part 4 - Completing the Game's Logic](#part-4---completing-the-games-logic)
  - [TODO 5: Change the snake's direction](#todo-5-change-the-snakes-direction)
  - [TODO 6: Make the head move](#todo-6-make-the-head-move)
  - [TODO 7: Check for collisions with the wall](#todo-7-check-for-collisions-with-the-wall)
  - [TODO 8: Add the apple](#todo-8-add-the-apple)
  - [TODO 9: Check for collisions with the apple](#todo-9-check-for-collisions-with-the-apple)
  - [TODO 10: Handle Apple Collisions](#todo-10-handle-apple-collisions)
  - [TODO 11: Move the body](#todo-11-move-the-body)
  - [TODO 12: Check for snake collisions with itself](#todo-12-check-for-snake-collisions-with-itself)
  - [TODO 13: Make sure our Apple is placed only in available positions](#todo-13-make-sure-our-apple-is-placed-only-in-available-positions)

# Installation & Setup

## To download this project into your workspace:

First locate the folder in which you would like to download this code. If you need a lesson on how to navigate your file system using the Terminal, see the link below:

https://www.macworld.com/article/2042378/master-the-command-line-navigating-files-and-folders.html

Use the `cd` command to navigate to the folder you wish to use. Then:

1) Fork it (Click the "Fork" button in the top right corner of the github repository for this project and fork it to your
account
2) Click on the "Clone or Download" button and copy the github URL
3) Enter this command into your bash terminal:

```bash
git clone <paste copied URL here>
```

## To run this project:

At this point your working directory should be the folder that holds your `snake` folder. `cd` into the `snake` directory:

```bash
cd snake
```

Then, start an HTTP server which should be already installed on your machine. Enter this command:

```bash
hs
```

Then follow the link that pops up. It should look like this:

  http://127.0.0.1:8080

## Learning Objectives
- Build an app from start to finish including writing HTML, CSS, and JavaScript
- Manipulate HTML elements using the jQuery JavaScript library
- Use keyboard inputs
- Organize code using Functions

# Part 1 - HTML & CSS

## Learning Objectives
- Learn how the various files in a program are linked together in an index.html file
- Use jQuery to dynamically create HTML elements and modify their properties
- Practice using Objects and Arrays to model game components
- Learn about keyboard inputs
- Learn about Asynchronous function calls
- Learn how to organize code in a program

## TODO 1: Add the initial HTML elements

This Snake program is simple. It only has a few visual components:
- The board
- The score display
- The high score display
- The snake
- The apple

**Which of these components are static and which will be dynamic?**

The board, score display, and high score display are all static elements that
don't move throughout the program while the snake and apple will constantly be
changing.

For now, we can set up the stationary elements first. When we get to the
JavaScript portion of this project we'll deal with the snake and apple.

Between the `<body> </body>` tags add the following elements:
- A `<div></div>` element with an `id = "board"` attribute
- An `<h1></h1>` element with an `id = "score"` attribute
- Another `<h1></h1>` element with an `id = "highScore"` attribute

```html
<div id = "board"> </div>
<h1 id = "score"> Score: 0 </h1>
<h1 id = "highScore"> High Score: 0 </h1>
```

**Save your code and run the `index.html` file (or start your server, or refresh your running application page if it is already running).**

At this point your screen should be blank except for the score and the high score.

## TODO 2: Add CSS

Open up the file `index.css`. Here, you'll find that we've already defined some CSS rules for the various components of the game. But why is our page unstyled?

Since our server is only running the `index.html` file, it doesn't have access to the `index.css` file by default - we need to link it!

Inside the `<head>` element, add the following HTML:

```html
<link rel="stylesheet" type="text/css" href="index.css">
```

In previous projects (like Bouncing Box), we had the HTML, CSS, and JavaScript all living in one file. While this is possible, it is best practice to separate  each language into their own files. 

**Save your code and run the `index.html` file (or start your server, or refresh your running application page if it is already running).**

Now, we can see the board as a square with a border! Feel free to modify this CSS to suit your own style, though it may be best to wait until after the project to do so.

## TODO 3: Add JavaScript

Now that our CSS has been linked to our HTML, we need to do the same to add JavaScript. To connect our `index.js` file, we have to use the `<script>` tag. 

**At the bottom of the `index.html` file, _below_ the  `<body></body>` tags and above the closing `</html>` tag, add the following HTML**:

```html
<script src="index.js"></script>
```

Why are we not adding this tag in the `<head>`?


When the browser loads our `index.html` file, it starts at the top of the file
and reads each line one at a time until it reaches the bottom. When it gets to
an externally loaded file, it must first read through that entire file before
moving on to the next line in our HTML.

This becomes a problem if our JavaScript file relies on manipulating _existing_ HTML content on the page. If those elements have not yet been loaded in yet, our JavaScript file will throw some errors. 
We have to wait for those elements to be loaded _before_  we can load in the `index.js` file. So, we have to link this file at the bottom of our page, _after_ the `<body></body>` tags.

**Save your code and run the `index.html` file (or start your server, or refresh your running application page if it is already running).**

### jQuery

If you open up the console, you will notice that we have some errors. This is because our `index.js` file uses jQuery which we haven't loaded into the `index.html` file yet.

The jQuery code has been downloaded for you in the file `jQuery.min.js`. Back in the `<head>` element, add the following HTML:

```html
<script src="jquery.min.js"></script>
```

Technically, this tag can be added anywhere _above_ the `index.js` file however it is best practice to load in external scripts in the `<head>` aside from the `index.js` file.

**Save your code and run the `index.html` file (or start your server, or refresh your running application page if it is already running).**

If you open the console you shouldn't see any errors now relating to jQuery (the `$` symbol).

## TODO 4: Review your work

Nice job! Our HTML page is now set up with all necessary files plugged in! Often
times, before you even start programming, setting up a basic file structure is
the first step. You'll want to consider what various components you'll need and 
then link them all together in the `index.html` page. As you add new components
always remember to link them to the index page!

Double check that you have followed the instructions carefully. At this point,
your HTML file should look like this:

```html
<!DOCTYPE html>
<html>

  <head>
    <title> Snake </title>
    <link rel="stylesheet" type="text/css" href="index.css">
    <script src="jquery.min.js"></script>
  </head>
  
  <body>
    <div id='board'> </div>
    <h1 id="score"> Score: 0 </h1>
    <h1 id="highScore"> High Score: 0 </h1>
  </body>
  
  <script src="index.js"></script>

</html>
```

### Recapping what we've learned
- How to link CSS and JavaScript files into an HTML file
- Why the order that you link files matters

# Part 2 - Modeling Data & jQuery

### Note: There will be no coding in Parts 2 or 3

## Modeling the Snake and the Apple with Arrays and Objects

The first step in designing a piece of software is deciding on how to model the various components of the program.

At the top of the `index.js` file, all variables required for the lifetime of the program have been declared for you. By declaring them at the top of the program, we can easily see what data will be important to keep track of for the code to follow.

You can find the `snake` and `apple` variables declared as empty Objects at the top of the `index.js` file. **Objects** are the go-to Data Type for modeling due to their easy-to-use **key:value properties** and the highly readable nature of **Dot Notation**. 

To model the Snake and Apple, we need to ask ourselves, "what information does the snake need to know about itself to create this program?". 

**Before moving on, make a list of information that might be useful for the Snake and Apple to know about.**

### **The Apple**

Modeling the Apple is quite easy. It will need the following properties:
- `apple.element`: A reference to the HTML element that represents the Apple.
- `apple.row`: A reference to the row where the Apple currently exists. 
- `apple.column`: A reference to the column where the Apple currently exists. 

The `apple.element` Object will be needed in order to make any modifications to the Apple's HTML element using **jQuery** (more on jQuery in the next section). The `apple.row` and `apple.column` properties will be useful for determining when the Snake collides with the Apple.

### **The Snake and `snakeSquares`**

Modeling the snake will be a bit trickier. Since the snake occupies multiple rows and columns, we will need multiple Objects to represent each part of the Snake. 

We can refer to each part of the snake as a `snakeSquare` Object which will have the following properties:
- `snakeSquare.element`: A reference to the HTML element that represents a part of the snake.
- `snakeSquare.row`: A reference to the row where the `snakeSquare` currently exists.
- `snakeSquare.column`: A reference to the column where the `snakeSquare` currently exists.
- `snakeSquare.direction`: A reference to the direction that this particular `snakeSquare` is currently moving in. 

The `snakeSquare.element` Object will be needed to modify the HTML element using jQuery. The `snakeSquare.row`, `snakeSquare.column`, and `snakeSquare.direction` properties will all be useful in determining the movement of that particular `snakeSquare`.

Speaking of the Snake's body, since the Snake is made up of multiple `snakeSquares` that are in a particular order, we can model the Snake's body as an Array. It will also be useful to have a quick reference for the head and tails of the snake. 

This data will be stored in the `snake` Object:
- `snake.body`: An Array containing all `snakeSquare` Objects. 
- `snake.head`: Reference to the jQuery `snakeSquare` Object at the head of the snake. Duplicate of `snake.body[0]`
- `snake.tail`: Reference to the jQuery `snakeSquare` Object at the end of the snake. Duplicate of `snake.body[snake.body.length - 1]`

## jQuery: 

### _"jQuery is a JavaScript library designed to simplify HTML DOM tree traversal and manipulation, as well as event handling, CSS animation, and Ajax"_

Simply put, jQuery allows us to manipulate HTML and CSS using JavaScript. jQuery is recognized by the`$()` function which can be used in two ways:

1) To manipulate existing HTML elements
2) To create new HTML elements

## jQuery 1: Using jQuery to interact with existing HTML elements
At the start of this project we hard coded the board, the score, and the high score HTML elements:

```html
<div id='board'> </div>
<h1 id="score"> Score: 0 </h1>
<h1 id="highScore"> High Score: 0 </h1>
```

Though we hard-coded these values to start, they will need to change slightly throughout our program:
- As the snake grows, we will need to increase the value displayed in the `#score` element
- We'll also need to add new pieces of the snake to the `#board` element
- Lastly, we will need to modify the `#highScore` element if a new high score is reached. 

Since these changes will occur based on how the user interacts with the program, we will make these changes using jQuery.

At the top of our `index.js` file in the _Variables_ section you should find these lines:

```js
// HTML jQuery Objects
var board = $('#board');
var scoreElement = $('#score');
var highScoreElement = $('#highScore');
```

Here, we are creating variables to hold references for the HTML elements that we made earlier. With these variables, we can do things like change the text of the `scoreElement`:

```js
scoreElement.text("Score: " + newScore);
```

jQuery uses very readable functions to modify content so we won't go too deep into the jQuery functions available to you. However, keep an eye out for these variables throughout our program to pick up some neat jQuery tricks!

## jQuery 2: Using jQuery to create new HTML elements

For the Snake and Apple we will be _dynamically generating_ the HTML for those elements.

Since we are creating HTML instead of referencing existing HTML we will use the `$()` function slightly differently. See if you can spot the difference between these two pieces of jQuery:

```js
var newHTMLElement = $('<div>');    // creates a new HTML element

var existingHTMLElement = $('div'); // references all existing div elements
```

Including the `<>` in the `$()` function will create a new element of the provided tag whereas leaving them out will return a reference to all elements of the specified selector (you can also select by `class` or `id` attributes).

Open the `index.js` file and find the function `makeSnakeSquare`. You should see:

```javascript
function makeSnakeSquare() {
  // make the snakeSquare.element Object with a 'snake' class and append it to the board
  snakeSquare.element = $('<div>').addClass('snake').appendTo(board);

  //... other makeSnakeSquare code
}
```

Can you follow what is happening here? `$('<div>')` creates a new `div` element, `.addClass('snake')` gives it a new class attribute, and finally we use `.appendTo(board)` to add the newly created element as a child of the `board` element.

This combination of jQuery method calls will also return a JavaScript Object that we can save in a variable to keep a reference of. This allows us to manipulate it further down the road. 

NOTE: Everything above can be applied to the Apple as well.

# Part 3 - Animation and Understanding The `update` Function

##  Animation

Videogames are, at their core, animations that are controlled by the user. Animation can be easily achieved by rapidly making changes to the appearance of the visual components on our screen - like a flipbook!

One common method for doing this can be found in the `init` function. Find this code on line 57:

```javascript
updateInterval = setInterval(update, 100);
```

The function `setInterval` works by calling the `update` function every `100` milliseconds (10 frames / second). Each time the function is called we will modify the appearance of our game. (See https://www.w3schools.com/jsref/met_win_setinterval.asp)

Let's look at the logic of this `update` function:

```javascript
function update() {
  moveSnake();
  
  if (hasHitWall() || hasCollidedWithSnake()) {
    endGame();
  }
  
  if (hasCollidedWithApple()) {
    handleAppleCollision();
  }
  
}
```    
    
On each tick of the timer we move the snake. We'll check if it has collided
with the wall, itself, or the apple. 

If it collides with the Apple, handle that collision (this includes lengthening the snake, adding a new apple, and increasing the score). 

If it collides with itself or the wall, end the game.

As you can see, we are using a lot of functions to write out the logic. This 
is a strategy to make the main logic of the program readable. 

While the logic for the `update` function is laid out, the functions it calls are incomplete. We'll need to figure out answers to these questions:
- How do you move the snake? How can we use keyboard inputs to control the head of the snake? How does the tail know how to follow the head?
- How can we know if the snake has collided with itself, the wall, or the apple?
- How can we extend the snake when it eats an apple? How can we generate a new apple in a random location?

The answer to all of these questions, we need a way to **_model_** the Snake and the Apple in Data.

# Part 4 - Completing the Game's Logic

## TODO 5: Change the snake's direction

### Step 1) A Lesson on How Keyboard Input Works

*NOTE: Part 1 of this TODO will not require any coding. Read this section thoroughly to understand how keyboard inputs are registered in this game before moving on to Part 2**

Every game provides some way for the user to have control. In this game, we will be using the keyboard to control our snake.

To make our game react to keyboard inputs, we can again use jQuery! Find this line of code in the _Setup_ section towards the top of the program:

```javascript
$('body').on('keydown', handleKeyDown);
```

This makes the `body` HTML element _listen_ for a `keydown` event and when that event occurs, the `handleKeyDown` function will be called in response. This is known as an _Asynchronous Function Call_. This means that the function `handleKeyDown` is called in response to an `event` occuring rather than as part of a sequence of code. It is also important to note that this function will not be called as part of the same animation cycle in which the `update` function is called. 

**With your game running from the `index.html` page, open the inspector, switch to the Console tab and start pressing keys**. 

You'll notice that numbers will start appearing in the console. What you are seeing are the **key codes** for the key being pressed. To make it easier to remember the key codes associated with the arrow keys, we've created the `KEY` Object for you.

```js
var KEY = {
  LEFT: 37,
  UP: 38,
  RIGHT: 39,
  DOWN: 40
};
```

Remember that we've set up our game to call the `handleKeyDown` function whenever a `keydown` event occurs. Find the `handleKeyDown` function in the _Helper Functions_ section towards the bottom and you'll see this:

```js
function handleKeyDown(event) {
  activeKey = event.which;
  console.log(activeKey);
}
```

When any kind of `event` occurs (a mouse click, a key press, scrolling, the page loading), an `event` Object is created with a ton of information about that event and passed to the function that is _listening_ for that event to occur, in our case `handleKeyDown`.

In the case of the `keydown` event, the `event.which` property tells us the **keycode** of the key that was pressed. We'll want to save this keycode to use later, hence the `activeKey` variable. 


### Step 2) Changing the Snake's Direction Based on Keyboard Input

With the `activeKey` variable saving the last pressed key we can start using that information to move our snake. At first, we might think that pressing a key should move the snake. A pseudocode solution for this might look like this:

```js
if (activeKey is the left Arrow) {
  move the snake one column left
}
```

However, in the classic Snake game, the Arrow keys only change the _**direction**_ of the snake.

Find the definition of the Function `checkForNewDirection` and you'll see the comment for `// TODO 5`.  We've started a solution for this function for you. You should see this code:

```js
if (activeKey === KEY.LEFT) { 
  snake.head.direction = "left"; 
}

// console.log(snake.head.direction);
```

**Uncomment the `console.log()`, save your code and refresh your game. Then open the console**

Right now, if you were to press the left arrow you would see the direction `"left"` printed to the console over and over again. This is because this function is called every time the `moveSnake()` function is called which is called 10 times per second by the `update` function. 

Try using the other arrow keys. See anything? 

No? Well we haven't programmed our game to react to the other arrow keys!

**Goal: using the `activeKey` variable and the `KEY` Object, program `snake.head.direction` to change according to the arrow key that is currently being pressed.**

When you are finished save your code, refresh your game and try pressing the arrow keys. Make sure that all four directions work! Finally, comment out the `console.log`. We don't want to clutter the Console.

## TODO 6: Make the head move

Now that we can control the direction our Snake _should_ move in, we can actually start moving the snake. Find `// TODO 6` in the `moveSnake` function definition.

On each call to `update`, `moveSnake()` will be called. After the `checkForNewDirection()` function is called, `snake.head.direction` will either be `"left"`, `"right"`, `"down"`, or `"down"`. Now, we will need to move the snake exactly 1 square in the direction that it is facing. 

Below `// TODO 6` add these lines of code:

```js        
if (snake.head.direction === 'left') {
  snake.head.column = snake.head.column - 1;
}
repositionSquare(snake.head);
```

The `repositionSquare` function accepts a `snakeSquare` Object and positions it on the screen according to that `snakeSquare`'s `.row` and `.column` properties. So, before we can reposition the square, we need to change either the row or column it currently is in! If we subtract `1` from the _current_ `snake.head.column` value, our snake will move `1` square to the left. 

**Goal: Determine the snake head's next row and column position based on its current row, column, and direction.**

HINT: The top row in the board is row `0` and row numbers increase as you move down. The left-most column in the board is column `0` and column numbers increase as you move to the right.

## TODO 7: Check for collisions with the wall

Now that our snake can move freely, we need to put some constraints on it. We 
don't want our snake to leave the confines of the board (sorry snake).

The next step in our games `update` logic is to check if the snake has either
collided with the walls or with itself. Let's start with the walls.

Find the function `hasHitWall`.

**Goal: This function should return true if the snake's head has collided with 
any of the four walls of the board, false otherwise.**
  
Use the following pieces of data to determine if the snake's head has collided
with one of the walls.

```javascript
ROWS                // the total number of ROWS in the board
COLUMNS             // the total number of COLUMNS in the board
snake.head.row      // the current row of snake.head
snake.head.column   // the current column of snake.head 
```

## TODO 8: Add the apple

To create an apple we can call the function `makeApple` which is defined in the
*Helper Functions* section. We want to create an apple when the game starts so
in the `init` function below `TODO 8` add this line of code:

```javascript
makeApple();
```

If you take a look at the definition of the `makeApple` function you'll see that
it finds a random position for the apple by calling the function
`getRandomAvailablePosition()`. More on that later.

**Refresh your game and try swallowing the apple with the snake**

## TODO 9: Check for collisions with the apple

Now that our `apple` has been added to the board, we need to train our snake to 
actually eat it!

Within the `update` function we can see the logic for doing this:

```javascript
if (hasCollidedWithApple()) {
    handleAppleCollision();
}
```

If the snake `hasCollidedWithApple` then we can `handleAppleCollision`. Makes 
sense! Let's start with detecting collisions with the apple.

Find the definition for the function `hasCollidedWithApple`.

**Goal: This function hould return true if the snake's head has collided with 
the apple, false otherwise**
  
Use the following pieces of data to determine if the snake's head has collided
with the apple.

```javascript
apple.row           // the current row of the apple
apple.column        // the current column of the apple
snake.head.row      // the current row of snake.head
snake.head.column   // the current column of snake.head 
```

**Save your code, refresh your game, and observe the changes!** If you did this
step properly then your snake should be able to eat the Apple.

### TODO 10: Handle Apple Collisions

You may notice that our apple eating behavior isn't perfect. Find the function 
`handleAppleCollision`. At this point it should have the following logic:

```javascript
// increase the score and update the score DOM element
score++;
scoreElement.text("Score: " + score);

// Remove existing Apple and create a new one
apple.remove();
makeApple();
```

Some things are working fine - the score is increasing, the eaten apple 
disappears and a new one is created - however our snake isn't getting any 
bigger! Instead a random green square is being added in the top left corner of 
the screen. What gives?!?

At the bottom of the function you can find this logic:

```javascript
var row = snake.tail.row + 0;
var column = snake.tail.row + 0;

// code to determine the row and column of the snakeSquare to add to the snake

makeSnakeSquare(row, column);
```

As we can see, right now we are creating a new snakeSquare at position (0, 0).

**Goal: determine the `row` and `column` where the next snakeSquare should be 
placed so that it is added on to the tail of the snake**

Use the following pieces of data to determine if the snake's head has collided
with the apple.

```javascript
snake.tail.direction    // "left" or "right" or "up" or "down"
snake.tail.row          // the current row of snake.tail
snake.tail.column       // the current column of snake.tail
```

HINT: If the snake's tail is moving right, the next snakeSquare should be one
column to the left. If the column is moving up, the next snakeSquare should be
one row below.

**NOTE: Completing this TODO will not make your snake grow properly. It will 
simply create each new snakeSquare at the point that the snake ate its first 
apple. Complete the next TODO to make your snake properly grow.**

## TODO 11: Move the body

Find the function definition for `moveSnake`.

Our program is still not working properly. When our snake eats an apple, a new
snakeSquare is added to the board in the correct location. However, each new
snakeSquare does not follow the snake! 

Add this code below the comment for `TODO: 11`:

```javascript
for ( /* code to loop through the indexes of the snake.body Array*/ ) {
    var snakeSquare = "???";
    
    var nextSnakeSquare = "???";
    var nextRow = "???";
    var nextColumn = "???";
    var nextDirection = "???";
    
    snakeSquare.direction = nextDirection;
    snakeSquare.row = nextRow;
    snakeSquare.column = nextColumn;
    repositionSquare(snakeSquare);
}
```

In order for the snake to follow the head, each snakeSquare must learn 
the position and direction of the snakeSquare that is in front of it. Since we 
want to apply this same logic to every snakeSquare in the `snake.body` Array,
iteration using a `for` loop will be very helpful!

**Goal: Reposition each snakeSquare in the `snake.body` Array and update the
direction for each snakeSquare**.

HINT 1: Before you start coding, think through how this process will work. How
can you access each `snakeSquare` in the `snake.body` Array? How do you know 
what the `nextSnakeSquare` should be?

Hint 2: The `for` loop will need to be set up in a particular way to make sure 
that each snakeSquare can follow the snake that comes before it without any data 
being prematurely overwritten.

Hint 3: Remember that the snake's head is the first entry in `snake.body` so 
make sure that your loop doesn't include index `0`!

## TODO 12: Check for snake collisions with itself

After eating a few apples our snake will be long enough to potentially run into
its own body! Try doing this and you'll notice that our snake will just breeze
right through. This is not good...

According to our logic in the `update` function, when this happens, the game is 
supposed to end! We need to fill out the `hasCollidedWithSnake` function so that
it properly detects this collision.

Find the `hasCollidedWithSnake` function. 

**Goal: This function should return true if the `snake.head` has overlapped with
any snakeSquare in `snake.body`.**

What data will you need to use to solve this problem?

Hint: Remember that the snake's head is the first entry in `snake.body` so 
make sure that you aren't comparing `snake.head` with `snake.body[0]`!


## TODO 13: Make sure our Apple is placed only in available positions

Our game is complete! Almost complete anyway...

One tiny detail, and quite an interesting problem to solve, is how to make sure
that when our apple is regenerated, it is positioned in a square on our screen
that is actually available - that is, in a position not occupied by the snake.

Find the function `getRandomAvailablePosition`.

Currently, this is its logic:
    
```javascript
var spaceIsAvailable;
var randomPosition = {};

while (!spaceIsAvailable) {
    randomPosition.column = Math.floor(Math.random() * COLUMNS);
    randomPosition.row = Math.floor(Math.random() * ROWS);
    spaceIsAvailable = true;
}

return randomPosition;
```

It seems a little weird that we have a while loop that relies on 
`spaceIsAvailable` to be `true` and part of what it does is to set it to be 
`true` every time. 

While this code may generate a random location within the confines of our board,
it does not guarantee that the space is unoccupied by the snake.

**Goal: Modify the code block in the `while` loop so that if the randomly 
generated position is occupied by any part of the snake's body, it loops again**

