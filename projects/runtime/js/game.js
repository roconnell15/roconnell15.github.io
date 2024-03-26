(function (window) {
    window.opspark = window.opspark || {};

    var physikz = window.opspark.racket.physikz;
    var draw = window.opspark.draw;
    var createjs = window.createjs;

    window.opspark.createGameManager = function(app,hud) {
        var score = 0;
        var health = 100;
        var view = app.view;
        var space = app.space;

        /* increase the score within the heads-up display. Should be called
           in response to some kind of collision event, either in 
           onPlayerCollision() or onProjectileCollision()
         */
        function increaseScore(amount) {
            score += amount;
            hud.updateScore(amount);
            console.log("setting score = ",score);
        }

        function getScore() {
            return score;
        }

        // XXX: this is a glorious hack in order to get halle because
        // we forgot to pass it in originally
        function getHalle() {
            var halleObj = view.children.filter(function(c) { return !!c.jumpfly; });
            return halleObj.length > 0 ? halleObj[0] : null;
        }

        /* change the integry displayed in the hud. If the amount is positive
           the integrity will increase, and if the amount is negative the 
           integrity will decrease. If the total integrity ever goes below zero
           then hallie dies and the game ends
         */
        function changeIntegrity(amount) {
            health = Math.min(health + amount, 100);
            console.log("setting integrity = ",health);
            hud.setIntegrity(health);
            if(health <= 0) {
                hud.kill();
                halle = getHalle();
                if(halle) {
                    // prevent replay of die animation - gameover is fired once animation is complete
                    // this still does not prevent collisions from being reported
                    // but no easy way to handle this without touching a bunch of code in other places
                    halle.addEventListener("gameover", function() {
                        view.removeChild(halle);
                    });
                    halle.die();
                }
            }
        }

        hud.setIntegrity(100);
        hud.updateOf(10000);
        
        /* Create a new game item of the given type and hit radius. Each game
           item is a empty createjs container. To draw something for a game item
           create shapes and/or bitmaps and add them to container via addChild()

           Each game item may be positioned through the x/y properties.

           The item is animated according to the following properties (all of
           which default to zero)

           - velocityX : per-frame displacement in X direction
           - velocityY : per-frame displacement in Y direction
           - rotationalVelocity : rotation around origin per frame (degrees)

           Once created, an item must be added via addGameItem() in order to show
           on screen and be animated. 

           If a game item collides with another object in the game, the callback
           functions at the following properties will be invoked. 

           - onProjectileCollision
           - onPlayerCollision

           By default, these functions do nothing. 

           In response to a collision, you can call any of the following 
           behaviors

           - fadeOut() 
           - shrink() 
           - flyTo()

           See documentation on these methods
         */
        function createGameItem(type,radius) {
            var body = _.extend(new createjs.Container(),physikz.makeBody(type));
            body.radius = radius;

            body.handleCollision =  function (impact, otherBody) {
                if(body.collided) {
                    return;
                }
                body.collided = true;
                if(otherBody.type == 'hitzone') {
                    body.onPlayerCollision(body);    
                }
                else if(otherBody.type == 'projectile') {
                    body.onProjectileCollision(body);    
                }
            }

            /* Called when this game item is hit by one of halles projectiles
               for the first time 
             */
            body.onProjectileCollision = function(self) {

            }

            /* Called when this game item hits the Halle the first time */
            body.onPlayerCollision = function(self) {

            }

            /* animate this game item out of the game by fading out 
               duration is in milliseconds 
            */
            body.fadeOut = function(duration) {
                duration = duration || 100;
                removeFromSpace(body);
                createjs.Tween.get(body).to({alpha: 0}, duration).call(function() {
                    removeGameItem(body);
                });
            }

            /* animate this game item out of the game by shrinking it to nothing
               duration is in milliseconds 
            */
            body.shrink = function(duration) {
                duration = duration || 100;
                removeFromSpace(body);
                createjs.Tween.get(body).to({scaleX: 0, scaleY: 0}, duration).call(function() {
                    removeGameItem(body);
                }); 
            }

            /* animate this game item out of the game by moving it to a particular
               position
               x and y should be offscreen
               duration is in milliseconds 
            */
            body.flyTo = function(x,y,duration) {
                duration = duration || 100;
                removeFromSpace(body);
                createjs.Tween.get(body).to({x:x,y:y}, duration).call(function() {
                    removeGameItem(body);
                }); 
            }
            return body;
        }

        /* add a game item and animate it according to the following properties
            
         */
        function addGameItem(gameItem) {
            if(debugMode) {
                var hitCircle = draw.circle(gameItem.radius,'rgba(0, 0, 0, .3)');
                gameItem.addChild(hitCircle);
            }
            view.addChild(gameItem);
            space.push(gameItem);
        }

        function removeFromSpace(gameItem) {
            var ix = space.indexOf(gameItem);
            if(ix != -1) {
                space.splice(ix,1);
            }
        }

        /* remove a particular item from the game. Item will no longer be 
           visible on screen. 
        */
        function removeGameItem(gameItem) {
            var ix = space.indexOf(gameItem);
            if(ix != -1)  {
                space.splice(ix,1);
            }
            view.removeChild(gameItem);
        }

        /* Convenience routine for creating a game item that:
          
           - moves at a fixed rate 
           - cannot be destroyed 
           - does a specified amount damage when colliding with player
         */
        function createObstacle(radius,damage) {
            var gameItem = createGameItem('obstacle',radius);
            gameItem.velocityX = -2;

            gameItem.onPlayerCollision = function() {
                changeIntegrity(-damage);
            };
            return gameItem;
        }

        /* must be set before call to playLevel with function that 
           create a game item when passed an object from gameItems
         */
        var gameItemFactory;
        function setGameItemFactory(factory) {
            gameItemFactory = factory;
        }

        /* Improves performance by lazily creating objects defined in 
           levelData
         */
        function playLevel(levelData) {
            if(gameItemFactory == null) {
                throw new Error("No gameItemFactory set");
            }
            var items = levelData.gameItems.map(function(gameItem) {
                return {
                    created: false,
                    gameItem: gameItem
                };
            });
            var levelLength = levelData.totalLength || 0;
            var frameNo = 0;

            app.addUpdateable({update: function() {
                
                // lazily instantiate items just before the come onto the screen
                // to improve performance
                frameNo += 1;
                var displacement = -levelData.speed*frameNo;
                items.forEach(function(item) {
                    if(!item.created) {
                        var x1 = item.gameItem.x + displacement;
                        if(x1 < app.canvas.width+100) {
                            item.created = true;
                            var newGameItem = _.clone(item.gameItem);
                            newGameItem.x = x1;
                            gameItemFactory(newGameItem);
                        }
                    }
                });

                // remove objects that have been moved offscreen
                var offscreenLeft = view.children.filter(function(obj) {
                    return obj.x && obj.x < -100 && space.indexOf(obj) != -1;
                });
                offscreenLeft.forEach(function(item) {
                    // console.log("removed offscreen item",item)
                    removeGameItem(item);
                });
            }});
        }



        var debugMode = false;

        /* when debug mode is set to true, the hit zone will be displayed
           for each game item */
        function setDebugMode(debug) {
            debugMode = !!debug;
        }

        return {
            increaseScore: increaseScore,
            getScore: getScore,
            changeIntegrity: changeIntegrity,
            createGameItem: createGameItem,
            addGameItem: addGameItem,
            removeGameItem: removeGameItem,
            createObstacle: createObstacle,
            setGameItemFactory: setGameItemFactory,
            playLevel: playLevel,
            setDebugMode : setDebugMode,
            ground: app.ground,
            groundY: app.ground.y
        }
    }
})(window);
