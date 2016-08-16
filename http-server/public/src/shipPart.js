define([],
function (
){

  function _setDirection (dir, defaultValue) {
    switch (dir) {
      case 'S':
        return 0;
        break;
      case 'E':
        return 1;
        break;
      case 'N':
        return 2;
        break;
      case 'W':
        return 3;
        break;
      default:
        return defaultValue ? _setDirection(defaultValue) : 0;
        break;
    }
  }

  return {
    setDirection : _setDirection
  };
});