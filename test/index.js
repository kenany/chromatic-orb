'use strict';

var almostEqual = require('almost-equal');
var isFunction = require('lodash.isfunction');
var test = require('tape');

var chromatic = require('../dist/');

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
  t.ok(almostEqual(
    chromatic({
      sockets: 6,
      red: 5,
      green: 1,
      strength: 180
    }),
    0.23161598136624462,
    0.0000000000000001
  ));
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

  var expected = new RegExp(/expected: 0 < opts.sockets < 7/);

  t.throws(chromatic.bind(null, {}), expected);
  t.throws(chromatic.bind(null, { sockets: 0 }), expected);
  t.throws(chromatic.bind(null, { sockets: 7 }), expected);
});

test('throws on invalid desired sockets', function(t) {
  var FIXTURES = [
    { red: -1 },
    { green: -2 },
    { blue: -3 },
    {},
    { red: 7 },
    { green: 8 },
    { blue: 9 },
    { red: 3, green: 2, blue: 2 }
  ];
  var invalidMsg = new RegExp(/invalid number of desired sockets/);

  t.plan(FIXTURES.length);

  FIXTURES.forEach(function(f) {
    f.sockets = 6;
    t.throws(chromatic.bind(null, f), invalidMsg);
  });
});
