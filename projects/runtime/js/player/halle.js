(function (window) {
    window.opspark = window.opspark || {};
    
    var 
        _ = window._,
        physikz = window.opspark.racket.physikz,
        draw = window.opspark.draw,
        createjs = window.createjs;
    
    window.opspark.makeHalle = function (spritesheet, particleManager, showHitZones) {
        var 
            _asset,
            _walk,
            _run,
            _jump,
            _jumpfly,
            _duck,
            _duckin,
            _duckout,
            _shootStart,
            _shootEnd,
            _stopside,
            _die,
            _bounds,
            _dust;
            
        /*
         * halle : A variable that holds a reference to "this" within the 
         * context of the Halle object.
         */
        var halle, hitzones;
        
        
        /*
         * Halle : The Constructor of our Halle Class.
         */
        function Halle() {
            halle = this;
            halle.Container_initialize();
            halle.initialize();
        }
        
        /*
         * Our Halle Class will inherit its properties and behaviours from the 
         * CreateJS Container Class.
         *
         * See http://www.createjs.com/Docs/EaselJS/classes/Container.html
         * 
         * It's an unfortunate way to inherit in JS, but it's our best choice with the 
         * way CreateJS is implemented.
         */
        var p = Halle.prototype = new createjs.Container();
        p.Container_initialize = p.initialize;
        
        p.initialize = function () {
            halle.setAsset(_walk);
            hitzones = new createjs.Container();
            halle.on('added', function (e) {
                halle.parent.addChild(hitzones);
                hitzones.x = halle.x;
                hitzones.y = halle.y;
                var hitHead = _.extend(draw.circle(25, 'rgba(0, 0, 0, .3'), physikz.makeBody('hitzone'));
                hitHead.y = hitHead.radius;
                var hitFace = _.extend(draw.circle(20, 'rgba(0, 0, 0, .3'), physikz.makeBody('hitzone'));
                hitFace.y = hitHead.radius * 2;
                
                // var hitzone40 = new createjs.Bitmap(window.opspark.hitzone40);
                // hitzone40.regX = hitzone40.image.width / 2;
                // hitzone40.regY = hitzone40.image.height / 2;
                // var hitBody = _.extend(hitzone40, physikz.makeBody('hitzone'));
                
                var hitBody = _.extend(draw.circle(20, 'rgba(0, 0, 0, .3'), physikz.makeBody('hitzone'));
                hitBody.radius = 20;
                hitHead.handleCollision = hitFace.handleCollision = hitBody.handleCollision = handleCollision;
                hitBody.y = hitBody.radius + hitHead.radius * 2;
                hitzones.addChild(hitHead);
                hitzones.addChild(hitFace);
                hitzones.addChild(hitBody);
                
                if (!showHitZones) {
                    hitzones.children.forEach(function(hitzone) {
                        hitzone.alpha = 0;
                    });
                }
            });
        };
        
        function handleCollision(impact, body) {
        }
        
        function setAsset(asset) {
            // var bounds = asset.getTransformedBounds();
            // var boundingBox = draw.rect(bounds.width, bounds.height, 'rgba(0, 0, 0, .3');
            halle.removeChild(_asset);
            _asset = asset;
            halle.addChild(asset);
            // halle.addChild(boundingBox);
        }
        p.setAsset = setAsset;
        
        p.jump = function(resume) {
            setAsset(_jump);
            tweenHitForAction(_jump.y + halle.y, null, 150, 150, 0, -30);
        };
        
        p.jumpfly = function() {
            setAsset(_jumpfly);
            tweenHitForAction(_jumpfly.y + halle.y, null, 150, 150, 600);
        };
        
        p.run = function() {
            setAsset(_run);
        };
        
        p.walk = function() {
            setAsset(_walk);
        };
        
        p.duck = function () {
            setAsset(_duck);
            tweenHitForAction(halle.y + halle.getBounds().height / 4, null, 100, 150, 220);
        };
        
        p.duckin = function () {
            setAsset(_duckin);
            tweenHitForDuckin(halle.y + halle.getBounds().height / 4, null, 100);
        };
        function tweenHitForDuckin(toY, toX, time) {
            createjs.Tween.get(hitzones)
                 .to({y: toY, x:toX || halle.x}, time)
                 .call(handleComplete);
            function handleComplete() {
            }
        }
        
        p.duckout = function () {
            setAsset(_duckout);
            tweenHitForDuckout(halle.y, halle.x, 220);
        };
        function tweenHitForDuckout(toY, toX, time) {
            createjs.Tween.get(hitzones)
                 .to({y: toY, x:toX || halle.x}, time)
                 .call(handleComplete);
            function handleComplete() {
            }
        }
        
        p.shoot = function () {
            setAsset(_shootStart);
            tweenHitForAction(_shootStart.y + halle.y + 20, halle.x - 30, 100, 150, 300);
        };
        
        function shootEnd() {
            setAsset(_shootEnd);
        }
        
        p.stop = function() {
            setAsset(_stopside);
        };
        
        p.die = function() {
            setAsset(_die);
        };
        
        /*
         * Returns an Array of display objects representing the 
         * hitzones of the player.
         */
        p.hitzones = function () {
            return hitzones.children;
        };
        
        p.hitzoneContainer = function() {
            return hitzones;
        }
        
        p.getProjectilePoint = function () {
            return halle.localToGlobal(35, 60);
        };
        
        function kickUpDust() {
            _dust.emit({x: halle.x + 8, y: halle.y + halle.getBounds().height}, 0.3);
        }
        p.kickUpDust = kickUpDust;
        
        function tweenHitForAction(toY, toX, timeIn, timeOut, between, toRotation) {
            createjs.Tween.get(hitzones)
                 .to({y: toY, x:toX || halle.x, rotation: toRotation || halle.rotation}, timeIn)
                 .wait(between || 0)
                 .to({y: halle.y, x: halle.x, rotation: 0}, timeOut)
                 .call(handleComplete);
            function handleComplete() {
            }
        }
        
        ////////////////////////////////////////////////////////////////////////
        // INITIALIZE ANIMATIONS ///////////////////////////////////////////////
        ////////////////////////////////////////////////////////////////////////
        
        _dust = particleManager.makeEmitter(1, 3, null, new Proton.Velocity(new Proton.Span(1, 2), new Proton.Span(0, 360), 'polar'), [new Proton.RandomDrift(5, 0)]);
        
        _walk = new createjs.Sprite(spritesheet, "walk");
        configureSprite(_walk);
        _bounds = _walk.getBounds();
            
        /*
         * Handle the jump sequence specially because its height is grater 
         * than walking. The spritesheet assets need to be modified to fix this 
         * issue - they should not leave the same bounding box, and we can  
         * animate height programmatically.
         */
        _jump = new createjs.Sprite(spritesheet, "jump");
        _jump.x = -(_jump.getBounds().width / 5) - 20;
        _jump.regX = _jump.width / 2;
        _jump.y = -(_jump.getBounds().height / 5) - 20;
        _jump.on('animationend', function (e) {
            setAsset(_walk);
            kickUpDust();
        });
        
        _jumpfly = new createjs.Sprite(spritesheet, "jumpfly");
        _jumpfly.x = -(_jumpfly.getBounds().width / 5) - 20;
        _jumpfly.regX = _jumpfly.width / 2;
        _jumpfly.y = -(_jumpfly.getBounds().height / 5) - 17;
        _jumpfly.on('animationend', function (e) {
            setAsset(_walk);
            kickUpDust();
        });
        
        _shootStart = new createjs.Sprite(spritesheet, "shootstart");
        configureSprite(_shootStart);
        _shootStart.y = -10;// -(_shootStart.getBounds().height);
        _shootStart.on('animationend', function (e) {
            halle.dispatchEvent(new createjs.Event("fire"));
            shootEnd();
        });
        
        _shootEnd = new createjs.Sprite(spritesheet, "shootend");
        configureSprite(_shootEnd);
        _shootEnd.y = -10;
        _shootEnd.on('animationend', function (e) {
            setAsset(_walk);
        });
        
        _duck = new createjs.Sprite(spritesheet, "duck");
        configureSprite(_duck);
        _duck.y = -7;
        _duck.on('animationend', function (e) {
            setAsset(_walk);
        });
        
        _duckin = new createjs.Sprite(spritesheet, "duckin");
        configureSprite(_duckin);
        _duckin.y = -7;
        _duckin.on('animationend', function (e) {
            _duckin.stop();
        });
        
        _duckout = new createjs.Sprite(spritesheet, "duckout");
        configureSprite(_duckout);
        _duckout.y = -7;
        _duckout.on('animationend', function (e) {
            setAsset(_walk);
        });
        
        _stopside = new createjs.Sprite(spritesheet, "stopside");
        configureSprite(_stopside);
        
        _run = new createjs.Sprite(spritesheet, "run");
        configureSprite(_run);
        
        _die = new createjs.Sprite(spritesheet, "diefront");
        configureSprite(_die);
        _die.x = -(_die.getBounds().width / 2) + 8;
        _die.y = -(_die.getBounds().height / 2) + 55;
        _die.on('animationend', function (e) {
            halle.removeChild(_asset);
            halle.dispatchEvent(new createjs.Event("gameover"));
        });
        
        
        function update() {
        }
        p.update = update;
        
        function move(toX, toY) {
        }
        p.move = move;
        
        function configureSprite(sprite) {
            sprite.x = -(sprite.getBounds().width / 2);
            sprite.regX = sprite.width / 2;
            // sprite.y = -(sprite.getBounds().height / 5);
            // sprite.regY = sprite.height / 2;
        }
        
        return new Halle();
    };
    
    
})(window);
