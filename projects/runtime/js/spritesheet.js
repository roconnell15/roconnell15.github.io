(function (window) {
    window.opspark = window.opspark || {};
    
    var 
        opspark = window.opspark,
        load = window.opspark.load,
        Promise = window.Promise,
        createjs = window.createjs;
        
    window.opspark.makeSpriteSheet = function (url) {
        var pacifier, loader, manifest, textureData;
        
        pacifier = opspark.makePacifier(document.getElementsByTagName("body")[0]);
        
        return new Promise(function(resolve, reject) {
            load.json(url).then(function(data) {
                textureData = data.texture || data;
                
                // warning: assumes we only have one image in our spritesheet //
                var imagePath = textureData.images[0];
                var dir = imagePath.substring(0, imagePath.lastIndexOf("/") + 1);
                var file = imagePath.substring(imagePath.lastIndexOf("/") + 1, imagePath.length);
                
                manifest = [
                    {src: file, id: textureData.id}
                ];
                
                loader = new createjs.LoadQueue(false);
                loader.addEventListener('complete', onLoadComplete);
                loader.loadManifest(manifest, true, '../' + dir);
                
                function onLoadComplete(e) {
                    pacifier.stop();
                    textureData.images = [loader.getResult(textureData.id)];
                    resolve(new createjs.SpriteSheet(textureData));
                }
                
            });
        });
    };
})(window);