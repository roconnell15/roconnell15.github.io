var makeLevelData = function (window) {
  window.opspark = window.opspark || {};

  window.opspark.makeDataInGame = function (game) {
    // some useful constants
    var groundY = game.groundY;

    // this data will allow us to define all of the
    // behavior of our game

    // TODO 12: change the below data
    var levelData = [
      {
        name: "Robot Romp",
        number: 1,
        speed: -3,
        gameItems: [
          { type: "sawblade", x: 400, y: groundY },
          { type: "sawblade", x: 700, y: groundY },
          { type: "sawblade", x: 1200, y: groundY },
          { type: "bullet", x: 1000, y: groundY - 142 },
          { type: "bullet", x: 1400, y: groundY - 142 },
          { type: "bullet", x: 1600, y: groundY - 142 },
          { type: "enemy", x: 800, y: groundY - 64 },
          { type: "enemy", x: 1200, y: groundY - 64 },
          { type: "enemy", x: 1800, y: groundY - 64 },
          { type: "reward", x: 2000, y: groundY - 128 },
          { type: "marker", x: 2100, y: groundY -100},
        ],
      },
      {
        name: "Robot Rampage",
        number: 2,
        speed: -3,
        gameItems: [
          { type: "sawblade", x: 400, y: groundY },
          { type: "sawblade", x: 700, y: groundY },
          { type: "sawblade", x: 1200, y: groundY },
          { type: "enemy", x: 600, y: groundY - 64 },
          { type: "reward", x: 900, y: groundY - 128 },
          { type: "marker", x: 2100, y: groundY - 100 },
        ],
      },
      {
        name: "Robot Rumble",
        number: 2,
        speed: -3,
        gameItems: [
          { type: "bullet", x: 600, y: groundY - 142 },
          { type: "reward", x: 900, y: groundY - 128 },
          { type: "marker", x: 2100, y: groundY - 100 },
        ],
      },
    ];
    window.opspark.levelData = levelData;
  };
};

// DON'T REMOVE THIS CODE //////////////////////////////////////////////////////
if (
  typeof process !== "undefined" &&
  typeof process.versions.node !== "undefined"
) {
  // here, export any references you need for tests //
  module.exports = makeLevelData;
}