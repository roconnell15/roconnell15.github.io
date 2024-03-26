Draw
===

To assist in learning, a wrapper of the CreateJS Graphic API to reduce boiler-plate and that also supports calculation of width and height properties on shapes and composite grap.

##Installation

You can either install using bower or manually download the file and `draw-x.x.x.js` include it in your index.html.

###Bower

````
$ bower install opspark-draw
````

###index.html

Either way, ensure you include both `easeljs-0.7.1.min.js` and `draw-x.x.x.js` file within your index.html file, like so:

````html
<script src="bower_components/easeljs/lib/easeljs-0.7.1.min.js"></script>
<script src="bower_components/opspark-draw/draw-0.1.2.js"></script>
````

###Availability

Once installed, draw is available at:

````javascript
var draw = window.opspark.draw;
````

##Usage

````javascript
var shape = draw.rect(40, 40, '#CCC', null, null, 0, 0);
shape.x = 10;
view.addChild(shape);

// using should.js //
(shape.width).should.be.exactly(40);

draw.rect(10, 40, '#999', null, null, -10, 20, shape);
(shape.width).should.be.exactly(50);
(shape.height).should.be.exactly(60);

// xOffset is now -10 as the x extremity of the composite shape //
(shape.xOffset).should.be.exactly(-10);

// yOffset is still 0 because 0 is still the y extremity of the composite shape //
(shape.yOffset).should.be.exactly(0);
````

##Version

Check the `bower.json` file for current version.  Note, as of yet, some Graphic API may not be wrapped.  Check the `draw-x.x.x.js` for current available API.

##Dependencies
Check the `bower.json` file for current list of dependencies.  Dependencies will be automatically downloaded if installing via bower.