"use strict"

const chai = require('chai'),
    assert = chai.assert,
    expect = chai.expect,
    should = chai.should(),
    sinon = require('sinon'),
    window = require('../test/windowMock.js'),
    opspark = window.opspark,
    draw = opspark.draw,
    physikz = opspark.racket.physikz,
    view = opspark.view,
    canvas = opspark.canvas,
    init = require('../js/init.js');

describe('Circularity', function() {
    let game, circle, circles, update, drawCircle, checkCirclePosition;

    before(function(done) {
        init(window);
        opspark.makeGame();
        game = window.opspark.game;
        circle = game.circle;
        circles = game.circles;
        update = game.update;
        drawCircle = game.drawCircle;
        checkCirclePosition = game.checkCirclePosition;
        done();

    });

    after(function(done) {
        done();
    });

    describe('TODO 1: should declare variables', function() {
        it('circles should be an array', function() {
            expect(circles).to.be.an('array');
        });
    });

    describe('TODO 2: should create a function to draw a circle', function() {
        var currentCircleID;
        before(function() {
            sinon.spy(draw, 'randomCircleInArea');
            sinon.spy(physikz, 'addRandomVelocity');
            sinon.spy(view, 'addChild');

            currentCircleID = window.getCircleID();
            if (typeof drawCircle === "function") {
                drawCircle();
            }
        });

        after(function() {
            draw.randomCircleInArea.restore();
            physikz.addRandomVelocity.restore();
            view.addChild.restore();
            
            // after testing drawCircle, remove the added circle from the circles array and decrement the circleID
            circles.pop();
            window.setCircleID(currentCircleID - 1);
        });

        it('should assign drawCircle to a function', function() {
            expect(drawCircle).to.be.a('function', 'drawCircle should be a function');
        });

        it("should call the draw.randomCircleInArea function to create a circle object", function() {
            // draw.randomCircleInArea should be called within drawCircle
            expect(draw.randomCircleInArea.calledOnce).to.be.true;

            // draw.randomCircleInArea should be called with the correct arguments
            var randomCircleArgs = draw.randomCircleInArea.firstCall.args;
            expect(randomCircleArgs.length).to.be.at.least(1, "should call randomCircleInArea with canvas as the first argument");
            expect(randomCircleArgs[0].name === 'canvas', 'the first argument of randomCircleInArea should be the canvas').to.be.true;
        });

        it("should call the physikz.addRandomVelocity function", function() {
            // physikz.addRandomVelocity should be called correctly
            expect(physikz.addRandomVelocity.calledOnce).to.be.true;

            var addRandomVelocityArgs = physikz.addRandomVelocity.firstCall.args;
            expect(addRandomVelocityArgs.length).to.equal(2, "should call addRandomVelocity with 2 arguments");
            expect(addRandomVelocityArgs[0].id === currentCircleID &&
                addRandomVelocityArgs[0].name === 'circle', 'should pass circle to addRandomVelocity as the first argument').to.be.true;
            expect(addRandomVelocityArgs[1].name === 'canvas', 'should pass canvas addRandomVelocity as the second arguments').to.be.true;
        });

        it('should call view.addChild', function() {
            // view.addChild should be called correctly
            expect(view.addChild.calledOnce).to.be.true;
            var addChildArgs = view.addChild.firstCall.args;
            expect(addChildArgs.length).to.equal(1, "should call addChild with 1 argument");
            expect(addChildArgs[0].id === currentCircleID &&
                addChildArgs[0].name === 'circle', 'should call addChild with the correct arguments').to.be.true;
        });

        it('should push the new circle into the circles array', function() {
            // should push circle into circles array
            expect(circles.length > 0).to.be.true;
            expect(circles[circles.length - 1].id === currentCircleID, 'should push the new circle into the circles Array').to.be.true;
        });
    });

    describe('TODO 3: should call the drawCircle function at least 5 times', function() {
        it('should call the drawCircle function at least 5 times', function() {
            expect(circles.length).to.be.at.least(5);
        });
    });

    describe('TODO 4: should update the position of all 5 circles', function() {
        beforeEach(function() {
            sinon.spy(physikz, "updatePosition");
        });
        afterEach(function(done) {
            physikz.updatePosition.restore();
            done();
        });
        it('should call physikz.updatePosition on 5 different circles', function() {
            update();
            expect(physikz.updatePosition.callCount).to.be.at.least(5);
            for (var i = 0; i < 5; i++) {
                expect(physikz.updatePosition.getCall(i).args[0].id === i).to.be.true;
            }
        });
        it('should update the position of all 5 circles', function() {
            var initialXY = [];
            var circlesMoved = 0;
            // loop through circles and store the starting x/y positions
            for (var i = 0; i < circles.length; i++) {
                initialXY.push({ x: circles[i].x, y: circles[i].y });
            }
            update();
            // loop through again and check to see if the x/y positions have changed
            for (var i = 0; i < circles.length; i++) {
                if (initialXY[i].x !== circles[i].x || initialXY[i].y !== circles[i].y) {
                    circlesMoved++;
                }
            }
            expect(circlesMoved).to.be.at.least(5);
        });
    });

    describe('TODO 5: should create a function to keep a circle in the bounds of a screen', function() {
        // check right boundary
        it('should move a circle to offscreen-left after moving offscreen-right', function() {
            let circle = { x: canvas.width + 5, y: 1, radius: 1 };
            checkCirclePosition(circle);
            expect(circle.x === -circle.radius).to.be.true;
        });

        it('should move a circle to offscreen-right after moving offscreen-left', function() {
            circle = { x: -5, y: 1, radius: 1 };
            checkCirclePosition(circle);
            expect(circle.x === canvas.width + circle.radius).to.be.true;
        });

        it('should move a circle to offscreen-top after moving offscreen-bottom', function() {
            circle = { x: 1, y: canvas.height + 5, radius: 1 };
            checkCirclePosition(circle);
            expect(circle.y === -circle.radius).to.be.true;
        });

        it('should move a circle to offscreen-bottom after moving offscreen-top', function() {
            circle = { x: 1, y: -5, radius: 1 };
            checkCirclePosition(circle);
            expect(circle.y === canvas.height + circle.radius).to.be.true;
        });
    });

    describe('TODO 6: Call checkCirclePosition on each of your circles', function() {
        before(function() {
            sinon.spy(game, 'checkCirclePosition');
        });

        after(function(done) {
            game.checkCirclePosition.restore();
            done();
        });

        it('should call checkCirclePosition 5 times', function() {
            update();
            expect(game.checkCirclePosition.callCount).to.be.at.least(5);
        });

        it('should call checkCirclePosition on 5 different circles', function() {
            // every circle has an id number starting at 0
            for (var i = 0; i < 5; i++) {
                expect(game.checkCirclePosition.getCall(i).args[0].id === i).to.be.true;
            }
        });
    });
    
    describe('TODO 7: Create a loop to draw 100 circles', function() {
        var isRepetitive;
        before(function() {
            var makeGameString = opspark.makeGame.toString().replace(/\s+/g, '');
            var drawCircleCount = (makeGameString.match(/drawCircle\(\)/g) || []).length;

            // I use 6 here because the student may have commented out their previous 5 drawCircle() calls rather than deleting them. Thus there should be at most 6 occurances of "drawCircle()"
            isRepetitive = drawCircleCount > 6;
        });

        it('should call the drawCircle function at least 100 times', function() {
            expect(circles.length).to.be.at.least(100);
        });
        
        it('should not repetitively call the drawCircle function', function() {
            expect(isRepetitive, 'drawCircle() should not appear repetitively throughout your code').to.be.false;
        });
    });

    describe('TODO 8: Iterate over the Array', function() {
        var iterates;
        before(function() {
            var updateString = game.update.toString().replace(/\s+/g, '');
            iterates = updateString.includes('varcircle=circles[i]');
        });

        it('should iterate over the circles Array and assign each element to the variable circle', function() {
            expect(iterates).to.be.true;
        });
    });

    describe('TODO 9: update the position of every circle and check their bounds', function() {
        var iterates;
        var circlesMoved = 0;
        var initialXY = [];
        
        before(function() {
            sinon.spy(physikz, "updatePosition");
            sinon.spy(game, 'checkCirclePosition');

            // loop through circles and store the starting x/y positions
            for (var i = 0; i < circles.length; i++) {
                initialXY.push({ x: circles[i].x, y: circles[i].y });
            }
            update();
        });
        
        after(function(done) {
            game.checkCirclePosition.restore();
            physikz.updatePosition.restore();
            done();
        });

        it('should call physikz.updatePosition on every circle in the circles Array', function() {
            expect(physikz.updatePosition.callCount).to.equal(circles.length);

            // loop through again and check to see if the x/y positions have changed
            for (var i = 0; i < circles.length; i++) {
                if (initialXY[i].x !== circles[i].x || initialXY[i].y !== circles[i].y) {
                    circlesMoved++;
                }
            }
            expect(circlesMoved === circles.length);
        });

        it('should call game.checkCirclePosition on every circle in the circles Array', function() {
            expect(game.checkCirclePosition.callCount).to.equal(circles.length);
        });
    });
});
