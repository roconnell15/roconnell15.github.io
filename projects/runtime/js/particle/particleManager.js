(function (window) {
    'use strict';
    
    window.opspark = window.opspark || {};
    
    var Proton = window.Proton;
    
    window.opspark.makeParticleManager = function (stage) {
        var 
            _proton,
            _renderer,
            _particleManager;
            
        _proton = new Proton;
        _renderer = new Proton.Renderer('easel', _proton, stage);
        _renderer.start();
        
        function tick() {
            requestAnimationFrame(tick);
            _proton.update();
        }
        tick();
        
        function makeEmitter(radiusMin, radiusMax, color, velocity, behaviours) {
            var 
                emitter, 
                protonEmitter;
                
            protonEmitter = makeProtonEmitter(radiusMin, radiusMax, color, velocity, behaviours);
            
            emitter = {
                protonEmitter: protonEmitter,
                
                emit: function (point, emitTime) {
                    protonEmitter.emit(emitTime);
                    protonEmitter.p.x = point.x;
                    protonEmitter.p.y = point.y;
                },
                
                stop: function () {
                    protonEmitter.stopEmit();
                },
                
                destroy: function () {
                    _proton.removeEmitter(protonEmitter);
                }
            };
            return emitter;
        }
        
        function makeProtonEmitter(radiusMin, radiusMax, color, velocity, behaviours) {
            var emtr;
            
            emtr = new Proton.Emitter();
            emtr.rate = new Proton.Rate(new Proton.Span(1, 2), .012);
            emtr.addInitialize(velocity || new Proton.Velocity(new Proton.Span(1, 2), new Proton.Span(0, 360), 'polar'));
            emtr.addInitialize(new Proton.Mass(1));
            emtr.addInitialize(new Proton.Radius(radiusMin || 2, radiusMax|| 4));
            emtr.addInitialize(new Proton.Life(0.5, 0));
            emtr.addBehaviour(new Proton.Collision(emtr));
            emtr.addBehaviour(new Proton.Color(color || "rgba(0, 0, 0, 0.2)"));
            
            if (behaviours) {
                behaviours.forEach(function (behaviour) {
                    emtr.addBehaviour(behaviour);
                });
            }
            
            emtr.addBehaviour(new Proton.CrossZone(new Proton.RectZone(0, 0, canvas.width, canvas.height), 'bound'));
            emtr.damping = 0.02;
            
            _proton.addEmitter(emtr);
            
            return emtr;
        }
        
        /*
         * Some game defaults
         */
        function makePlayerEmitter() {
            return makeEmitter(null, null, null, new Proton.Velocity(new Proton.Span(1, 2), [45, 135, 225, 315], 'polar'));
        }
        
        _particleManager = {
            makeEmitter: makeEmitter,
            makePlayerEmitter: makePlayerEmitter,
            
            removeEmitter: function (emitter) {
                _proton.removeEmitter(emitter);
            },
            
            proton: _proton
        };
        return _particleManager;
    };
}(window));
