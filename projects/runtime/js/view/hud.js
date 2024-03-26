(function (window) {
    'use strict';
    
    window.opspark = window.opspark || {};
    
    var 
        draw = window.opspark.draw,
        createjs = window.createjs;
    
    /*

    Create a heads-up display for our game showing a scoreand an 
    "integrity meter" which indicates our health. The returned object is a 
    create.js container which can be added to our game using the following code:
      
        var hud = opspark.makeHud();
        view.addChild(hud);

    Once the hud has been created you can update by using the 
    following junctions:

    hud.updateScore(score) - change the current score
    hud.updateOf(maxScore) - change the display to indicate a maximum score
    hud.setIntegrity(value) - update the integrity meter. value should be 
                              between [0,100]
    hud.kill() - special animation for the integrity meter when it reaches zero
     */
    window.opspark.makeHud = function () {
        var hud, background, score, of, txtScore, integrity, integrityMeter;
        
        score = 0;
        of = 0;
        
        hud = new createjs.Container();
        
        integrity = new createjs.Container();
        background = draw.rect(104, 20, '#CCC');
        draw.rect(102, 18, '#FFF', null, null, 1, 1, background);
        integrity.addChild(background);
        
        txtScore = draw.textfield('score : 000', "19px Arial", '#666', 'left');
        hud.addChild(txtScore);
        
        integrityMeter = draw.rect(1, 16, '#3333CC');
        integrityMeter.scaleX = 100;
        integrity.addChild(integrityMeter);
        hud.addChild(integrity);
        
        layout();
        setPosition();
        
        window.addEventListener('resize', onResize, false);
        function onResize(e) {
            setPosition();
        }
        
        function layout() {
            integrityMeter.x = integrityMeter.y = 2;
            integrity.x = txtScore.getBounds().width + 4;
        }
        
        function setPosition() {
            hud.x = canvas.width - hud.getBounds().width - 2;
            hud.y = 2;
        }
        
        hud.updateScore = function (value) {
            score += value;
            txtScore.text = 'score : ' + score + ' / ' + of;
            layout();
            setPosition();
        };
        
        hud.updateOf = function (value) {
            of += value;
            txtScore.text = 'score : ' + score + ' / ' + of;
            layout();
            setPosition();
        };
        
        hud.setIntegrity = function (value) {
            if (value >= 0 && value < 101) {
                createjs.Tween.get(integrityMeter).to({scaleX:value}, 400);
                if (value === 0) hud.kill();
            }
        };
        
        hud.kill = function () {
            createjs.Tween.get(integrityMeter).to({alpha:0}, 1000);
        };
        
        return hud;
    };

}(window));