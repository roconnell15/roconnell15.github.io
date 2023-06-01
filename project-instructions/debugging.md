# Debugging Exercise

Practice using the Chrome debugger to find errors in the code. The code you will be working with uses techniques you might not be familiar with, but that's okay! You can still track down erros by using the debugger, and get the whole thing working!

**Table of Contents**

- [Overview](#Overview)
  - [Learning Objectives](#learning-objectives)
  - [Project Grading](#project-grading)
- [Lesson Steps](#project-steps)
  - [TODO 1: Find Extra, Missing, or Incorrect Symbols and Keywords](#todo-1-find-extra-missing-or-incorrect-symbols-and-keywords)
  - [TODO 2: Find All Typos](#todo-2-find-all-typos)
  - [TODO 3: Get the Circles Moving](#todo-3-get-the-circles-moving)
  - [TODO 4: Fix Horizontal Movement](#todo-4-fix-horizontal-movement)
  - [TODO 5: Fix Sticky Circles](#todo-5-fix-sticky-circles)
  - [Submit Your Work](#submit-your-work)

# Overview

<img src="img/working.gif">

In this project you will be fixing several bugs in a program that is otherwise already completed. Some of the bugs you will be able to find using console error messages, while others you will need to use the debugger to locate. Once complete, the project should look like the above animation.

## Learning Objectives

- Become familiar with using console error messages to find bugs
- Be exposed to common typos so that you will watch for them
- Use the debugger to walk through a program and find problems

## Push Reminder

To push to GitHub, enter the following commands in bash:

```
git add -A
git commit -m "saving debug exercise"
git push
```

## Project Grading

Each of the TODOs are weighted equally. That means that each TODO you complete is worth 20% of the credit for this project.

# Lesson Steps

Start by opening up the asd-debugging-exercise folder, and then start the live server for its HTML file. Next, open up the live server into a new tab. Then, open up the Chrome developer tools (F12). Now, you're ready to get started!

> ## IMPORTANT
>
> **DO NOT** simply go through and look for red squiggly lines. Some of them will be on parts of the code that are perfectly fine (even if it looks weird). You can easily break your program if you do not use the stack trace and debugger to find the issues.

# TODO 1: Find Extra, Missing, or Incorrect Symbols and Keywords

The first error that any debugger will find are extra/missing symbols. **This includes misspelled keywords, like `if` and `function`.** There are **FOUR** such errors in the code at the start of the project. Use the console of the developer tools to locate and fix each of these four errors.

> **NOTE:** Keep in mind that the message that appears is not always the exact issue, but it might give a clue as to the exact issue (in all of these cases, the issue will either be the exact message or immediately nearby).

# TODO 2: Find All Typos

After symbols, typos (like misspelled variable names) are the most likely error to appear next (they do not have to be, but they often are).

There are **THREE** variable/function name typos in your code. With the debugging tool, these should be easy to find.

> **NOTE:** Once again, the message displayed might not point to the exact issue, but in these cases it will always point you close to it.

# TODO 3: Get the Circles Moving

> ## READ ALL OF THIS AS YOU GO THROUGH
>
> This is your first error that you will need the debugging tool to track down.
>
> To use the debugger, go to the "Sources" tab of the developer tools and click on the `index.js` file. Then, click on the line you want to pause your code at to begin debugging, as demonstrated below.
>
> <img src="img/breakpoint.gif">
>
> Because this isn't your code and it does some things you might not be familiar with, we will tell you what line you should pause at to find this error and the next two. We will also give you a bit of a walkthrough on this one.
>
> **WHERE TO GO:** Assuming you haven't added or deleted any lines in your code, you should put a breakpoint at line 92 (`for (var i = 0; i < maxCircles; i++){`). This is the first line of the `update` function, and it is called once per frame. It handles everything related to movement, so it's a good place to start looking for movement-related errors.
>
> Put the breakpoint there by clicking on the line number in the "Sources", then refresh your page. Your code should pause at that line.
>
> > **Important:** While you are here, hover over the variables to see what they currently store. Check `i`, `maxCircles`, `circles`, and any other variables you see in the `update` function.
>
> Now, look for the following symbols:
>
> <img src="img/panel.png">
>
> Hover over each symbol (in your developer tools) to see what they are called.
>
> Click the "resume" button and re-check the values of the variables. Notice that `maxCircles` now has a value of `0`. This is causing the loop not to run anymore!
>
> Refresh your page to restart the program. Then, click on the "Step into" symbol to move the code along one step at a time. Be on the lookout for any changes to variables that might cause `maxCircles` to change. When you find it, fix it!
>
> > **WARNING:** if you click through too quickly, you might end up inside of jQuery code. If that happens, you have gone too far. Normally, you would click the "Resume" or "Step out" buttons to get out of that, but because of the nature of this error, refreshing your page might be a better option.

# TODO 4: Fix Horizontal Movement

Once you have the circles moving, you need to make it so that they can move horizontally. Now, you may have noticed this error while looking for the previous one. If you did and already fixed it, then great! If not, then follow the same steps for TODO 3, looking for what might make the circle not move left or right properly.

**DETAILED STEPS:**

1. Find the function call that you think is responsible for left and right movement and put a breakpoint there.
   > **HINT:** Look at the three function calls inside of the `update` function. Which of `moveCircle`, `bounceCircle`, and `updateCircleOnScreen` do you think would be responsible for a bug involving left and right movement?
2. Refresh the page
3. Click the "Step into" button until you either find the error, or you find code that looks like gibberish (you went too far in that case, so refresh your page and try again with either the same breakpoint or a different one)

> **NOTE:** It will be easier to find this bug if you first delete the breakpoint that you made in TODO 3, which you can do by clicking it.

> **BIG NOTE:** if you get into the jQuery code this time, just click "Resume" to get out. Your program will run again until it hits the `update` function's breakpoint again. After all, that function is called once per frame, so it will always end up back there if you just let it run!

# TODO 5: Fix Sticky Circles

This is the final error. The circles stick to the bottom. Follow the same steps as before and see if you can figure out why and how to fix it. If you already spotted this error while trying to fix one of the previous ones, then your done! If not, then go through again and see if you can spot why the circle might not be reversing direction when it hits the bottom.

> **HINT:** Once again, think about which of the three function calls inside of `update` would be responsible for this particular bug. Good luck!

# Submit Your Work

Submit your work regularly. Because these files are already being tracked by your GitHub repo, you can skip the "git add" step. Instead, enter the following commands:

> git commit -a -m "saving debugging exercise"
>
> git push

Congratulations on using the debugger to fix a program!
