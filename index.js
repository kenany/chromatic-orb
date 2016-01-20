var socketColorsChance = require('socket-colors-chance');
var factorial = require('factorial');

var X = 22;

function chromatic(opts) {
  var chance = socketColorsChance(opts);

  var strength = opts.strength || 0;
  var dexterity = opts.dexterity || 0;
  var intelligence = opts.intelligence || 0;

  if (strength > 0 && dexterity === 0 && intelligence === 0) {
    strength += 32;
  }
  else if (strength === 0 && dexterity > 0 && intelligence === 0) {
    dexterity += 32;
  }
  else if (strength === 0 && dexterity === 0 && intelligence > 0) {
    intelligence += 32;
  }

  var div = strength + dexterity + intelligence + 3 * X;

  var rc = (X + strength) / div;
  var gc = (X + dexterity) / div;
  var bc = (X + intelligence) / div;

  function bonus(free, dred, dgreen, dblue, red, green, blue, pos) {
    pos = pos || 1;
    red = red || 0;
    green = green || 0;
    blue = blue || 0;

    if (red >= dred && green >= dgreen && blue >= dblue) {
      return 0;
    }
    if (free > 0) {
      return (pos <= 1
        ? bonus(free - 1, dred, dgreen, dblue, red + 1, green, blue, 1)
        : 0)
        + (pos <= 2
          ? bonus(free - 1, dred, dgreen, dblue, red, green + 1, blue, 2)
          : 0)
        + bonus(free - 1, dred, dgreen, dblue, red, green, blue + 1, 3);
    }
    return factorial(red + green + blue) / (factorial(red) * factorial(green)
      * factorial(blue)) * Math.pow(rc, red * 2) * Math.pow(gc, green * 2)
      * Math.pow(bc, blue * 2);
  }

  chance /= 1 - bonus(opts.sockets, opts.red || 0, opts.green || 0, opts.blue || 0);
  return chance;
}

module.exports = chromatic;
