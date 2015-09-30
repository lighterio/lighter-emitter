# lighter-emitter
[![Chat](https://badges.gitter.im/chat.svg)](//gitter.im/lighterio/public)
[![Version](https://img.shields.io/npm/v/lighter-emitter.svg)](//www.npmjs.com/package/lighter-emitter)
[![Downloads](https://img.shields.io/npm/dm/lighter-emitter.svg)](//www.npmjs.com/package/lighter-emitter)
[![Build](https://img.shields.io/travis/lighterio/lighter-emitter.svg)](//travis-ci.org/lighterio/lighter-emitter)
[![Coverage](https://img.shields.io/coveralls/lighterio/lighter-emitter/master.svg)](//coveralls.io/r/lighterio/lighter-emitter)
[![Style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](//github.com/feross/standard)

The `lighter-emitter` module is a lightweight event emitter with
better performance than Node's builtin EventEmitter.


## Installation

From your project directory, install and save as a dependency:
```bash
npm install --save lighter-emitter
```


## Extreme Performance

A typical Node application instantiates several EventEmitter objects
for every request, so EventEmitter performance is closely tied to
application performance. Node's builtin EventEmitter is very fast, but
`lighter-emitter` is slightly faster, according to
[our benchmarks](//github.com/lighterio/lighter-emitter/master/test/bench/emitter-bench.js):

<img src="https://raw.githubusercontent.com/lighterio/lighter-emitter/master/test/bench/run.png" width="450" height="290">


## API

### Type

The `lighter-emitter` module exports a
[`lighter-type`](//www.npmjs.com/package/lighter-type) Type which can
instantiate new Emitter objects or decorate existing objects with Emitter
prototype methods.

#### Constructor

A new emitter object can be constructed simply with the `new` keyword.

```javascript
var Emitter = require('lighter-emitter')

// Create a brand new Emitter object.
var emitter = new Emitter()
```

#### Emitter.decorate(object, properties)

A plain JavaScript object effectively becomes an emitter if you decorate
it with the Emitter prototype. However, it does not become an instance of
Emitter.

```javascript
var Emitter = require('lighter-emitter')

var object = {}
Emitter.decorate(object, Emitter.prototype)

object.on('hi', function (message) {
  console.log('Hi! ' + message + '.')
})

if (object instanceof Emitter) {
  object.emit('hi', 'I am an emitter')
} else {
  object.emit('hi', 'I behave like an emitter')
}
//> Hi! I behave like an emitter.
```

### Instances



### emitter.extend(map)

Define and return a sub type of the `Type` object, with a prototype decorated
with a `map` of additional properties. Additionally, the sub type itself gets
the same properties as its super type (such as the `extend` method).

When the `map` includes a property called `init`, it is used as the constructor
for the sub type rather than being added as a prototype property.

```javascript


## Acknowledgements

We would like to thank all of the amazing people who use, support,
promote, enhance, document, patch, and submit comments & issues -
`lighter-emitter` couldn't exist without you.

Additionally, huge thanks go to [eBay](http://www.ebay.com) for employing
and supporting [`lighter-emitter`](http://lighter.io/lighter-emitter) project
maintainers, and for being an epically awesome place to work (and play).
