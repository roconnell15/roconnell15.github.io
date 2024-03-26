var init = function (window) {
  "use strict";

  var opspark = window.opspark,
    draw = opspark.draw,
    physikz = opspark.racket.physikz,
    world = opspark.world,
    data = "assets/spritesheet/halle/data-v9.json",
    app = opspark.makeApp(world.makeRules()),
    canvas = app.canvas,
    view = app.view,
    fps = draw.fps("#000");

  var space,
    rules,
    ground,
    spritesheet,
    halle,
    hud,
    orbManager,
    playerManager,
    particleManager;

  var debugHalleHitZones = false;

  space = app.space;
  (rules = app.rules),
    (particleManager = opspark.makeParticleManager(app.stage));
  ground = opspark.makeGround(app);

  var background = opspark.makeBackground(app, ground);
  view.addChild(background);

  var help = draw.textfield(
    "MOVES || up: jump | right: flying jump | down: duck | space: fire | q self destruct!",
    "20px Arial",
    "#ccc",
    "left"
  );
  help.x = 10;
  help.y = ground.y + ground.getBounds().height + 10;
  view.addChild(help);

  window.opspark.makeSpriteSheet(data).then(function (ss) {
    spritesheet = ss;
    halle = window.opspark.makeHalle(
      spritesheet,
      particleManager,
      debugHalleHitZones
    );
    halle.x = halle.getBounds().width * 2;
    halle.y = ground.y - halle.getBounds().height + 3;
    app.addUpdateable(halle);
    view.addChild(halle);

    playerManager = opspark.makePlayerManager(
      halle,
      app,
      opspark.makeProjectileManager(view, space, particleManager)
    );

    app.addUpdateable(playerManager);
    app.addUpdateable({ update: update });
  });

  view.addChild(fps);
  app.addUpdateable(fps);

  function update() {
    space.forEach(function (body) {
      physikz.updatePosition(body);
      physikz.updateSpace(space, physikz.hitTestRadial, rules.handleCollision);
      playerManager.hitTest(body);
    });
  }

  var hud = opspark.makeHud();
  view.addChild(hud);
  window.hud = hud;

  var game = opspark.createGameManager(app, hud);
  opspark.makeDataInGame(game);
  opspark.runLevelInGame(game);
};

// DON'T REMOVE THIS CODE //////////////////////////////////////////////////////
if (
  typeof process !== "undefined" &&
  typeof process.versions.node !== "undefined"
) {
  // here, export any references you need for tests //
  module.exports = init;
}
