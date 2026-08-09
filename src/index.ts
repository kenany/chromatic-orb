import factorial from 'factorial';
import {
  type SocketColorsChanceOptions,
  socketColorsChance,
} from 'socket-colors-chance';

/** Options describing the item and the desired socket colors. */
export type ChromaticOptions = SocketColorsChanceOptions;

const X = 22;

/**
 * Calculate the odds of rolling a desired combination of socket colors with a
 * chromatic orb.
 *
 * @param opts The item's sockets, attribute requirements, and the desired
 * socket colors. `opts.sockets` and at least one of `opts.red`, `opts.green`,
 * or `opts.blue` are required.
 * @returns The probability, between `0` and `1`, of rolling the desired socket
 * colors with a single chromatic orb.
 *
 * @example
 * ```typescript
 * chromatic({ sockets: 6, red: 5, green: 1, strength: 180 });
 * // => 0.23161598136624462
 * ```
 */
export function chromatic(opts: ChromaticOptions): number {
  let chance = socketColorsChance(opts);

  let strength = opts.strength || 0;
  let dexterity = opts.dexterity || 0;
  let intelligence = opts.intelligence || 0;

  if (strength > 0 && dexterity === 0 && intelligence === 0) {
    strength += 32;
  } else if (strength === 0 && dexterity > 0 && intelligence === 0) {
    dexterity += 32;
  } else if (strength === 0 && dexterity === 0 && intelligence > 0) {
    intelligence += 32;
  }

  const div = strength + dexterity + intelligence + 3 * X;

  const rc = (X + strength) / div;
  const gc = (X + dexterity) / div;
  const bc = (X + intelligence) / div;

  function bonus(
    free: number,
    dred: number,
    dgreen: number,
    dblue: number,
    red = 0,
    green = 0,
    blue = 0,
    pos = 1
  ): number {
    if (red >= dred && green >= dgreen && blue >= dblue) {
      return 0;
    }
    if (free > 0) {
      return (
        (pos <= 1
          ? bonus(free - 1, dred, dgreen, dblue, red + 1, green, blue, 1)
          : 0) +
        (pos <= 2
          ? bonus(free - 1, dred, dgreen, dblue, red, green + 1, blue, 2)
          : 0) +
        bonus(free - 1, dred, dgreen, dblue, red, green, blue + 1, 3)
      );
    }
    return (
      (factorial(red + green + blue) /
        (factorial(red) * factorial(green) * factorial(blue))) *
      rc ** (red * 2) *
      gc ** (green * 2) *
      bc ** (blue * 2)
    );
  }

  chance /=
    1 - bonus(opts.sockets, opts.red || 0, opts.green || 0, opts.blue || 0);
  return chance;
}
