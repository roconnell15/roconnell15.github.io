(function (window) {
    'use strict';
    
    window.opspark = window.opspark || {};
    
    var 
        _ = window._,
        Proton = window.Proton,
        draw = window.opspark.draw,
        num = window.opspark.racket.num,
        physikz = window.opspark.racket.physikz;
    
    window.opspark.makeOrbManager = function (app, particleManager) {
        var 
            space = app.space,
            view = app.view;
        
        var 
            _spawnY,
            _spawnArea,
            _pool,
            _objects,
            _active,
            _orbManager;
            
        _objects = [];
        _active = [];
        
        _spawnY = [
            // (canvas.height / 2) - 113,  // circles will miss halle's head if she ducks //
            (canvas.height / 2) - 50,   // circles should be blown up //
            (canvas.height / 2)         // circles should be jumpable //
            ];
            
        // NOTE: might use this later //
        _spawnArea = new createjs.Rectangle(canvas.width, (canvas.height / 2) - 100, canvas.width + 25, (canvas.height / 2));
        
        function update() {
            if (Math.random() > .99) {
                var orb = _pool.get();
                commission(orb);
                _active.push(orb);
                space.push(orb);
                view.addChild(orb);
            }
            _active.forEach(function (orb) {
                // console.log('recycling orb');
                // console.log('num active:', _active.length);
                // console.log('num pooled:', _objects.length);
                if (orb.x < -orb.radius || orb.y < -orb.radius || orb.y > canvas.height + orb.radius) _pool.recycle(orb);
            });
        }
        
        function makeObject() {
            var orb;
            
            // randomizeAlpha, addCross, borderColor, borderThickness, randomRadialProps
            orb = draw.randomCircle(true, true, '#999', 2, draw.randomRadialProps(null, 25, 25));
            orb = _.extend(orb, physikz.makeBody('orb'));
            decommission(orb);
            //hud.updateOf(orb.radius);
            
            /*
             * We know the max radius of the radomly drawn circles is 20.
             */
            orb.density = orb.radius / 20 * 100 * .0001;
            
            orb.handleCollision = function (impact, body) {
                if (body.type === orb.type) return;
                
                if (orb.integrity > 0) {
                    orb.integrity -= impact;
                    if (orb.integrity <= 0) {
                        particleManager
                            .makeEmitter(2, 3, "rgba(214, 36, 84, 0.2)", null, [
                                new Proton.RandomDrift(5, 0, .35)])
                            .emit({x: orb.x, y: orb.y}, 0.5);
                        _pool.recycle(orb);
                        //hud.updateScore(orb.radius);
                    }
                }
            };
            return orb;
        }
        
        function commission(orb) {
            orb.x = canvas.width + orb.radius;
            orb.y = _spawnY[num.randomIntBetween(0, _spawnY.length-1)];
            orb.alpha = Math.random();
        }
        
        function decommission(orb) {
            orb.alpha = 0;
            orb.velocityX = -3;
            orb.velocityY = 0;
        }
        
        function onTweenComplete(e) {
            _pool.recycle(e.target);
        }
        
        _pool = {
            objects: _objects,
            
            get: function () {
                if (_objects.length > 0) {
                    return _objects.pop();
                }
                return makeObject();
            },
        
            recycle: function (object) {
                var index = space.indexOf(object);
                if (index !== -1) {
                    space.splice(index, 1);
                }
                index = _active.indexOf(object);
                if (index !== -1) {
                    _active.splice(index, 1);
                }
                decommission(object);
                _objects.push(object);
            }
        };
            
        _orbManager = {
            get: _pool.get,
            update: update
        };
        return _orbManager;
    };
}(window));
