import { type ChromaticOptions, chromatic } from 'chromatic-orb';
import { describe, expect, it } from 'vitest';

const INVALID_SOCKETS = /expected: 0 < opts.sockets < 7/;
const INVALID_DESIRED_SOCKETS = /invalid number of desired sockets/;

describe('chromatic', () => {
  it('6L: 2R, 2G, 2B', () => {
    expect(chromatic({ sockets: 6, red: 2, green: 2, blue: 2 })).toBe(
      0.123_605_412_187_595_37
    );
  });

  it('6L: 180 str, 5R, 1G', () => {
    expect(
      chromatic({ sockets: 6, red: 5, green: 1, strength: 180 })
    ).toBeCloseTo(0.231_615_981_366_244_62, 15);
  });

  it('6L: 180 str, 6B', () => {
    expect(chromatic({ sockets: 6, blue: 6, strength: 180 })).toBe(
      2.857_774_383_586_962e-7
    );
  });

  it('6L: 212 dex, 5G, 1B', () => {
    expect(chromatic({ sockets: 6, green: 5, blue: 1, dexterity: 212 })).toBe(
      0.237_576_498_636_840_2
    );
  });

  it('throws on invalid sockets', () => {
    expect(() => chromatic({} as ChromaticOptions)).toThrow(INVALID_SOCKETS);
    expect(() => chromatic({ sockets: 0 })).toThrow(INVALID_SOCKETS);
    expect(() => chromatic({ sockets: 7 })).toThrow(INVALID_SOCKETS);
  });

  it('throws on invalid desired sockets', () => {
    const fixtures: ChromaticOptions[] = [
      { sockets: 6, red: -1 },
      { sockets: 6, green: -2 },
      { sockets: 6, blue: -3 },
      { sockets: 6 },
      { sockets: 6, red: 7 },
      { sockets: 6, green: 8 },
      { sockets: 6, blue: 9 },
      { sockets: 6, red: 3, green: 2, blue: 2 },
    ];

    for (const fixture of fixtures) {
      expect(() => chromatic(fixture)).toThrow(INVALID_DESIRED_SOCKETS);
    }
  });
});
