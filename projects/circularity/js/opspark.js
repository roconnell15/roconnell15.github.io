(function (window) {
    window.opspark = window.opspark || {};
    
    window.opspark.makeApp = function (updateable) {
        var 
            _stage, 
            _canvas, 
            _updateable, 
            _app;
        
        _stage  = new createjs.Stage(canvas);
        _canvas = document.getElementById('canvas');
        _updateable = (updateable) ? [].concat(updateable) : [];
        
        _app = {
            canvas: _canvas,
            stage: _stage,
            view: new createjs.Container(),
            
            addUpdateable: function(updateable) {
                _updateable.push(updateable);
                return _app;
            },
            
            removeUpdateable: function(updateable) {
                var index = _updateable.indexOf(updateable);
                if (index !== -1) {
                    _updateable.splice(index, 1);
                }
                return _app;
            },

            update: function(e) {
                for (var i = 0; i < _updateable.length; i++) {
                    _updateable[i].update();
                }
                // always update the stage last //
                _stage.update();
            }
        };
        
        
        window.addEventListener('resize', resizeCanvas, false);
        function resizeCanvas(e) {
            _canvas.width = window.innerWidth;
            _canvas.height = window.innerHeight;
            if (e) { _app.update(e) }
        }
        resizeCanvas();
        
        //_app.stage.addChild(draw.rect(canvas.width, canvas.height, null, '#4F5661', 1));
        _app.stage.addChild(_app.view);
        createjs.Ticker.setFPS(60);
        createjs.Ticker.on('tick', _app.update);

        return _app;
    };
}(window));