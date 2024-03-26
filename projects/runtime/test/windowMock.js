const createjs = {
    Container: function() {
        return {
            removeAllChildren: function() {},
            addChild: function(child) {
                windowMock.backgroundChildren.push(child);
            },
            getBounds: function() {
                return { height: 1000, width: 1000 };
            },
            x: 0,
            y: 0
        };
    }
};
const ground = createjs.Container();
const game = {
    ground: ground,
    groundY: ground.y, 
    integrity: 0,
    score: 0,
    setDebugMode: function() {},
    getScore: function() {},
    removeGameItem: function() {},
    setGameItemFactory: function() {},
    playLevel: function() {},
    changeIntegrity: function(change) {this.integrity += change},
    createObstacle: function(radius, damage) {
        var obstacle = this.createGameItem('obstacle', radius);
        obstacle.damage = damage;
        return obstacle;
    },
    createGameItem: function(type, radius) {
        return {
            radius: radius,
            type: type,
            shrink: function() {},
            flyTo: function() {},
            fadeOut: function() {},
            removeAllChildren: function() {},
            image: undefined,
            addChild: function(gameItemImage){
                this.image = gameItemImage;
            }
        };
    },
    increaseScore: function(score) {this.score += score},
    addGameItem: function(gameItem) {
        windowMock.gameItems.push(gameItem);
    },
};
const draw = {
    line: function(fromX, fromY, toX, toY, strokeColor, strokeWidth) {
        return {type: 'line', fromX:fromX, fromY:fromY, toX:toX, toY:toY, strokeColor:strokeColor, strokeWidth:strokeWidth};
    },
    circle: function(radius, color, strokeColor, strokeWidth) {
        return {type: 'circle', radius: radius, color:color, strokeColor:strokeColor, strokeWidth:strokeWidth};
    },
    rect: function(width, height, color, strokeColor, strokeWidth) {
        return {type: 'rect', width: width, height: height, color:color, strokeColor: strokeColor, strokeWidth: strokeWidth};
    },
    bitmap: function(loc) {
        return {type: 'bitmap', loc: loc};
    },
    fps: function() {return {}},
    textfield: function() {return {}}
};

const view = createjs.Container();

const opspark = {
    app: {
        addResizeable: function() {}, 
        addUpdateable: function() {}, 
        canvas: {height: 100, width: 100},
        view: view
    },
    draw: draw,
    load: {
        url: console.log,
        json: console.log
    },
    makeApp: function() { 
        return {
            addResizeable: function() {}, 
            addUpdateable: function() {}, 
            canvas: {height: 100, width: 100},
            view: view
        }; 
    },
    createGameManager: function() {return game},
    makeBackground: function() {return {}},
    makeGround: function() {return ground},
    makeHalle: function() {return {}},
    makeHud: function() { return 'hud'},
    makeOrbManager: function() {return {}},
    makePacifier: function() {return {}},
    makeParticleManager: function() {return {}},
    makePlayerManager: function() {return {}},
    makeProjectileManager: function() {return {}},
    makeSpriteSheet: function() {return new Promise(function(resolve,reject) {})},
    racket: {
        physikz: {}, 
        num: {}
    },
    runLevelInGame: function() {return {}},
    world: {
        makeRules: function() {return {}}
    }
};

const windowMock = {
    createjs: createjs, 
    opspark: opspark,
    backgroundChildren: [], 
    gameItems: [],
    game: game
};  

// DON'T REMOVE THIS CODE //////////////////////////////////////////////////////
if((typeof process !== 'undefined') &&
    (typeof process.versions.node !== 'undefined')) {
    // here, export any references you need for tests //
    module.exports = windowMock;
}