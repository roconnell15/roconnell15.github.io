/* global Phaser */
(function (window) {
    'use strict';
    window.opspark = window.opspark || {};
    let opspark = window.opspark;
    
    opspark.createGame = function (create, update, renderDebug) {
        let game, config;
        
        config = {
            preload: opspark.preload,
            create: create,
            update: update,
        };
        
        function render() {
            const asset = game.player.asset;
            game.debug.bodyInfo(asset, 32, 32);
            //game.debug.spriteBounds(asset);
            game.debug.body(asset);
            if(game.projectile) {
                game.projectile.forEach(function(projectile){
                    game.debug.body(projectile);    
                });
            }
        }
        
        if (renderDebug) config.render = render;
        game = new Phaser.Game(900, 700, Phaser.AUTO, '', config);
        
        // create namespace on the game //
        game.opspark = {};
        game.opspark.init = function() {
            game.stage.backgroundColor = "#E9EEF7";
            game.physics.startSystem(Phaser.Physics.ARCADE);
            game.physics.arcade.TILE_BIAS = 2;
        };
        return game;
    };
})(window);