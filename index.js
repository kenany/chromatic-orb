'use strict';

import socketColorsChance from 'socket-colors-chance';
import factorial from 'factorial';

const X = 22;

function chromatic(opts) {
  let chance = socketColorsChance(opts);

  let strength = opts.strength || 0;
  let dexterity = opts.dexterity || 0;
  let intelligence = opts.intelligence || 0;

  if (strength > 0 && dexterity === 0 && intelligence === 0) {
    strength += 32;
  }
  else if (strength === 0 && dexterity > 0 && intelligence === 0) {
    dexterity += 32;
  }
  else if (strength === 0 && dexterity === 0 && intelligence > 0) {
    intelligence += 32;
  }

  const div = strength + dexterity + intelligence + 3 * X;

  const rc = (X + strength) / div;
  const gc = (X + dexterity) / div;
  const bc = (X + intelligence) / div;

  function bonus(free, dred, dgreen, dblue, red = 0, green = 0, blue = 0, pos = 1) {
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

export default chromatic;
