// This is a small program. There are only two sections. This first section is what runs
// as soon as the page loads.
$(document).ready(function () {
  render($("#display"), image);
  $("#apply").on("click", applyAndRender);
  $("#reset").on("click", resetAndRender);
});

/////////////////////////////////////////////////////////
//////// event handler functions are below here /////////
/////////////////////////////////////////////////////////

// this function resets the image to its original value; do not change this function
function resetAndRender() {
  reset();
  render($("#display"), image);
}

// this function applies the filters to the image and is where you should call
// all of your apply functions
function applyAndRender() {
  // Multiple TODOs: Call your apply function(s) here
  applyFilterNoBackground(increaseGreenByBlue);
  applyFilterNoBackground(decreaseBlue);
  applyFilter(reddify);
  // do not change the below line of code
  render($("#display"), image);
}

/////////////////////////////////////////////////////////
// "apply" and "filter" functions should go below here //
/////////////////////////////////////////////////////////

// TODO 1, 2 & 4: Create the applyFilter function here
//Iterates over the image array to apply a filter
function applyFilter(filterFunction){
  for(var x = 0; x < image.length; x++){
    var row = image[x]
    for(var y = 0; y < row.length; y++){
      var rgbString = image[x][y];
      var rgbNumbers = rgbStringToArray(rgbString);
      filterFunction(rgbNumbers);
      rgbString = rgbArrayToString(rgbNumbers);
      image[x][y] = rgbString;
    }
  }
}


// TODO 7: Create the applyFilterNoBackground function
//Keeps background grey at image[0][0]
function applyFilterNoBackground(filterFunction){
  var backgroundColor = image[0][0];
  for(var x = 0; x < image.length; x++){
    for(var y = 0; y < image[x].length; y++){
      var rgbString = image[x][y];
      if(rgbString !== backgroundColor){
      var rgbNumbers = rgbStringToArray(rgbString);
      filterFunction(rgbNumbers);
      rgbString = rgbArrayToString(rgbNumbers);
      image[x][y] = rgbString;
      }
    }
  }
}

// TODO 5: Create the keepInBounds function
//Checks for rgb values to be between 0 - 255
function keepInBounds(num){
  var max = num > 255 ? 255 : num;
  var min = num < 0 ? 0 : max;
  return min;
}

//Test keep in bounds function
// console.log(keepInBounds(-30)); // should print 0
// console.log(keepInBounds(300)); // should print 255
// console.log(keepInBounds(127)); // should print 127

// TODO 3: Create reddify function
//Applies the red filter
function reddify(arr){
  arr[RED] = 200;
}

// TODO 6: Create more filter functions
//Applies the blue and green filters
function decreaseBlue(arr){
  arr[BLUE] = keepInBounds(arr[BLUE] - 50);
}

function increaseGreenByBlue(arr){
  arr[GREEN] = keepInBounds(arr[GREEN] + arr[BLUE]);
}

// CHALLENGE code goes below here