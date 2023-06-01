# Box Walker
Bouncing Box, but you control the box, and it doesn't bounce!

**Table of Contents**
- [Overview](#Overview)
  - [Learning Objectives](#learning-objectives)
  - [Project Grading](#project-grading)
- [Lesson Steps](#lesson-steps)
  - [TODO 1: Understand the Template and Change the Box](#todo-1-understand-the-template-and-change-the-box)
  - [TODO 2: Register Keyboard Inputs](#todo-2-register-keyboard-inputs)
  - [TODO 3: React to Specific Keycodes](#todo-3-react-to-specific-keycodes)
  - [TODO 4: Declare `walker` Variables](#todo-4-declare-walker-variables)
  - [TODO 5: Declare Some Helper Functions](#todo-5-declare-some-helper-functions)
  - [TODO 6: Update `speedX` and `speedY` with the Keyboard](#todo-6-update-speedX-and-speedY-with-the-keyboard)
  - [TODO 7: Reset `speedX` and `speedY` on `"keyup"`](#todo-7-reset-speedx-and-speedy-on-keyup)
  - [Challenge Ideas](#challenge-ideas)
  - [Submit Your Work](#submit-your-work)

# Overview

<img src="img/walker-demo.gif">

In this project we will be building a simple program that allows us to control the movement of a box with the arrow keys. As a challenge, try limiting the movement of the "walker" to the boundaries of the board. Then, add a second "walker" and turn the program into a game of tag!

## Learning Objectives
- Become familiar with the template repository
- Apply lesson on detecting keyboard inputs
- Make connections to the Bouncing Box program and recognize patterns
- Continue to practice using jQuery

## Push Reminder
To push to GitHub, enter the following commands in bash:
```
git add -A
git commit -m "saving walker"
git push
```

## Project Grading

### Best Practices (25 points)

1. All code in proper sections (setup, core, helpers, etc.) - 5 points
2. Use comments to describe setup and functions - 10 points
3. Use helper functions to separate concerns - 10 points

**NOTE:** Incomplete programs will receive partial credit based on the number of TODOs completed with the above best practices in place.

### Program Progress (75 points)

* TODO 1 - 5 points
* TODO 2 - 10 points
* TODO 3 - 15 points 
* TODO 4 - 10 points 
* TODO 5 - 10 points 
* TODO 6 - 10 points 
* TODO 7 - 15 points 
* Challenge 1 - 5 points (bonus)
* Challenge 2 - 5 points (bonus)
* Challenge 3 - 10 points (bonus)
**NOTE:** the bonus will not give you a score of over 100 should you earn that many points, but these challenges will help you out much later if you can do them.

# Lesson Steps

## TODO 1: Understand the Template and Change the Box

Let's begin by going through the existing code of the template and making a few minor changes

<hr>

### **File 1: The `index.html` file**

The body only has 2 elements: the `#board` and a single `#gameItem`. It should look like this:

````HTML
<body>
<div id='board'>
    <div id='gameItem'></div>
</div>
</body>
````

This produces a basic game board with a single game item on the board. If you need/want to add more, then you will need to place them on the board. 

All elements will have unique `id` attributes, which means that you can select them using the appropriate CSS selectors whenever using jQuery or CSS.

* **1a)** Change the `id` of `'gameItem'` to be `'walker'`

>**NOTE:** When you do this, the box will no longer display. This will be remedied in the next step.

<hr>

### **File 2: The `index.css` file**

The games we will build this semester will all use 2D graphics since we are limiting ourselves to HTML and CSS. Most of the shapes can be easily drawn as rectangles using the `width` and `height` properties. 

>Notice the values for the `position` properties set for the `#board` and the `#gameItem`. The parent element (`#board`) has the `position: relative` property while the child element (`#gameItem`) has the `position: absolute` property. This combo means that the child element can be placed anywhere inside the parent element by manipulating the `left` and `top` properties. 
>- `left` is the x-coordinate, or distance from the left
>- `top` is the y-coordinate, or distance from the top

Finally: Be aware that rectangles can be made into circles by adding a `border-radius` property.

* **1b)** Change the id selector `#gameItem` to `#walker` so that it matches the HTML

* **1c)** Add a `border-radius` property to the `#walker`. To make it a perfect circle, set the `border-radius` to the same value as the `width` and `height`. **You do not need to make it a perfect circle, but you do need at least a small bit of curvature.**

<hr>

### **File 3: The `index.js` file**

Look at the code written under each header. Remember:
- Setup: variable declarations, any one-off statements needed to start the program
- Core Logic: The main logic driving the program. Should delegate work to helper functions.
- Helper Functions: functions that help implement the core logic.

## TODO 2: Register Keyboard Inputs

**FIND:**
Open the `index.js` file. 

Our first task is to make our game register `"keydown"` events and respond to them. We'll keep the response simple for now until we know that our code is working.

In the SETUP section, find where the event handler's are registered (`$(document).on('eventType', handleEvent)`.

**CODE:**
* **2a)** Modify the code such that, instead of calling `handleEvent`, it calls a different function: `handleKeyDown`.
* **2b)** Make sure that it is called in response to `"keydown"` events.
* **2c)** Find the event handler function `handleEvent` and change its name to `handleKeyDown`. Inside, add a `console.log()` statement to its `{code block}` that prints the keycode of the key pressed:

Together, these components will look like this:

```js
// SETUP...
$(document).on('keydown', handleKeyDown);

// CORE LOGIC...
function handleKeyDown(event) {
  console.log(???);
}
```

>>**HINT:** How do you know _which_ key was pressed from the given `event` object? Check out <a href=https://keycode.info/>keycode.info</a> for help!

<hr> 

>**TESTING:** Save your code and refresh your game. Open the running application in a new window (see below)
>
><img src='img/pop-into-new-window.png' height=400>
>
>Open the console, then press keys to make sure that the events are properly being registered.
>
><img src='img/keycode-console.png'>

## TODO 3: React to Specific Keycodes

Now that we know our `"keydown"` events are being handled, let's figure out exactly _which_ keys are being pressed. 

* **3a)** Declare a new _constant variable_ `KEY` in the SETUP section and assign an Object to it. The object should map the following keys: `"LEFT"`, `"UP"`, `"RIGHT"`, `"DOWN"`, to their respective keycodes. For example, the keycode for the _Enter_ key is `13`:

    Example: 

    ```js
    var KEY = {
    "ENTER": 13,
    }
    ```

* **3b)** Now, modify your `handleKeyDown` function such that it can react differently to our target keys. For example, if I wanted to print out `"enter pressed"` when the _Enter_ key is pressed, I could write:

    ```js
    function handleKeyDown(event) {  
        if (event.which === KEY.ENTER) {
            console.log("enter pressed");
        }
    }
    ```

    Modify this function such that it can print out `"left pressed"` when the left arrow is pressed. Do the same for the other three arrow keys.

>**TESTING:** Save your code and refresh your application in the other window. Test it to make sure that the right messages are being printed to the console.

## TODO 4: Declare `walker` Variables

Now that we can determine which keys are being pressed, we can move on to the problem of moving the `walker` game item. 

This is actually a problem we've already solved in **Bouncing Box**. To move the box, we needed the following data:

```js
var positionX = 0; // the x-coordinate location for the box
var speedX = 0; // the speed for the box along the x-axis
```

>NOTE: The above code was for *Bouncing Box*, not for Walker, but the idea is the same.
>
>For this project, we want to be able to move along the x-axis _AND_ the y-axis.

**FIND:**
Because this involves variable declarations global to the project, it should go up in the SETUP section.

**CODE:**
* **4a)** Declare 4 variables for the `walker` game item such that we can monitor and control the following information:
   * the x-coordinate location
   * the y-coordinate location
   * the speed along the x-axis
   * the speed along the y-axis
<br>
<br>

* **4b)** Initialize each variable to hold the value `0`

## TODO 5: Declare Some Helper Functions

**READ:**
Now that we have our data tracking in place, we need to use that data to actually move the `walker` game item on each `update`. This is a problem solved in Bouncing Box.

>>**REMINDER:** The below code snippets are taken directly from *Bouncing Box* and are not the exact code that you should use here. They are merely *examples* of how to solve a similar but simpler problem.
>
>To reposition the box in Bouncing Box we wrote:
>
>```js
>positionX += speedX; // update the position of the box along the x-axis
>```
>
>And to redraw the box in the new x-location we wrote:
>
>```js
>$("#box").css("left", positionX);    // draw the box in the new location, positionX pixels away from the "left"
>```

**CODE:**
* **5a)** In the HELPER FUNCTIONS section, declare two new functions called `repositionGameItem()` and `redrawGameItem()`.
* **5b)** Reference the code above to complete these two functions such that they can reposition and redraw the GameItem to move along the x-axis AND the y-axis. 
* **5c)** Call each function on each `newFrame`.

**HINT:** Use the `"top"` CSS property to draw the box `y` pixels from the `"top"`

**HINT:** Check what the id of the GameItem is for your jQuery statements.

>Save your code and refresh the game. If you try pressing keys you'll notice that the box isn't moving. 

## TODO 6: Update `speedX` and `speedY` with the Keyboard

**READ:**
The box isn't moving yet because we initialized `speedX` and `speedY` to `0`. As long as `speedX` is `0`, the `walker` game item will not move along the x-axis. Same goes for `speedY` and the y-axis.

When we press a key, we want the `walker` game item to move in that direction which we can accomplish by, for example, setting `speedX` to some positive number when the right arrow is pressed and setting to a negative value when the left arrow is pressed. Then, on the following `newFrame`, the position of the `walker` game item will be recalculated based on the the code we wrote in TODO 4.

**CODE:**
* **6a)** Modify your `handleKeyDown` function such that when the `KEY.LEFT` key is pressed, the `speedX` is set to `-5`:

```js
if (event.which === KEY.LEFT) {
  speedX = -5;
}
```

* **6b)** Do the same for the other 3 arrow keys.

>**Question: Why does the box only move diagonally after your press the keys?**

## TODO 7: Reset `speedX` and `speedY` on `"keyup"`

**READ:**

We now have motion! However, the `walker` game item doesn't stop moving once we set it off. We need some way to stop it from moving. 

Ideally, the `walker` game item would stop moving once we release the arrow key. This `"keyup"` event can be listened for in the same way that the `"keydown"` event can be listened for.

**CODE:**
* **7a)** Similar to the code that you've already written in TODO 5, set up your program to listen for `"keyup"` events and set the `speedX` and `speedY` variables to `0` whenever the arrow keys are released.

# Challenge Ideas:

## Prevent the box from leaving the bounds of the board.

How does this new concern relate to the existing concerns?

## Add a second player that can be controlled with WASD

What will you need to add to the setup area? What will you need to add to the core logic? What new helper functions will you need?

## Detect when the two players collide to make a "tag" game. 

After the two players collide, make the player who is "it" turn red and move each player to the opposite corners of the screen.

# Submit Your Work

Submit your work regularly. Because these files are already being tracked by your GitHub repo, you can skip the "git add" step. Instead, enter the following commands:

>git commit -a -m "saving walker"
>
>git push

Congratulations on completing Walker!
