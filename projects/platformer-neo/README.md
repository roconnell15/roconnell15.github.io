# Platformer-neo

### An intro to video game programming featuring Halle in a configurable platformer

**Table of Contents**

- [Objective](#objective)
  - [Requirements and Grading](#requirements-and-grading)
- [Functions](#functions)
- [Lesson Steps](#lesson-steps)
  - [TODO 0.5: Where to Code](#todo-0.5-where-to-code)
  - [TODO 1: Platforms](#todo-1-platforms)
  - [TODO 2: Collectables](#todo-2-collectables)
  - [TODO 3: Cannons](#todo-3-cannons)
  - [TODO 4: Make your level challenging](#todo-4-make-your-level-challenging)
  - [TODO 5: Go Live](#todo-5-go-live)

# Objective

The goal is to design one level of a platformer game using functions already defined for you. You will call these functions in the designated locations in order to create the platforms, add cannons, and collectables that Halle must collect. To test your project, you will need to preview the `index.html` file found in your `platformer` folder.

It's up to you to design a level that is challenging but doable.

## **Requirements and Grading**

1. 30% : You must create at least 3 cannons in different locations.
2. 30% : You must have at least 3 collectables of different types.
3. 30% : You must include at least 5 platforms
4. 10% : Your game must be playable!

<hr>

## Functions

<details> 
<summary>Click here to familiarize yourself more with functions </summary>

Functions are predefined blocks of code that can accept input, perform an action, and can return a value. They can be reused many times to perform that action on command.

A **Function Declaration** determines what data the function accepts, what operations are performed, and what value is returned.

Here is an example of a Function Declaration called `createPlatform`:

```javascript
function createPlatform(x, y, width, height) {
  platforms.push({ x, y, width, height });
}
```

This Function accepts 4 pieces of input data: `x`, `y`, `width`, and `height`, called **Parameters**. The Function uses that data to create a platform which is returned by the Function.

Function Declarations simply define how a function operates - the code is not executed until a **Function Call** is made.

Here is an example of a function call to the `createPlatform` function:

```javascript
createPlatform(400, 200, 100, 20);
```

A function call can be made by providing the same headline as the function definition but with actual data values, or **Arguments**, in the place of the parameters.

Calling the Function tells the computer to jump into the Function Declaration and execute each line written in the `{ Code Block }` replacing each Parameter with an Argument.

This Function call will create a platform with an (x,y) location of `(400, 200)` with a width of `100` and a height of `20`.

</details>
<br>

# Lesson Steps (Must read ALL parts of this section)

## **TODO 0.5:** _Where to Code_

**FIND:**

- Open up your `platformer` folder in your file tree. Then, open up your:

  - `platformer.js` file
    - Create all of the platforms, collectables, and cannons in this file.
  - `setup.js`
    - Change the variables that control the physics of the game in this file.

- Keep your code in between the areas **ONLY CHANGE BELOW THIS POINT** and **ONLY CHANGE ABOVE THIS POINT**. This will help you make less errors. The comments you see will look something like this:

```javascript
/////////////////////////////////////////////////
//////////ONLY CHANGE BELOW THIS POINT///////////
/////////////////////////////////////////////////

createCollectable(type.steve, 200, 170, 6, 0.7); //your example function call

/////////////////////////////////////////////////
//////////ONLY CHANGE ABOVE THIS POINT///////////
/////////////////////////////////////////////////
```

**TO PREVIEW YOUR WORK:**

- Locate your `index.html` file (the one that's inside your platformer folder, **not** the one with your website!).
- Select "Preview with Live Server".
- In order to complete this project, you will need to view changes made to your code in the Live Server preview, so its recommended to keep this window open as you code your game.
Code a little, **save your work** (Command / Ctrl + s), switch back to the tab running your game and **refresh the page** (Command / Ctrl + r) to see your work!
<hr>

## **TODO 1:** _Platforms_

**FIND:**

- Locate and open the file `platformer.js`
- Find **TODO 1** in that file

**CODE:**

- Make function calls to the `createPlatform()` function to create platforms for the level.

  - `createPlatform()` takes these arguments:
    - **x**: the x coordinate for the platform
    - **y**: the y coordintate for the platorm
    - **width**: the width of the platform in pixels
    - **height**: the height of the platform in pixels

> <details> 
> <summary> Here is an example function call: </summary>
>
> ```javascript
> createPlatform(500, 300, 200, 20); // short but wide platform located 500 pixels from the left of the screen and 300 pixels from the top of the screen
> ```
>
> </details>

- **GOAL:** Add as many platforms necessary (at least 5) to make your level challenging.

### **Very Important:**

1. In most 2D games, the y-axis is inverted. This means that a y value of 500 is closer to the bottom of your screen than a y value of 100.

2. The dimensions of your game world are **1400 x 750** by default, so keep that in mind as you move forward.

<hr>

## **TODO 2:** _Collectables_

**FIND:**

- Locate and open the file `platformer.js`
- Find **TODO 2** in that file

**CODE:**

- Make function calls to the `createCollectable()` function to create collectables for the level.

  - `createCollectable()` takes these arguments:
    - **type**: the type of collectable to create
    - **x**: the x position of the collectable
    - **y**: the y positions of the collectable
    - **gravity**: (OPTIONAL) how fast the collectable accelerates downwards
    - **bounce**: (OPTIONAL) how hard the object bounces (set to 1 to bounce back to the same height)

> <details> 
> <summary> Here are example function calls: </summary>
>
> ```javascript
> createCollectable("steve", 500, 300, 20, 0.5); // creates a "steve" collectible at the coordinates (500, 300), falling with a high gravity of 20, and bouncing with 50% bounce
> createCollectable("grace", 500, 300); // creates a "grace" collectible at the coordinates (500, 300), falling with default gravity and bouncing with default bounce %
> ```
>
> </details>

- **GOAL:** Add as many collectibles as necessary (at least 3). You also need to add at least 3 **different** types to your game, and remember to make your level challenging.

> <details>
> <summary>Below are the following 'types' of collectibles you can add to your game:</summary>  
>  
> ```javascript 
> type.db 
> type.max 
> type.steve 
> type.grace 
> type.kennedi 
> ```
> </details>

<hr>

## **TODO 3:** _Cannons_

**FIND:**

- Locate and open the file `platformer.js`
- Find **TODO 3** in that file

**CODE:**

- Make function calls using the `createCannon` function to create cannons for the level.

  - The `createCannon` function takes these arguments:
    - **side**: which side the cannon will be on (can be `"left"`, `"right"`, `"top"`, or `"bottom"`)
    - **position**: how far over the cannon will be along the side
    - **delay**: how much time passes (in milliseconds) between shots

> <details> 
> <summary> Here is an example function call: </summary>
>
> ```javascript
> createCannon("left", 600, 1000); // cannon on left wall, 600px down, shooting once per second
> ```
>
> </details>

- **GOAL:** Add as many cannons as necessary (at least 3) to make your level challenging.

<hr>

## **TODO 4:** _Make your level challenging!_

Now that you have platforms, cannons, and collectables make your game unique and challenging! In order to get full credit your project must be playable! Specifically,

- It must be possible to collect all collectables
- It must require changing height to reach at least some collectables (jumping, falling, or a combination)
- It must require active avoidance of cannon projectiles (i.e. you can't put all cannons in a corner)

###

<hr>

## **TODO 5:** _Go Live_

In the first website and portfolio projects, you ran three git commands - `git add`, `git commit`, and `git push`- at the end of each project, and your code magically appeared on the internet on your own personal website. How exactly did that happen, and what is git?

> <details>
> <summary> Let's talk about Git </summary>
>
> Git is a software used for tracking changes to files and managing and controlling different versions of the same file. Git is a commonly used software for developers, and is frequently used throughout projects when changes to code are made and new features are implemented. Github uses Git to help keep track of changes to code, and when you use the `git push` command, all of the commits you have made using `git commit` are sent to Github to keep track of.
>
> You've probably heard someone say you should always back up your computer to preserve anything in case it randomly decides to crash? Running these git commands is essentially the same thing! If anything should happen to your workspace and your work gets deleted, Github saves a copy of all your work whenever you run these commands. "Git" into the habit of running these commands every day in your workspace when you are coding -- it is always better to over commit than under commit!

  </details>

For this project and all future projects, you'll commit and push work more frequently to better manage your workflow and track changes to your code (aka, backup your code).

**CODE:**

- In your bash terminal, enter the following commands, pressing ENTER after each one.

  - `git add -A`

  - `git commit -m '<message about commit>'`

    - Note: For the `<message about commit>` you can pass in any message stating the resason for why you are pushing to github. Such as, `git commit -m 'added platforms and collectables to game'`

  - `git push`

Give it a couple minutes and you should be able to view the additions to your website live on the web at `username.github.io` (Where `username` is your own GitHub username.)

<hr>

Great work! Pat yourself on the back and show off your game!
