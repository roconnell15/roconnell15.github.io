/**
 * racket : Not optimally desgiend, but to assist in some gaming utility and 
 * physics for animation.
 * 
 * The racket namespace currently contains the two libraries:
 * 
 * 1. physikz: supports cheap physics and collision detection.
 * 2. num: a lib of utility methods to work with numbers.
 * 
 * dependencies: See the bower.json file for current dependency versions, and 
 * ensure you add dependencies to your index.html file, as in:
 * 
 * <script src="bower_components/lodash/lodash.min.js"></script>
 *
 */
(function (window) {
    window.opspark = window.opspark || {};
    
    function sortNumbersAscending(a, b) { return a - b; }
    
    function sortNumbersDecending(a, b) { return b - a; }
    
    function randomIntBetween(min, max) { 
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
    
    // radians = degrees * Math.PI / 180 //
    function degreesToRadians(degrees) {
        return degrees * Math.PI / 180;
    }
    
    // degrees = radians * 180 / Math.PI //
    function radiansToDegrees(radians) {
        return radians * 180 / Math.PI;
    }
    
    function getDistance(pointOne, pointTwo) {
        var distanceX = pointTwo.x - pointOne.x;
        var distanceY = pointTwo.y - pointOne.y;
        return Math.sqrt(distanceX * distanceX + distanceY * distanceY);
    }
    
    function getDistanceProperties(bodyA, bodyB) {
        var distanceX = bodyB.x - bodyA.x;
        var distanceY = bodyB.y - bodyA.y;
        return {
            bodyA: bodyA,
            bodyB: bodyB,
            distanceX: distanceX,
            distanceY: distanceY,
            distance: Math.sqrt(distanceX * distanceX + distanceY * distanceY)
        };
    }
    
    function hitTestRadial(distance, bodyA, bodyB) { 
        var radiusCombined = bodyA.radius + bodyB.radius;
        return {
            bodyA: bodyA,
            bodyB: bodyB,
            isHit: (distance < radiusCombined),
            radiusCombined: radiusCombined
        };
    }
    
    function getImpactProperties(bodyA, bodyB) {
        var combinedVolatility = bodyA.volatility + bodyB.volatility;
        var combinedDensity = bodyA.density * bodyB.density;
        return {
            bodyA: bodyA,
            bodyB: bodyB,
            combinedVolatility: combinedVolatility,
            combinedDensity: combinedDensity,
            impact: (combinedVolatility ? combinedVolatility * combinedDensity : combinedDensity)
        };
    }
    
    var racket = {
        physikz: {
            addRandomVelocity: function (body, area, multiplierX, multiplierY) {
                if (!body.integrity) { _.extend(body, this.makeBody()); }
                
                multiplierX = (multiplierX) ? multiplierX : .6;
                multiplierY = (multiplierY) ? multiplierY : .5;
                
                var tx = randomIntBetween(0, area.width);
                var ty = randomIntBetween(0, area.height);
                var dx = Math.abs(tx - body.x);
                var dy = Math.abs(ty - body.y);
                var radians = Math.atan2(dy, dx);
                body.rotation = radiansToDegrees(radians);
                
                var rotationalDirection = (Math.round(Math.random()) === 1) ? 1 : -1;
                body.rotationalVelocity = randomIntBetween(1, 3) * rotationalDirection;
                var forceX = Math.cos(radians) * (Math.random() * multiplierX);
                var forceY = Math.sin(radians) * (Math.random() * multiplierY);
                
                body.velocityX = (tx > body.x) ? forceX : -forceX;
                body.velocityY = (ty > body.y) ? forceY : -forceY;
            },
            
            updatePosition: function (body) {
                body.x += body.velocityX;
                body.y += body.velocityY;
                body.rotation += body.rotationalVelocity;
            },
            
            updateRadialPositionInArea: function (body, area) {
                var radius = body.radius;
                var w  = area.width + radius * 2;
                var h = area.height + radius * 2;
                
                body.x = (body.x + radius + body.velocityX + w) % w - radius;
                body.y = (body.y + radius + body.velocityY + h) % h - radius;
                body.rotation += body.rotationalVelocity;
            },
            
            updateRadialPositionAndReboundInArea: function (body, area) {
                var radius = body.radius;
                var top = 0;
                var left = 0;
                var right = area.width;
                var bottom = area.height;
                
                body.x += body.velocityX;
                body.y += body.velocityY;
                body.rotation += body.rotationalVelocity;
                
                if (body.x + radius > right) {
                    body.x = right - radius;
                    body.velocityX *= -1;
                    
                } else if (body.x - radius < left) {
                    body.x = left + radius;
                    body.velocityX *= -1;
                }
                
                if (body.y + radius > bottom) {
                    body.y = bottom - radius;
                    body.velocityY *= -1;
                } else if (body.y - radius < top) {
                    body.y = top + radius;
                    body.velocityY *= -1;
                }
            },
            
            /*
             * getDistance: Using the Pythagorean Theorem, returns the 
             *      distance between two points.
             *
             * @return A Number representing the distance between two points.
             */
            getDistance: getDistance,
            
            /*
             * getDistanceProperties: Using the Pythagorean Theorem, returns an 
             *      distanceobject with properties distance, distanceX, and distanceY.
             *
             * @return Object  An object with properties pointOne, pointTwo, 
             *      distance, distanceX, and distanceY.
             */
            getDistanceProperties: getDistanceProperties,
            
            /*
             * Takes to bodies, returns an object with their combinedVolatility, 
             *      combinedDensity, and impact.
             */
            getImpactProperties: getImpactProperties,
            
            /*
             * hitTestRadial: Expects the distance betwo bodies with a radius property. Returns 
             *      an object with the result of the radial hit test, with the 
             *      property isHit being true if the distance between the x/y of 
             *      the radial shapes is less than the sum of their two radius.
             *
             * @return Object
             */
            hitTestRadial: hitTestRadial,
            
            /*
             * Takes an Array of bodies to manage as the space, a hitTest 
             *      function to preform between each body in the space, and a 
             *      handleCollision function designed to respond to collision. 
             */
            updateSpace: function (space, hitTest, handleCollision) {
                for(var i = space.length - 1; i > 0; i--) {
                    var bodyA = space[i];
                    for(var j = i - 1; j > -1; j--) {
                        var bodyB = space[j];
                        var distanceProperties = getDistanceProperties(bodyA, bodyB);
                        var hitResult = hitTest(distanceProperties.distance, bodyA, bodyB);
                        if(hitResult.isHit) {
                            handleCollision(distanceProperties, hitResult, getImpactProperties(bodyA, bodyB));
                        }
                    }
                }
            },
            
            makeBody: function (type, velocityX, velocityY, rotationalVelocity, integrity, density, volatility) {
                return {
                    type: type || 'undefined',
                    velocityX: velocityX || 0,
                    velocityY: velocityY || 0,
                    rotationalVelocity: rotationalVelocity || 0,
                    integrity: integrity || 1,
                    density: density || 1,
                    volatility: volatility || 0,
                    
                    handleCollision: function (impact, body) {
                        // template method //
                    }
                };
            },
            
            degreesToRadians: degreesToRadians,
            radiansToDegrees: radiansToDegrees
        },
        
        num: {
            randomIntBetween: randomIntBetween,
            sortNumbersAscending: sortNumbersAscending,
            sortNumbersDecending: sortNumbersDecending,
            degreesToRadians: degreesToRadians,
            radiansToDegrees: radiansToDegrees
        }
    };
    window.opspark.racket = racket;
}(window));