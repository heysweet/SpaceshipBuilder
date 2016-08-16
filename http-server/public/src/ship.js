define([],
function (
){

  var position  = {
    x : 0,
    y : 0
  };
  
  var velocity = {
    x : 0,
    y : 0
  };

  function _speedDelta () {
    // TODO: Make this relative to the ship's mass
    return 1;
  }

  function _applyForce (dir) {
    switch (dir) {
      case 'N':
        velocity.y += _speedDelta();
        break;
      case 'S':
        velocity.y -= _speedDelta();
        break;
      case 'E':
        velocity.x += _speedDelta();
        break;
      case 'W':
        velocity.x -= _speedDelta();
        break;
    }
  }

  function _update () {
    position.x += velocity.x;
    position.y += velocity.y;
  }

  return {
    applyForce : _applyForce
  };
});