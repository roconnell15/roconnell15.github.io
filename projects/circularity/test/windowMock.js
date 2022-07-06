var circleID = 0;
const canvas = {
    name: "canvas",
    width: 100,
    height: 100
};
const view = {
    name: "view",
    addChild: function(child) {
        this.children.push(child);
    },
    children: []
}

const windowMock = {
    getCircleID: function() {
        return circleID;
    },
    setCircleID: function(x) {
        circleID = x;
    },
    opspark: {
        draw: {
            randomCircleInArea: function(area, randomizeAlpha, addCross, borderColor, borderThickness) {
                return {
                    name: "circle",
                    id: circleID++,
                    x: 0,
                    y: 0,
                    radius: 10
                }
            },
            fps: function() {return {}}
        }, 
        racket: {
            physikz: {
                addRandomVelocity: function(circle, canvas) {
                    circle.velocity = 1;
                }, 
                updatePosition: function(circle) {
                    circle.x += circle.velocity;
                    circle.y += circle.velocity;
                }
            }
        }, 
        canvas: canvas,
        view: view,
        makeApp: function() {
            return {
                canvas: canvas,
                view: view,
                addUpdateable: function(){}
            }
        }
    }
};  

// DON'T REMOVE THIS CODE //////////////////////////////////////////////////////
if((typeof process !== 'undefined') &&
    (typeof process.versions.node !== 'undefined')) {
    // here, export any references you need for tests //
    module.exports = windowMock;
}