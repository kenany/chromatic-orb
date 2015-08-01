var chromatic = require('../');
var test = require('tape');
var isFunction = require('lodash.isfunction');

test('exports a function', function(t) {
  t.plan(1);
  t.ok(isFunction(chromatic));
});

test('6L: 2R, 2G, 2B', function(t) {
  t.plan(1);
  t.equal(chromatic({
    sockets: 6,
    red: 2,
    green: 2,
    blue: 2
  }), 0.12360541218759537);
});

test('6L: 180 str, 5R, 1G', function(t) {
  t.plan(1);
  t.equal(chromatic({
    sockets: 6,
    red: 5,
    green: 1,
    strength: 180
  }), 0.23161598136624462);
});

test('6L: 180 str, 6B', function(t) {
  t.plan(1);
  t.equal(chromatic({
    sockets: 6,
    blue: 6,
    strength: 180
  }), 2.857774383586962e-7);
});

test('6L: 212 dex, 5G, 1B', function(t) {
  t.plan(1);
  t.equal(chromatic({
    sockets: 6,
    green: 5,
    blue: 1,
    dexterity: 212
  }), 0.2375764986368402);
});

test('throws on invalid sockets', function(t) {
  t.plan(3);
  t.throws(chromatic.bind(null, {}), new RegExp(/expected: 0 < opts.sockets < 7/));
  t.throws(chromatic.bind(null, {sockets: 0}), new RegExp(/expected: 0 < opts.sockets < 7/));
  t.throws(chromatic.bind(null, {sockets: 7}), new RegExp(/expected: 0 < opts.sockets < 7/));
});

test('throws on invalid desired sockets', function(t) {
  var FIXTURES = [
    {red: -1},
    {green: -2},
    {blue: -3},
    {},
    {red: 7},
    {green: 8},
    {blue: 9},
    {red: 3, green: 2, blue: 2}
  ];

  t.plan(FIXTURES.length);

  FIXTURES.forEach(function(f) {
    f.sockets = 6;
    t.throws(chromatic.bind(null, f), new RegExp(/invalid number of desired sockets/));
  });
});
