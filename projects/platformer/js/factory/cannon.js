/* global Phaser */
(function (window) {
    'use strict';
    window.opspark = window.opspark || {};
    let opspark = window.opspark;
    window.opspark.cannon = window.opspark.cannon || {};

    opspark.cannon.factory = function (game) {
        const
            assetKeyCannon = 'cannon',
            assetKeyProjectile = 'projectile',
            projectileHalfSize = 12;

        game.cannon = game.add.group();
        game.projectile = game.add.group();
        game.projectile.enableBody = true;

        function createProjectile(x, y) {
            let projectile = game.projectile.create(x, y, assetKeyProjectile);
            projectile.anchor.setTo(0.5, 0.5);
            projectile.alpha = 0;
            game.physics.arcade.enable(projectile);
            return projectile;
        }

        function configureTween(tween, projectile, cannon) {
            tween.onStart.addOnce(function () {
                projectile.alpha = 1;
            });
            tween.onComplete.addOnce(function () {
                projectile.alpha = 0;
                projectile.x = cannon.x, projectile.y = cannon.y;
            });
        }

        let create = function (type, position, delay) {
            
            if (type === "top" || type === "bottom") {
                if (position < 0 || position > game.world.width) {
                    throw new Error(`You are trying to place a cannon off the stage at ${position}, this is not allowed!`);
                }
            } else if (type === "right" || type === "left") {
                if (position < 0 || position > game.world.height) {
                    throw new Error(`You are trying to place a cannon off the stage at ${position}, this is not allowed!`);
                }
            }
            
            let tweenTo = {}, cannon, projectile, tween, x, y, angle;
            
            if (type === "top") {
                x = position, y = 40;
                angle = -180;
                tweenTo.y = game.world.height;
            } else if (type === "bottom") {
                x = position, y = game.world.height - 72;
                angle = 0;
                tweenTo.y = 0;
            } else if (type === "left") {
                x = 42, y = position;
                angle = 90;
                tweenTo.x = game.world.width;
            } else if (type === "right") {
                x = game.world.width - 42, y = position;
                angle = -90;
                tweenTo.x = 0
            } else {
                throw new Error(`${type} is not a valid cannon type`);
            }


            cannon = game.cannon.create(x, y, assetKeyCannon);
            cannon.anchor.setTo(0.5, 0.5);
            cannon.angle = angle;
            // cannon.scale.y = -1;
         
            projectile = game.projectile.create(cannon.x, cannon.y, assetKeyProjectile);
            projectile.anchor.setTo(0.5, 0.5);
            projectile.angle = angle;
            projectile.alpha = 0;

            tween = game.add.tween(projectile).to(tweenTo, 2000, null, true, delay || 0, -1);
            configureTween(tween, projectile, cannon);
            return cannon;
       
        };

        /**
         * Returns a helper for placing cannons.
         */
        opspark.cannon.create = create;
    };
})(window);