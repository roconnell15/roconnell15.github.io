(function (window) {
    window.opspark = window.opspark || {};
    
    var 
        createjs = window.createjs;
        
    window.opspark.makeApp = function (rules, updateable, resizeable) {
        var 
            _stage, 
            _canvas, 
            _resizeable,
            _updateable, 
            _app;
        
        _canvas = document.getElementById('canvas');
        _stage  = new createjs.Stage(_canvas);
        _resizeable = (resizeable) ? [].concat(resizeable) : [];
        _updateable = (updateable) ? [].concat(updateable) : [];
        
        _app = {
            canvas: _canvas,
            stage: _stage,
            space: [],
            rules: rules,
            view: new createjs.Container(),
            
            addResizeable: function(resizeable) {
                _resizeable.push(resizeable);
                return _app;
            },
            
            removeResizeable: function(resizeable) {
                var index = _updateable.indexOf(resizeable);
                if (index !== -1) {
                    _resizeable.splice(index, 1);
                }
                return _app;
            },
            
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
                _stage.update();
                _updateable.forEach(function (updateable) {
                    updateable.update();
                });
            },
            
            resize: function(e) {
                _canvas.width = window.innerWidth;
                _canvas.height = window.innerHeight;
            }
        };
        
        window.addEventListener('resize', onResize, false);
        function onResize(e) {
            _resizeable.forEach(function (resizeable) {
                resizeable.resize();
            });
            _app.update(e);
        }
        _app.resize();
        _app.addResizeable(_app);
        
        _app.stage.addChild(_app.view);
        createjs.Ticker.setFPS(60);
        createjs.Ticker.on('tick', _app.update);
        
        // createjs.Touch.enable(_canvas, true, false);

        return _app;
    };
}(window));