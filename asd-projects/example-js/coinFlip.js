function coinFlip(){

function flipThaCoin() {   
    var randomDecimal = Math.random();
    if (randomDecimal > 0.5) {
        return "heads";
    } else {
        return "tails";
    }	
}
// console.log(coinFlip());

//keep track of number of heads

var h = 0;
var t = 0;

var times = prompt("How many flips?")

//flip the coin and check for heads
for (var flips = 0; flips < times; flips++) {

if (flipThaCoin() === "heads") {
  h++;
}
else {
  t++;
}
}

alert('heads = ' + h);
alert('tails = ' + t);

}

//prints hello to the console 5 times (Good quick code challenge.)
//starts at ZERO not one.

// for (var hello = 0; hello < 5; hello++) {
//   console.log("hello");
// }

// for (var reps = 2; reps <= 10; reps += 2) {
//   console.log("Repeats 5 times.");
// }