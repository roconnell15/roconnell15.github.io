(function (window) {
    'use strict';
    window.opspark = window.opspark || {};
    let opspark = window.opspark;
    window.opspark.platform = window.opspark.platform || {};
    
    opspark.platform.factory = function (game) {
        game.platforms = game.add.group();
        game.platforms.enableBody = true;
        
        function create(x, y, scaleX, scaleY, immovable) {
            var platform = game.platforms.create(x, y, 'platform');
            platform.scale.setTo(scaleX || 1, scaleY || 1);
            platform.body.immovable = immovable || true;
            return platform;
        }
        opspark.platform.create = create;
    };
})(window);