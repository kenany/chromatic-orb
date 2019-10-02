# chromatic-orb

Calculate odds of rolling desired socket colors with a chromatic orb. Formula is
based on [Siveran's calculator][siveran], which is based on
[Lawphill's calculator][lawphill]. Results are not guaranteed to be completely
accurate.

## Example

For example, let's say you want to find out the chances of rolling 5 red sockets
and 1 green socket on a piece of armor that requires 180 strength to wield:

``` javascript
var chromatic = require('chromatic-orb');

var chance = chromatic({
  sockets: 6,
  red: 5,
  green: 1,
  strength: 180
}));
// => 0.23161598136624462
```

That's a 23% chance of success! From here, we can also find out the average
number of chromatic orbs one would have to spend:

``` javascript
1 / chance;
// => 4.3
```

So on average it will take you 4-5 chromatic orbs to roll such sockets. Note
that you can also calculate standard deviation yourself:

``` javascript
Math.sqrt((1 - chance) / Math.pow(chance, 2));
// => 3.78
```

## Installation

``` bash
$ npm install chromatic-orb
```

## API

``` javascript
var chromatic = require('chromatic-orb');
```

### `chromatic(opts)`

Same API as [`socket-colors-chance`][socket-colors-chance].


   [siveran]: https://github.com/Siveran/siveran.github.io
   [lawphill]: http://shouldichromeit.herokuapp.com/howitworks
   [socket-colors-chance]: https://github.com/KenanY/socket-colors-chance
