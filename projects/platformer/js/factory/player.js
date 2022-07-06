/* global Phaser */
'use strict';
(function (window) {
    window.opspark = window.opspark || {};
    let 
        opspark = window.opspark,
        animations = {},
        spawnX = 30,
        spawnY = 600;
        
    opspark.createPlayer = function (game) {
        let 
            asset = init(game),
            _direction = 1,
            _run = createState('run'),
            _duck = createDuckState('duck'),
            _idle = createState('idle'),
            _flyingJump = createFlyingJumpState('flyingJump'),
            _stop = createStopState('stop'),
            _fire = createFireState('fire'),
            _die = createDieState('die'),
            _state = _idle;
        
        function createState(name) {
            return {
                idle: idle,
                walk: doNothing,
                duck: duck,
                run: run,
                stop: stop,
                fire: fire,
                jump: doNothing,
                flyingJump: flyingJump,
                die: die,
                onKeyUp: stop,
                onCursorLeft: run,
                onCursorRight: run,
                enter: function() { console.log(`entering ${ name }`); asset.body.setSize(22, 95, 0, -3); },
                exit: doNothing,
                getName: function() { return name; }
            };
        }
        
        
        function createDuckState(name) {
            var 
                xOffset = -6,
                yOffset = 0,
                state = createState(name);
            state.duck = doNothing;
            state.enter = function() {
                console.log(`entering ${ name }`);
                asset.body.setSize(22, 70, 0, -2);
                asset.x += xOffset * _direction;
                asset.y += yOffset;
            };
            state.exit = function() {
                asset.x -= xOffset * _direction;
                asset.y -= yOffset;
            };
            return state;
        }
        
        function createStopState(name) {
            var 
                xOffset = .5,
                yOffset = -1,
                state = createState(name);
            state.stop = doNothing;
            state.enter = function() {
                console.log(`entering ${ name }`);
                asset.body.setSize(22, 95, 0, -2);
                asset.x += xOffset * _direction;
                asset.y += yOffset;
            };
            state.exit = function() {
                asset.x -= xOffset * _direction;
                asset.y -= yOffset;
            };
            return state;
        }
        
        function createDieState(name) {
            let 
                xOffset = 8,
                yOffset = 102,
                state = createState(name);
                state.stop = state.duck = state.fire = state.idle = state.walk = state.run = 
                state.stop = state.duck = state.jump = state.flyingJump = doNothing;
            state.enter = function() {
                console.log(`entering ${ name }`);
                asset.body.setSize(22, 92, 0, -102);
                asset.x += xOffset;
                asset.y += yOffset;
            };
            state.exit = function() {
                asset.x -= xOffset * _direction;
                asset.y -= yOffset;
            };
            return state;
        }
        
        function createFireState(name) {
            let 
                xOffset = 14,
                yOffset = 9,
                state = createState(name);
                state.fire = state.duck = state.idle = state.walk = state.run = 
                state.stop = state.duck = state.jump = state.flyingJump = doNothing;
            state.enter = function() {
                console.log(`entering ${ name }`);
                asset.body.setSize(22, 100, 0, -12);
                asset.x += xOffset * _direction;
                asset.y += yOffset;
            };
            state.exit = function() {
                asset.x -= xOffset * _direction;
                asset.y -= yOffset;
            };
            return state;
        }
        
        function createFlyingJumpState(name) {
            let 
                xOffset = 17,
                yOffset = 9,
                state = createState(name);
                state.fire = state.duck = state.idle = state.walk = state.run = 
                state.stop = state.duck = state.jump = state.flyingJump = doNothing;
            state.enter = function() {
                console.log(`entering ${ name }`);
                asset.body.bounce.y = 0;
                game.add.tween(asset.body).to( { y: asset.body.y -100 }, 1000, Phaser.Easing.Linear.None, true);

                asset.body.velocity.x = 200 * _direction;
                asset.x += xOffset * _direction;
                asset.y += yOffset;
            };
            state.exit = function() {
                asset.body.bounce.y = 0.4;
                asset.x -= xOffset * _direction;
                asset.y -= yOffset;
            };
            return state;
        }
        
        /**
         * Tranistion to the idle state.
         */
        function idle() {
            asset.animations.play('idle');
            setState(_idle);
        }
        
        /**
         * Tranistion to the die state.
         */
        function die() {
            asset.animations.play('die');
            asset.animations.currentAnim.onComplete.addOnce(function() {
                console.log('die complete!');
                asset.destroy();
            }, this);
            setState(_die);
        }
        
        /**
         * Tranistion to the run state.
         */
        function run() {
            asset.scale.x = _direction;
            asset.body.velocity.x = 200 * _direction;
            asset.animations.play('run');
            setState(_run);
        }
        
        /**
         * Tranistion to the duck state.
         */
        function duck() {
            let 
                duck = animations.duck,
                onUpdate = function (anim, frame) {
                console.log(frame.index);
                // todo : remove magic number 14 //
                if (frame.index === 14) {
                    asset.animations.stop();
                }
            };
            
            duck.enableUpdate = true;
            duck.onUpdate.add(onUpdate, this);
            
            duck.play();
            // asset.animations.play('duck');
            asset.animations.currentAnim.onComplete.addOnce(function onComplete() { 
                console.log('duck complete');
                duck.onUpdate.remove(onUpdate, this);
                stop();
            }, this);
            setState(_duck);
        }
        
        /**
         * Tranistion to the stop state.
         */
        function stop() {
            asset.animations.play('stop');
            setState(_stop);
        }
        
        /**
         * Tranistion to the flying-jump state.
         */
        function flyingJump() {
            let 
                flyingJump = animations.flyingJump,
                // todo : fix magic number using mid, you'll have to find it by getting the length of the range of frames //
                mid = Math.floor(flyingJump.frameTotal / 2),
                origYOffset = asset.body.offset.y;
                console.log(`total frames: ${flyingJump.frameTotal}`);
                console.log(`origYOffset : ${origYOffset}`);
            
            asset.body.offset.x += 10 * _direction;
            asset.body.offset.y -= 30;
            asset.body.y -= 22;
            let onUpdate = function (anim, frame) {
                console.log(frame.index);
                if (frame.index < 52) {
                    console.log(`up y offset: ${asset.body.offset.y}`);
                    asset.body.offset.y -= 1;
                } else {
                    console.log(`down y offset: ${asset.body.offset.y}`);
                    asset.body.offset.x -= 1 * _direction;
                    asset.body.offset.y += 2;
                }
            };
            
            flyingJump.enableUpdate = true;
            flyingJump.onUpdate.add(onUpdate, this);
            
            flyingJump.play();
            setState(_flyingJump);
            asset.animations.currentAnim.onComplete.addOnce(function onComplete() { 
                console.log('jump complete');
                asset.body.offset.y += 24;
                flyingJump.onUpdate.remove(onUpdate, this);
                stop();
            }, this);
        }
        
        /**
         * Tranistion to the fire state.
         */
        function fire() {
            let fire = animations.fire;
            fire.enableUpdate = true;
            let i = 0;
            var onUpdate = function (anim, frame) {
                console.log(i);
                ++i;
            };
            fire.onUpdate.add(onUpdate, this);
            asset.animations.play('fire');
            setState(_fire);
            asset.animations.currentAnim.onComplete.addOnce(function() {
                console.log('fire complete!');
                fire.onUpdate.remove(onUpdate, this);
                stop();
            }, this);
        }
        
        function setState(state) {
            _state.exit();
            _state = state;
            _state.enter();
        }
        
        return {
            asset: asset,
            onKeyUp: function() { _state.onKeyUp(); },
            onCursorRight: function() { _state.onCursorRight(); },
            onCursorLeft: function() { _state.onCursorLeft(); },
            run: function() { _state.run(); },
            duck: function() { _state.duck(); },
            idle: function() { _state.idle(); },
            fire: function() { _state.fire(); },
            flyingJump: function() { _state.flyingJump(); },
            stop: function() { _state.stop(); },
            die: function() { _state.die(); },
            getStateName: function() { return _state.getName(); },
            setState: setState,
            setDirection(direction) {
                _direction = direction;
            }
        };
    };
    
    /**
     * doNothing: Prevents state transitions. 
     */ 
    function doNothing() { console.log('doing nothing!'); }
    
    function init(game) {
        let asset = game.add.sprite(spawnX, spawnY, 'halle');
        asset.anchor.setTo(.5, 1);
        
        animations.walk = asset.animations.add('walk', Phaser.Animation.generateFrameNames('walk-', 1, 30, '.png', 4), 30, true);
        animations.duck = asset.animations.add('duck', Phaser.Animation.generateFrameNames('duck-', 1, 28, '.png', 4), 30, false);
        animations.jump = asset.animations.add('jump', Phaser.Animation.generateFrameNames('jump-', 1, 24, '.png', 4), 30, false);
        animations.run = asset.animations.add('run', Phaser.Animation.generateFrameNames('run-', 1, 21, '.png', 4), 30, true);
        animations.flyingJump = asset.animations.add('flying-jump', Phaser.Animation.generateFrameNames('flying-jump-', 1, 48, '.png', 4), 30, false);
        animations.fire = asset.animations.add('fire', Phaser.Animation.generateFrameNames('lazer-', 1, 31, '.png', 4), 30, false);
        animations.stop = asset.animations.add('stop', Phaser.Animation.generateFrameNames('stop-', 1, 2, '.png', 4), 30, true);
        animations.idle = asset.animations.add('idle', Phaser.Animation.generateFrameNames('front-idle-', 1, 179, '.png', 4), 30, true);
        animations.die = asset.animations.add('die', Phaser.Animation.generateFrameNames('front-death-', 1, 64, '.png', 4), 30, false);
        
        game.player = asset;
        game.physics.arcade.enable(asset);
    
        //  Player physics properties. Give the little guy a slight bounce.
        asset.body.bounce.y = 0.4;
        asset.body.gravity.y = 900;
        // {"w":69,"h":107}
        asset.body.setSize(22, 95, 0, -3);
        asset.body.collideWorldBounds = true;
        
        return asset;
    }
})(window);
