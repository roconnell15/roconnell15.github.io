// mock a global window object //

const
    expect = require('chai').expect,
    sinon = require('sinon'),
    window = require('../test/windowMock.js'),
    init = require('../js/init.js'),
    background = require('../js/view/background.js'),
    level01 = require('../js/level01.js');

describe('runtime', function() {
    
    describe('JavaScript', function() {
        background(window);
        level01(window);
        
        const opspark = window.opspark;
        
        describe('init.js', function() {
            var viewSpy, hudSpy, bgSpy, gameManagerSpy, runLevelSpy;
            before(function(done) {
                viewSpy = sinon.spy(opspark.app.view, 'addChild');
                hudSpy = sinon.spy(opspark, 'makeHud');
                bgSpy = sinon.spy(opspark, 'makeBackground');
                gameManagerSpy = sinon.spy(opspark, 'createGameManager');
                runLevelSpy = sinon.spy(opspark, 'runLevelInGame');    
                init(window);
                done();
                
            });
            
            after(function(done) {
                viewSpy.restore();
                hudSpy.restore();
                bgSpy.restore();
                gameManagerSpy.restore();
                runLevelSpy.restore();
                done();
            });
            
            it('TODO 1: should create a HUD with opspark.makeHud and add it to the view', function(done) {
                expect(hudSpy.called, 'See TODO 1 - Adding The Heads-Up Display').to.be.true;
                // expect(viewSpy.calledWith('hud'), 'must pass hud object to view.addChild() to add it to the view').to.be.true;
                done();
            });
            
            it('TODO 2: should create a background with opspark.makeBackground', function(done) {
                // this should be 2 to account for calling it later in this test spec
                expect(bgSpy.called, 'See TODO 2 - Adding A Background').to.be.true;
                // expect(opspark.app.view.addChild.calledWith('background'), 'must pass background object to view.addChild() to add it to the view').to.be.true;
                done();
            });
            
            it('TODO 6: should create a game manager with opspark.createGameManager and call runLevelInGame', function(done) {
                expect(opspark.createGameManager.called, 'missing game manager').to.be.true;
                expect(opspark.runLevelInGame.called, 'call to runLevelInGame missing').to.be.true;
                done();
            });
        });
        
        describe('background.js', function() {
            const 
                draw = opspark.draw,
                app = opspark.app,
                ground = window.game.ground;
            var lineSpy, rectSpy, circleSpy, bitmapSpy, bg;
            
            before(function(done) {
                lineSpy = sinon.spy(draw, 'line');
                rectSpy = sinon.spy(draw, 'rect');
                circleSpy = sinon.spy(draw, 'circle');
                bitmapSpy = sinon.spy(draw, 'bitmap');
                // empty the backgroundChildren array
                window.backgroundChildren = [];
                bg = opspark.makeBackground(app, ground);
                
                done();
            });
            
            after(function(done) {
                lineSpy.restore();
                rectSpy.restore();
                circleSpy.restore();
                bitmapSpy.restore();
                done();
            });

            
            
            it('TODO 2: should add a background with modify the color/height of backgroundFill', function() {
                // run the student's code //
                expect(draw.rect.called).to.be.true;
                
                // remove backgroundFill from backgroundChildren as it will be tested differently than the other background objects. it should be the first background object added
                var backgroundFill = window.backgroundChildren.shift();
                
                // the first background child should be thebackground with width of the canvas, height set to groundY, and a new color
                expect(backgroundFill.width).to.equal(app.canvas.width, "the background must fill the entire width of the screen");
                expect(backgroundFill.height).to.equal(ground.y, "the background must fill the screen above groundY");
                expect(backgroundFill.color).to.not.equal('yellow', "the background color must be changed from yellow");
            });
            
            it('TODO 3: Add an image to the background and add it using background.addChild()', function() {
                // tally up all counts to the draw API and subtract 1 for the backgroundFill
                var backgroundDrawCount = draw.bitmap.callCount + draw.rect.callCount + draw.line.callCount + draw.circle.callCount - 1;
                
                expect(window.backgroundChildren.length > 0).to.be.true;
                expect(window.backgroundChildren.length).to.equal(backgroundDrawCount, 'make sure you are adding each drawn shape to the background with background.addChild(shape)');
            
                for (var i = 0; i < window.backgroundChildren.length; i++) {
                    let element = window.backgroundChildren[i];
                    expect(element.x === undefined, 'a background element is missing an x value').to.be.false;
                    expect(element.y === undefined, 'a background element is missing an y value').to.be.false;
                }
            });
            
            it('TODO 4: Add animation to your background!', function() {
                var bgXY = [];
                for (var i = 0; i < window.backgroundChildren.length; i++) {
                    let element = window.backgroundChildren[i];
                    bgXY.push({x: element.x, y: element.y});
                }
                bg.update();
                var isAnimating = false;
                for (var i = 0; i < window.backgroundChildren.length; i++) {
                    let element = window.backgroundChildren[i];
                    if (element.x != bgXY[i].x || element.y != bgXY[i].y) isAnimating = true;
                }
                expect(isAnimating, 'change the x or y position of a background object in the update function to animate your background').to.be.true;
            });
            
            it('TODO 5: Parallax Effect - You should have at least two elements moving at different speeds', function() {
                var bgInitialXY = [];
                for (var i = 0; i < window.backgroundChildren.length; i++) {
                    let element = window.backgroundChildren[i];
                    bgInitialXY.push({x: element.x, y: element.y});
                }
                bg.update();
                var speed = 0;
                var hasParallax = false;
                for (var i = 0; i < window.backgroundChildren.length; i++) {
                    let element = window.backgroundChildren[i];
                    if (element.x != bgInitialXY[i].x) {
                        if (speed && speed !== bgInitialXY[i].x - element.x) {
                            hasParallax = true;
                            break;
                        } else {
                            speed = bgInitialXY[i].x - element.x
                        }
                        
                    }
                }
                expect(hasParallax, 'you should have at least 2 background elements with different horizontal speeds').to.be.true;
            });
        });
        
        describe('level01.js', function() {
            const game = window.game;
            
            window.gameItems = [];
            window.opspark.runLevelInGame(game);
            
            var hasObstacle = false;
            var hasCustomObstacle = false;
            var hasEnemy = false;
            var hasEnemyProps = true;
            var hasCustomEnemy = false;
            var hasReward = false;
            var hasRewardProps = true;
            
            /* Iterate through all gameItems added to the game*/
            for (var i = 0; i < window.gameItems.length; i++) {
                var gameItem = window.gameItems[i];
                
                expect(gameItem.x === undefined, 'you must create all gameItems with an x value').to.be.false;
                expect(gameItem.y === undefined, 'you must create all gameItems with a y value').to.be.false;
                expect(gameItem.image === undefined, 'you must create all gameItems with an image').to.be.false;
                if (gameItem.type === 'obstacle') { 
                    expect(gameItem.damage === undefined, 'you must create obstacles with a damageFromObstacle value').to.be.false;
                    expect(gameItem.radius === undefined, 'you must create obstacles with a hitZoneSize value').to.be.false;               
                    
                    hasObstacle = true;
                    if (gameItem.image.loc != 'img/sawblade.png') {
                        hasCustomObstacle = true;
                    }
                } else if (gameItem.type === 'enemy') { // check to see that they created at least one gameItem with type enemy
                    hasEnemy = true;
                    var image = gameItem.image;
                    if (!(image.type === 'rect' && image.width === 50 && image.height === 50 && image.color === 'red')) { // check to see that they did not use the provided red square for the enemy image
                        hasCustomEnemy = true;
                    }
                    if (!gameItem.hasOwnProperty('onPlayerCollision') || !gameItem.hasOwnProperty('onProjectileCollision') || !gameItem.hasOwnProperty('velocityX')) {
                        hasEnemyProps = false;
                    } else {
                        var integrity = game.integrity;
                        gameItem.onPlayerCollision();
                        if (game.integrity >= integrity) {
                            hasEnemyProps = false;
                        }
                        
                        var score = game.score;
                        gameItem.onProjectileCollision();
                        if (game.score <= score) {
                            hasEnemyProps = false;
                        }
                    }
                } else if (gameItem.type === 'reward') {// check to see that they created at least one gameItem with type reward
                    hasReward = true;
                
                    if (!gameItem.hasOwnProperty('onPlayerCollision')) {
                        hasRewardProps = false;
                    }
                }
            }
            it('TODO 7: Create at least 1 obstacle with a radius and damage using the createObstacle method', function() {
                expect(hasObstacle, 'you must create at least 1 obstacle!').to.be.true;
            });
            
            it('TODO 10: Create at least 1 custom obstacle', function() {
                expect(hasCustomObstacle, 'you must create at least 1 custom obstacle!').to.be.true;
            });
            
            it('TODO 11: Create a gameItem of type \'enemy\'', function() {
                expect(hasEnemy, 'you must create at least 1 enemy').to.be.true;
            });
            
            it('TODO 12: Add onPlayerCollision and onProjectileCollision to your enemy', function() {
                expect(hasEnemy && hasEnemyProps, 'enemies must have velocityX defined. onPlayerCollision should lower the integrity and onProjectileCollision should increase the score!').to.be.true;
            });
            
            it('TODO 13: Design your own enemy!', function() {
                expect(hasCustomEnemy, 'you must create at least 1 unique enemy').to.be.true;
            });
            
            it('TODO 14: Create a gameItem of type \'reward\'', function() {
                expect(hasReward, 'you must create at least 1 reward!').to.be.true;
                expect(hasReward && hasRewardProps, 'reward should the onPlayerCollision method defined').to.be.true;
            });
            
        });
    });
});
