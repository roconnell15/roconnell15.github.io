$(document).ready(function () {
  /////////////////////////////////////////////////
  // SETUP SECTION - DO NOT TOUCH /////////////////
  /////////////////////////////////////////////////

  // These lines register functionality with the different buttons
  $("#cycle-left").on("click", decrementIndex);
  $("#cycle-right").on("click", incrementIndex);
  $("#execute1").on("click", staticDisplay);
  $("#execute2").on("click", goodDisplay);
  $("#execute3").on("click", badDisplay);

  // These lines handle scheduling animations
  const frameRate = 60;
  setInterval(animate, 1000 / frameRate);

  // These lines prepare an object to store animation details
  let animationDetails = {
    x: 148,
    y: 148,
    speedX: 2,
    speedY: 1,
    angle: 0,
    showCount: 60,
    show: true,
    displayType: 0,
  };

  // This line produces most of the data array and stores it in the variable "dataShapes"
  const dataShapes = generateShapeData();
  var currentIndex = 0;

  // This line sets the initial display
  resetDisplay();

  /////////////////////////////////////////////////
  // ALL OF YOUR CODE SHOULD GO BELOW HERE ////////
  /////////////////////////////////////////////////

  // TODO 1: create a new shape object and add it to the array
  

  // TODO 2: add a new property to all data shapes
  

  // TODO 3-a: add a function that handles the static display type
  

  // TODO 4-a: add a function that handles the good display type
  

  // TODO 5-a: add a function that handles the bad display type
  

  /////////////////////////////////////////////////
  // BUTTON HANDLERS BELOW HERE (3-b, 4-b, 5-b) ///
  /////////////////////////////////////////////////

  function staticDisplay() {
    // TODO 3-b: call your handleStatic function
    
  }

  function goodDisplay() {
    // TODO 4-b: call your handleGood function
    
  }

  function badDisplay() {
    // TODO 5-b: call your handleBad function
    
  }

  /////////////////////////////////////////////////
  // ALL OF YOUR CODE SHOULD GO ABOVE HERE ////////
  /////////////////////////////////////////////////

  ///////////////////////////////////////////////////
  // DO NOT TOUCH ANY OF THE BELOW CODE /////////////
  ///////////////////////////////////////////////////

  // This function generates objects for 26 of the necessary 27 entries into the dataShapes array that is used for most of this program
  function generateShapeData() {
    const data = [];
    const colors = ["red", "green", "blue"];
    const shapes = ["square", "triangle", "circle"];
    const repeats = [1, 2, 3];

    for (var i = 0; i < colors.length; i++) {
      for (var j = 0; j < shapes.length; j++) {
        for (var k = 0; k < repeats.length; k++) {
          // This condition limits the number of objects created by skipping the combo of "blue circle 3"
          if (
            i !== colors.length - 1 ||
            j !== shapes.length - 1 ||
            k !== repeats.length - 1
          ) {
            const newObj = {
              color: colors[i],
              shape: shapes[j],
              repeat: repeats[k],
            };
            data.push(newObj);
          }
        }
      }
    }

    return data;
  }

  // This function decrements the index of the currently selected object in the array (and resets the display type)
  function decrementIndex() {
    currentIndex = currentIndex ? currentIndex - 1 : dataShapes.length - 1;
    resetDisplay();
  }

  // This function increments the index of the currently selected object in the array (and resets the display type)
  function incrementIndex() {
    currentIndex =
      currentIndex === dataShapes.length - 1 ? 0 : currentIndex + 1;
    resetDisplay();
  }

  // This function resets the display type to the default display (only shows data)
  function resetDisplay() {
    const shapeData = dataShapes[currentIndex];

    // Reset all of the CSS and HTML
    $("#shape").css("background", "none");
    $("#shape").css("display", "block");
    $("#shape").css("background-size", "100% 100%");
    $("#shape").css("left", "150px");
    $("#shape").css("top", "150px");
    $("#shape").css("transform", "rotate(0deg)");
    $("#shape").html(
      `<p>${shapeData.color}</p> <p>${shapeData.shape}</p> <p>${shapeData.repeat}x${shapeData.repeat}</p>`
    );

    $("#info-bar").text(`Current index: ${currentIndex}`);

    // Reset the JavaScript Data
    animationDetails = {
      x: 148,
      y: 148,
      speedX: 2,
      speedY: 1,
      angle: 0,
      showCount: 60,
      show: true,
      displayType: 0,
    };
  }

  // The below functions set the background for the shape to be displayed
  function setBackgroundWithObject(obj) {
    $("#shape").css("background", `url(images/${obj.color}-${obj.shape}.png)`);
    setBackgroundRepeat(obj.repeat);
  }
  function setBackgroundWithSimple(color, shape, repeat) {
    $("#shape").css("background", `url(images/${color}-${shape}.png)`);
    setBackgroundRepeat(repeat);
  }
  function setBackgroundWithMixed(obj, repeat) {
    $("#shape").css("background", `url(images/${obj.color}-${obj.shape}.png)`);
    setBackgroundRepeat(repeat);
  }
  function setBackgroundRepeat(repeat) {
    $("#shape").css("background-size", `${100 / repeat}% ${100 / repeat}%`);
  }

  // This function decides which animation(s) to apply
  function animate() {
    if (animationDetails.displayType !== 0) {
      $("#shape").html("");
    }
    if (animationDetails.displayType < 2) {
      return;
    }
    if (animationDetails.displayType === 2) {
      switch (dataShapes[currentIndex].goodBehavior) {
        case "bounce":
          animateBounce();
          break;
        case "blink":
          animateBlink();
          break;
        case "spin":
          animateSpin();
          break;
      }
    } else {
      switch (dataShapes[currentIndex].goodBehavior) {
        case "bounce":
          animateBlink();
          animateSpin();
          break;
        case "blink":
          animateBounce();
          animateSpin();
          break;
        case "spin":
          animateBounce();
          animateBlink();
          break;
      }
    }
  }

  // This function animates bouncing
  function animateBounce() {
    animationDetails.x += animationDetails.speedX;
    animationDetails.y += animationDetails.speedY;
    if (
      animationDetails.x + $("#shape").width() + 8 >=
        $("#shape-container").width() ||
      animationDetails.x < 2
    ) {
      animationDetails.speedX *= -1;
    }
    if (
      animationDetails.y + $("#shape").height() + 4 >=
        $("#shape-container").height() ||
      animationDetails.y < 2
    ) {
      animationDetails.speedY *= -1;
    }
    $("#shape").css("left", animationDetails.x);
    $("#shape").css("top", animationDetails.y);
  }

  // This function animates blinking
  function animateBlink() {
    animationDetails.showCount--;
    if (animationDetails.showCount === 0) {
      animationDetails.show = !animationDetails.show;
      if (animationDetails.show) {
        $("#shape").css("display", "block");
      } else {
        $("#shape").css("display", "none");
      }
      animationDetails.showCount = 60;
    }
  }

  // This function animates spinning
  function animateSpin() {
    animationDetails.angle += 4;
    $("#shape").css("transform", `rotate(${animationDetails.angle}deg)`);
  }
});
