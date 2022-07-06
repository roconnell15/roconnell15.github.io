// mock a global window object //
/* global window*/
window = {};

const
    _ = require('lodash'),
    expect = require('chai').expect,
    sinon = require('sinon');

describe('platformer', function() {
    describe('platform', function() {
        // REQUIRED MOCKS //
        
        /*
        * mock the opspark.platform namespace, and along the 
        * way, set the create factory method to a spy!
        */
        _.set(window, 'opspark.platform.create', sinon.spy());
        
        // platform.init() requires the game object, so mock it //
        const game = {}
        _.set(game, 'world.width', 10);
        _.set(game, 'world.height', 10);
        
        const
            /*
            * create a local reference so we don't
            * have to keep typing the full path.
            */
            platform = window.opspark.platform,
            /*
            * load the file under test: this will write
            * the init function to the platform object.
            */
            fileUnderTest = require('../js/init/platform');
        
        it('should call platform.create at least three times with at least 2 numbers', function() {
            // run the student's code //
            platform.init(game);
            
            // assert function called //
            expect(platform.create.called).to.be.true;

            // assert function is called 4 times;
            expect(platform.create.callCount).to.be.above(3);

            var xLocs = {};

            // assert each function call is made using unique and appropriate arguments
            for (let i = 0; i < platform.create.callCount; i++) {
                // assert each function is called with at least two numbers as first args //
                const spyCall = platform.create.getCall(i);
                const args = spyCall.args;
                
                expect(_.every(_.slice(args, 0, 2), arg => typeof arg === 'number'), "platform.create reaquires two number arguments").to.be.true;
                
                let xLoc = args[0],
                    yLoc = args[1];
                
                // assert each platform is in a unique location
                if (xLoc in xLocs) {
                    // if the xLocation has already been used, check to see if the yLocation has already been used as well
                    expect(xLocs[xLoc].includes(yLoc), "cannot use duplicate platform locations!").to.be.false;
                } else {
                    // if not
                    xLocs[xLoc] = [];
                }
                xLocs[xLoc].push(yLoc);   
            } 
        });
    });

    describe('cannon', function() {
        // REQUIRED MOCKS //
        
        /*
        * mock the opspark.cannon namespace, and along the 
        * way, set the create factory method to a spy!
        */
        
        _.set(window, 'opspark.cannon.create.onTop', sinon.spy());
        _.set(window, 'opspark.cannon.create.onBottom', sinon.spy());
        _.set(window, 'opspark.cannon.create.onLeft', sinon.spy());
        _.set(window, 'opspark.cannon.create.onRight', sinon.spy());
        
        // cannon.init() requires the game object, so mock it //
        const game = {}
        _.set(game, 'world.width', 10);
        _.set(game, 'world.height', 10);
        
        const
            /*
            * create a local reference so we don't
            * have to keep typing the full path.
            */
            cannon = window.opspark.cannon,
            onTop = cannon.create.onTop,
            onBottom = cannon.create.onBottom,
            onRight = cannon.create.onRight,
            onLeft = cannon.create.onLeft,
            /*
            * load the file under test: this will write
            * the init function to the cannon object.
            */
            fileUnderTest = require('../js/init/cannon');
        
        it('should call cannon.create at least three times with at least 1 number', function() {
            // run the student's code //
            cannon.init(game);

            // assert function called //
            expect(onTop.called || onBottom.called || onRight.called || onLeft.called).to.be.true;

            // assert 3 cannon create functions called;
            var cannonCount = onTop.callCount + onBottom.callCount + onLeft.callCount + onRight.callCount;
            expect(cannonCount, "must create at least 3 cannons").to.be.above(2);

            if (onTop.callCount > 0) {
                testCannonFunc(onTop);
            }
            if (onBottom.callCount > 0) {
                testCannonFunc(onBottom);
            }
            if (onLeft.callCount > 0) {
                testCannonFunc(onLeft);
            }
            if (onRight.callCount > 0) {
                testCannonFunc(onRight);
            }

            function testCannonFunc(cannonFunc) {
                var xLocs = [];
                
                for (var i = 0; i < cannonFunc.callCount; i++) {
                    // assert each function is called with at least two numbers as first args //
                    const spyCall = cannonFunc.getCall(i);
                    expect(_.every(_.slice(spyCall.args, 0, 1), arg => typeof arg === 'number')).to.be.true;
                    
                    // assert each cannon is in a unique location
                    let xLoc = spyCall.args[0];
                    expect(xLocs.includes(xLoc), "cannot have duplicate cannon locations").to.be.false

                    xLocs.push(xLoc);
                }
            }
        });
    });

    describe('collectable', function() {
        // REQUIRED MOCKS //
        
        /*
        * mock the opspark.collectable namespace, and along the 
        * way, set the create factory method to a spy!
        */
        _.set(window, 'opspark.collectable.create', sinon.spy());
        
        // collectable.init() requires the game object, so mock it //
        const game = {}
        _.set(game, 'world.width', 10);
        _.set(game, 'world.height', 10);

        // create the collectable type object. What if the student adds their own collectable? They're probably advanced enough that it's fine.
        const type = {
            db: {assetKey: 'db', points: 10},
            max: {assetKey: 'max', points: 20},
            steve: {assetKey: 'steve', points: 30},
            grace: {assetKey: 'grace', points: 40},
            kennedi: {assetKey: 'kennedi', points: 50}
        };
        
        const
            /*
            * create a local reference so we don't
            * have to keep typing the full path.
            */
            collectable = window.opspark.collectable,
            /*
            * load the file under test: this will write
            * the init function to the collectable object.
            */
            fileUnderTest = require('../js/init/collectable');
        
        it('should call collectable.create at least three times with a unique collectable type and at least 2 numbers', function() {
            // run the student's code //
            collectable.init(game);
            
            // assert function called //
            expect(collectable.create.called).to.be.true;

            // assert function is called 3 times;
            expect(collectable.create.callCount).to.be.above(2);

            var collectablesUsed = [];
            var collectableLocs = {};
            for (let i = 0; i < collectable.create.callCount; i++) {
                // assert each function is called with at least two numbers as first args //
                const spyCall = collectable.create.getCall(i);
                const args = spyCall.args;
                
                let type = args[0],
                    xLoc = args[1],
                    yLoc = args[2];
                // assert the first argument is a type object
                expect((typeof type  === "object"), "first argument must be a type object").to.be.true;                
               
                // assert the first argument is a key in the collectable type object
                expect(type.hasOwnProperty(type.assetKey), "first argument must be a collectable type").to.be.true;                
                expect(_.every(_.slice(args, 1, 3), arg => typeof arg === 'number')).to.be.true;
                
                // assert a unique collectable is used for each call (if less than 5);
                if (i < 5) {
                    expect(collectablesUsed.includes(type.assetKey), "cannot use duplicate collectable types until each is used once").to.be.false;
                }
                collectablesUsed.push(type.assetKey);

                // assert each platform is in a unique location
                if (xLoc in collectableLocs) {
                    expect(collectableLocs[xLoc].includes(yLoc), "cannot use duplicate collectable locations!").to.be.false;
                } else {
                    collectableLocs[xLoc] = [];
                }
                collectableLocs[xLoc].push(yLoc);   
                
            } 
        });
    });
});
