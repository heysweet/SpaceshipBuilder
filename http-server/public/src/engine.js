define([
  'shipPart'
],
function (
  shipPart
){

  var direction;

  function _setDirection (dir) {
    direction = shipPart.setDirection(dir, 'S');
    return direction;
  }

  function _activate () {
    window.ship.applyForce(direction);
  }

  return {
    activate : _activate,
    setDirection : _setDirection
  };
});