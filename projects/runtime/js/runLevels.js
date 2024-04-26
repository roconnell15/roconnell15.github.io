var runLevels = function (window) {
  window.opspark = window.opspark || {};

  var draw = window.opspark.draw;
  var createjs = window.createjs;
  let currentLevel = 0;

  window.opspark.runLevelInGame = function (game) {
    // some useful constants
    var groundY = game.groundY;

    // this data will allow us to define all of the
    // behavior of our game
    var levelData = window.opspark.levelData;

    // set this to true or false depending on if you want to see hitzones
    game.setDebugMode(true);

    // TODOs 5 through 11 go here
    // BEGIN EDITING YOUR CODE HERE
    function createBullet(x, y) {
      var hitZoneSize = 54;
      var damageFromObstacle = 30;
      var myObstacle = game.createObstacle(hitZoneSize, damageFromObstacle);

      myObstacle.x = x;
      myObstacle.y = y;

      game.addGameItem(myObstacle);

      var obstacleImage = draw.bitmap("img/bullet.png");

      obstacleImage.x = -hitZoneSize;
      obstacleImage.y = -hitZoneSize;

      myObstacle.addChild(obstacleImage);
    }
    function createSawBlade(x, y) {
      var hitZoneSize = 25;
      var damageFromObstacle = 10;
      var myObstacle = game.createObstacle(hitZoneSize, damageFromObstacle);

      myObstacle.x = x;
      myObstacle.y = y;

      game.addGameItem(myObstacle);

      var obstacleImage = draw.bitmap("img/sawblade.png");
      myObstacle.addChild(obstacleImage);
      obstacleImage.x = -hitZoneSize;
      obstacleImage.y = -hitZoneSize;
    }
    function createEnemy(x, y) {
      var enemy = game.createGameItem("enemy", 80);
      var lynel = draw.bitmap("img/enemy.png");
      lynel.x = -80;
      lynel.y = -80;
      enemy.addChild(lynel);
      enemy.x = x;
      enemy.y = y;
      game.addGameItem(enemy);
      enemy.velocityX = -2;
      enemy.onPlayerCollision = function () {
        game.changeIntegrity(-50);
      };
      enemy.onProjectileCollision = function () {
        game.increaseScore(100);
        enemy.fadeOut();
      };
    }
    function createReward(x, y) {
      var reward = game.createGameItem("reward", 32);
      var gem = draw.bitmap("img/reward.png");
      gem.x = -32;
      gem.y = -32;
      reward.addChild(gem);
      reward.x = x;
      reward.y = y;
      game.addGameItem(reward);
      reward.velocityX = -2;
      reward.rotationalVelocity = 4;

      reward.onPlayerCollision = function () {
        game.changeIntegrity(25);
        game.increaseScore(300);
        reward.fadeOut();
      };
    }

    function createMarker(x, y) {
      var marker = game.createGameItem("marker", 32);
      var flag = draw.bitmap("img/flag.png");
      flag.x = -32;
      flag.y = -32;
      marker.addChild(flag);
      marker.x = x;
      marker.y = y;
      game.addGameItem(marker);
      marker.velocityX = -2;

      marker.onPlayerCollision = function () {
        marker.fadeOut();
        startLevel();
      };
      marker.onProjectileCollision = function () {
        marker.fadeOut();
        startLevel();
      };
    }

    function startLevel() {
      // TODO 13 goes below here
      var level = levelData[currentLevel];
      var levelObjects = level.gameItems;

      for (var i = 0; i < levelObjects.length; i++) {
        var object = levelObjects[i];
        if (object.type === "sawblade") {
          createSawBlade(object.x, object.y);
        } else if (object.type === "bullet") {
          createBullet(object.x, object.y);
        } else if (object.type === "enemy") {
          createEnemy(object.x, object.y);
        } else if (object.type === "reward") {
          createReward(object.x, object.y);
        } else if (object.type === "marker") {
          createMarker(object.x, object.y);
        }
      }

      //////////////////////////////////////////////
      // DO NOT EDIT CODE BELOW HERE
      //////////////////////////////////////////////
      if (++currentLevel === levelData.length) {
        startLevel = () => {
          console.log("Congratulations!");
        };
      }
    }
    startLevel();
  };
};

// DON'T REMOVE THIS CODE //////////////////////////////////////////////////////
if (
  typeof process !== "undefined" &&
  typeof process.versions.node !== "undefined"
) {
  // here, export any references you need for tests //
  module.exports = runLevels;
}