define(function (require) {
  var SCREEN_WIDTH = 800;
  var SCREEN_HEIGHT = 600;

  var ANIMATION_FRAMERATE = 10;
  var sprites = {};

  window.ship = require('ship');

  var init = function () {

  }

  var preload = function () {
    // Disable smoothing of pixel art to get crisp edges
    game.stage.smoothed = false;

    game.load.atlas('engine', 'img/engine_json.png', 'img/engine_json.json');

    // Load in sprites
    game.load.spritesheet('ship', 'img/ship.png', 7, 7, 13);
    game.load.spritesheet('engine', 'img/engine.png', 7, 10, 6);
  }

  function _randomInRange(start, end, last) {
    var r = Math.random();
    var maxDelta = end - start;

    var delta = 1 + Math.floor(r * maxDelta);

    return Math.max((last + delta) % end, start);
  }

  function _engineAnimationSetup() {
    var sprite = game.add.sprite(300, 200, 'engine');
    sprites.engine = sprite;

    sprite.anchor.set(0.5);
    sprite.scale.set(4);

    sprite.animations.add('off', [0], ANIMATION_FRAMERATE, false);
    sprite.animations.add('on', [1], ANIMATION_FRAMERATE, true);
    sprite.animations.play('on');

   sprite.animations.currentAnim.onLoop.add(function () {
      var lastFrame = sprite.animations.frame;
      sprite.animations.frame = _randomInRange(2, 5, sprite.animations.frame);

      sprite.scale.x *= -1;
    }, this);
  }

  function _pilotAnimationSetup() {
    var sprite = game.add.sprite(200, 200, 'ship');
    sprites.pilot = sprite;

    sprite.anchor.set(0.5);
    sprite.scale.set(4);

    sprite.animations.add('forward', [1], ANIMATION_FRAMERATE, false);
    sprite.animations.add('fire', [3, 1], ANIMATION_FRAMERATE, false);
    sprite.animations.add('idle', [3], ANIMATION_FRAMERATE, false);
    sprite.animations.add('right', [2], ANIMATION_FRAMERATE, false);
    sprite.animations.add('left', [2], ANIMATION_FRAMERATE, false);

    sprite.animations._anims.left.onStart.add(function () {
      sprite.scale.x = -Math.abs(sprite.scale.x);
    });

    sprite.animations._anims.right.onStart.add(function () {
      sprite.scale.x = Math.abs(sprite.scale.x);
    });    

    sprite.animations.play('idle');
  }

  function _smallCannonSetup() {
    var sprite = game.add.sprite(100, 200, 'ship');

    sprites.smallCannon = sprite;

    sprite.anchor.set(0.5);
    sprite.scale.set(4);

    sprite.animations.add('fire', [5, 6, 4], 8, false);
    sprite.animations.add('idle', [4], ANIMATION_FRAMERATE, false);

    sprite.animations.play('fire');
  }

  function _bigCannonSetup() {
    var sprite = game.add.sprite(100, 300, 'ship');

    sprites.bigCannon = sprite;

    sprite.anchor.set(0.5);
    sprite.scale.set(4);

    sprite.animations.add('fire', [10, 11, 12, 9], 6, false);
    sprite.animations.add('idle', [9], ANIMATION_FRAMERATE, false);

    sprite.animations.play('fire');
  }


  function _shieldGeneratorAnimationSetup() {
    var sprite = game.add.sprite(400, 200, 'ship');

    sprites.shieldGenerator = sprite;

    sprite.anchor.set(0.5);
    sprite.scale.set(4);

    sprite.animations.add('on', [7, 8], ANIMATION_FRAMERATE, true);
    sprite.animations.play('on');

    sprite.animations.currentAnim.onLoop.add(function () {
      sprite.angle += 90;
    }, this);
  }

  var create = function () {
    var sprite = game.add.sprite(400, 300, 'ship');
    sprites.hull = sprite;

    sprite.anchor.set(0.5);
    sprite.scale.set(4);

    _engineAnimationSetup();
    _shieldGeneratorAnimationSetup();
    _pilotAnimationSetup();
    _smallCannonSetup();
    _bigCannonSetup();
  }

  var update = function () {

  }

  var render = function () {

  }

  window.game = new Phaser.Game(
    SCREEN_WIDTH,
    SCREEN_HEIGHT,
    Phaser.AUTO,
    '',
    {
      init : init,
      preload : preload,
      create : create,
      update : update,
      render : render
    }
  );
});