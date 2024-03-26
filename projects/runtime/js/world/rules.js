(function (window) {
    window.opspark = window.opspark || {};
    var world = window.opspark.world = window.opspark.world || {};
    
    var physikz = window.opspark.racket.physikz;
    
    var _spring;
    
    world.makeRules = function(spring) {
        _spring = (spring ? spring : 0.009);
        
        var rules = {
            spring: _spring,
            handleCollision: handleCollision
        };
        
        return rules;
    }
    
    function handleCollision(distanceProperties, hitResult, impactProperties) {
        var bodyA, bodyB, distanceX, distanceY, distance, radiusCombined;
        
        bodyA = distanceProperties.bodyA;
        bodyB = distanceProperties.bodyB;
        distanceX = distanceProperties.distanceX;
        distanceY = distanceProperties.distanceY;
        distance = distanceProperties.distance;
        radiusCombined = hitResult.radiusCombined;
        
        var tx = bodyA.x + distanceX / distance * radiusCombined;
        var ty = bodyA.y + distanceY / distance * radiusCombined;
        var ax = (tx - bodyB.x) * _spring;
        var ay = (ty - bodyB.y) * _spring;

        // the only collisions we want to deal with are projectile and an element, 
        if(bodyB.type == 'projectile') {
            bodyA.handleCollision(impactProperties.impact, bodyB);
            bodyB.velocityX += ax;
            bodyB.velocityY += ay;
        }
        if(bodyA.type == 'projectile') {
            bodyB.handleCollision(impactProperties.impact, bodyA);
            bodyA.velocityX -= ax;
            bodyA.velocityY -= ay;
        }
    }
    
    
})(window);