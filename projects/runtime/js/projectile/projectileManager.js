(function (window) {
    'use strict';
    
    window.opspark = window.opspark || {};
    
    var 
        _ = window._,
        createjs = window.createjs,
        draw = window.opspark.draw,
        physikz = window.opspark.racket.physikz;
    
    window.opspark.makeProjectileManager = function (view, space, particleManager) {
        var
            _pool,
            _objects,
            _projectileManager;
            
            _objects = []; 
        
        function makeProjectile() {
            var projectile = _.extend(draw.circle(5, '#FE1EFE'), physikz.makeBody('projectile'));
            
            // TODO : get from settings JSON //
            projectile.volatility = 10;
            projectile.velocityMax = 10;
            
            projectile.handleCollision = function (impact) {
                // TODO : Consider if particles are necessary here //
                // particleManager.makeEmitter(1, 2, '#FF0000').emit({x: projectile.x, y: projectile.y}, 0.5);
            };
            
            return projectile;
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
                return makeProjectile();
            },
        
            recycle: function (object) {
                var index = space.indexOf(object);
                if (index !== -1) {
                    space.splice(index, 1);
                }
                object.x = -(object.width);
                object.alpha = 1;
                object.scaleX = object.scaleY = 1;
                _objects.push(object);
            }
        };
        
        _projectileManager = {
            fire: function (emitter) {
                var projectile, degrees;
                
                projectile = _pool.get();
                projectile.rotation = emitter.rotation;
                
                //console.log(projectile.rotation);
                
                degrees = emitter.rotation;
                projectile.velocityX = 10; //Math.cos(physikz.degreesToRadians(degrees)) * (projectile.velocityMax + emitter.velocityX || 0);
                projectile.velocityY = 0; //Math.sin(physikz.degreesToRadians(degrees)) * (projectile.velocityMax + emitter.velocityY || 0);
                projectile.rotationalVelocity = 0;
                
                //console.log(projectile.velocityX);
                //console.log(projectile.velocityY);
                
                var projectilePoint = emitter.getProjectilePoint();
                //projectile.activate();
                projectile.x = projectilePoint.x;
                projectile.y = projectilePoint.y;
                
                createjs.Tween.get(projectile, {override: true}).wait(500).to({alpha: 0, scaleX: 0.1, scaleY: 0.1}, 1000, createjs.Ease.linear).call(onTweenComplete);
                
                view.addChild(projectile);
                space.push(projectile);
            }
        };
        return _projectileManager;
    };
}(window));
