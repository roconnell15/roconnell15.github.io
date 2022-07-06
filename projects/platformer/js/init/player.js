(function (window) {
    'use strict';
    window.opspark = window.opspark || {};
    window.opspark.player = window.opspark.player || {};
    let player = window.opspark.player, opspark = window.opspark;
    
    /**
     * init: Initialize the player and player manager. 
     */ 
    player.init = function (game) {
        game.player = opspark.createPlayer(game);
        game.playerManager = opspark.createPlayerManager(game.player, game);
    };
})(window);