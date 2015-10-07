# lighter-emitter
[![Chat](https://badges.gitter.im/chat.svg)](//gitter.im/lighterio/public)
[![Version](https://img.shields.io/npm/v/lighter-emitter.svg)](//www.npmjs.com/package/lighter-emitter)
[![Downloads](https://img.shields.io/npm/dm/lighter-emitter.svg)](//www.npmjs.com/package/lighter-emitter)
[![Build](https://img.shields.io/travis/lighterio/lighter-emitter.svg)](//travis-ci.org/lighterio/lighter-emitter)
[![Coverage](https://img.shields.io/coveralls/lighterio/lighter-emitter/master.svg)](//coveralls.io/r/lighterio/lighter-emitter)
[![Style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](//www.npmjs.com/package/standard)

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
[our benchmarks](//github.com/lighterio/lighter-emitter/master/test/):

<pre><code>
Emitter.prototype.once
   <b style="color:green">✔</b> lighter-emitter:     <b style="color:green"> Fastest</b>  246.92K op/s <b style="color:gray">±153K op/s   8.80M runs</b>
   <b style="color:yellow">•</b> events.EventEmitter: <b style="color:yellow">-11.140%</b>  219.41K op/s <b style="color:gray">±115K op/s   8.80M runs</b>

 Emitter constructor
   <b style="color:green">✔</b> lighter-emitter:     <b style="color:green"> Fastest</b>  308.63K op/s <b style="color:gray">±695K op/s   20.0M runs</b>
   <b style="color:yellow">•</b> events.EventEmitter: <b style="color:yellow">-4.0678%</b>  296.08K op/s <b style="color:gray">±592K op/s   20.0M runs</b>

 Emitter.prototype.removeListener
   Adding and removing 5 listeners
     <b style="color:green">✔</b> lighter-emitter:     <b style="color:green"> Fastest</b>  206.35K op/s <b style="color:gray"> ±227K op/s   14.3M runs</b>
     <b style="color:yellow">•</b> events.EventEmitter: <b style="color:yellow">-12.816%</b>  179.91K op/s <b style="color:gray">±92.7K op/s   14.3M runs</b>

 Emitter.prototype.emit (two listeners)
   four arguments
     <b style="color:green">•</b> lighter-emitter:     <b style="color:green"> Fastest</b>  199.98K op/s <b style="color:gray"> ±129K op/s   2.01M runs</b>
     <b style="color:green">•</b> events.EventEmitter: <b style="color:green">-0.3502%</b>  199.28K op/s <b style="color:gray">±98.3K op/s   2.01M runs</b>
   three arguments
     <b style="color:green">✔</b> lighter-emitter:     <b style="color:green"> Fastest</b>  184.77K op/s <b style="color:gray">±546K op/s   1.26M runs</b>
     <b style="color:yellow">•</b> events.EventEmitter: <b style="color:yellow">-21.839%</b>  144.42K op/s <b style="color:gray">±304K op/s   1.26M runs</b>
   two arguments
     <b style="color:green">•</b> lighter-emitter:     <b style="color:green"> Fastest</b>  233.20K op/s <b style="color:gray">±487K op/s   2.02M runs</b>
     <b style="color:green">•</b> events.EventEmitter: <b style="color:green">-3.6457%</b>  224.70K op/s <b style="color:gray">±413K op/s   2.02M runs</b>
   zero arguments
     <b style="color:green">✔</b> lighter-emitter:     <b style="color:green"> Fastest</b>  284.18K op/s <b style="color:gray">±705K op/s   7.20M runs</b>
     <b style="color:yellow">•</b> events.EventEmitter: <b style="color:yellow">-10.037%</b>  255.66K op/s <b style="color:gray">±419K op/s   7.20M runs</b>
   one argument
     <b style="color:green">✔</b> lighter-emitter:     <b style="color:green"> Fastest</b>  227.18K op/s <b style="color:gray">±605K op/s   5.71M runs</b>
     <b style="color:yellow">•</b> events.EventEmitter: <b style="color:yellow">-8.0180%</b>  208.97K op/s <b style="color:gray">±408K op/s   5.71M runs</b>

 Emitter.prototype.emit (one listener)
   four arguments
     <b style="color:green">•</b> lighter-emitter:     <b style="color:green"> Fastest</b>  415.54K op/s <b style="color:gray">±225K op/s   4.71M runs</b>
     <b style="color:green">•</b> events.EventEmitter: <b style="color:green">-0.0168%</b>  415.47K op/s <b style="color:gray">±226K op/s   4.71M runs</b>
   three arguments
     <b style="color:green">•</b> lighter-emitter:     <b style="color:green"> Fastest</b>  164.83K op/s <b style="color:gray">±456K op/s   1.42M runs</b>
     <b style="color:green">•</b> events.EventEmitter: <b style="color:green">-0.0234%</b>  164.79K op/s <b style="color:gray">±451K op/s   1.42M runs</b>
   two arguments
     <b style="color:green">•</b> lighter-emitter:     <b style="color:green"> Fastest</b>  218.85K op/s <b style="color:gray">±474K op/s   2.13M runs</b>
     <b style="color:green">•</b> events.EventEmitter: <b style="color:green">-1.6951%</b>  215.14K op/s <b style="color:gray">±453K op/s   2.13M runs</b>
   zero arguments
     <b style="color:green">•</b> lighter-emitter:     <b style="color:green"> Fastest</b>  338.32K op/s <b style="color:gray">±757K op/s   10.0M runs</b>
     <b style="color:green">•</b> events.EventEmitter: <b style="color:green">-1.1413%</b>  334.46K op/s <b style="color:gray">±732K op/s   10.0M runs</b>
   one argument
     <b style="color:green">•</b> lighter-emitter:     <b style="color:green"> Fastest</b>  331.18K op/s <b style="color:gray">±700K op/s   9.90M runs</b>
     <b style="color:green">•</b> events.EventEmitter: <b style="color:green">-1.4752%</b>  326.30K op/s <b style="color:gray">±668K op/s   9.90M runs</b>

 Emitter.prototype.emit (zero listeners)
   four arguments
     <b style="color:green">•</b> lighter-emitter:     <b style="color:green"> Fastest</b>  431.69K op/s <b style="color:gray">±207K op/s   5.38M runs</b>
     <b style="color:green">•</b> events.EventEmitter: <b style="color:green">-1.0201%</b>  427.29K op/s <b style="color:gray">±250K op/s   5.38M runs</b>
   three arguments
     <b style="color:green">✔</b> lighter-emitter:     <b style="color:green"> Fastest</b>  150.98K op/s <b style="color:gray">±259K op/s   1.69M runs</b>
     <b style="color:yellow">•</b> events.EventEmitter: <b style="color:yellow">-9.2353%</b>  137.04K op/s <b style="color:gray">±128K op/s   1.69M runs</b>
   two arguments
     <b style="color:green">✔</b> lighter-emitter:     <b style="color:green"> Fastest</b>  202.58K op/s <b style="color:gray">±266K op/s   2.38M runs</b>
     <b style="color:yellow">•</b> events.EventEmitter: <b style="color:yellow">-6.0017%</b>  190.42K op/s <b style="color:gray">±163K op/s   2.38M runs</b>
   zero arguments
     <b style="color:green">✔</b> lighter-emitter:     <b style="color:green"> Fastest</b>  372.58K op/s <b style="color:gray">±427K op/s   13.2M runs</b>
     <b style="color:yellow">•</b> events.EventEmitter: <b style="color:yellow">-7.2192%</b>  345.68K op/s <b style="color:gray">±234K op/s   13.2M runs</b>
   one argument
     <b style="color:green">✔</b> lighter-emitter:     <b style="color:green"> Fastest</b>  326.01K op/s <b style="color:gray">±390K op/s   11.4M runs</b>
     <b style="color:yellow">•</b> events.EventEmitter: <b style="color:yellow">-7.8672%</b>  300.36K op/s <b style="color:gray">±218K op/s   11.4M runs</b>

 Emitter.prototype.on
   called once
     <b style="color:green">✔</b> lighter-emitter:     <b style="color:green"> Fastest</b>  209.31K op/s <b style="color:gray"> ±570K op/s   2.97M runs</b>
     <b style="color:yellow">•</b> events.EventEmitter: <b style="color:yellow">-27.109%</b>  152.57K op/s <b style="color:gray">±83.9K op/s   2.97M runs</b>
   called twice
     <b style="color:green">•</b> lighter-emitter:     <b style="color:green"> Fastest</b>  132.70K op/s <b style="color:gray">±141K op/s   2.42M runs</b>
     <b style="color:green">•</b> events.EventEmitter: <b style="color:green">-1.6255%</b>  130.54K op/s <b style="color:gray">±111K op/s   2.42M runs</b>
   called three times
     <b style="color:green">✔</b> lighter-emitter:     <b style="color:green"> Fastest</b>  194.97K op/s <b style="color:gray"> ±148K op/s   3.57M runs</b>
     <b style="color:yellow">•</b> events.EventEmitter: <b style="color:yellow">-7.3409%</b>  180.65K op/s <b style="color:gray">±87.3K op/s   3.57M runs</b>
   called 100 times
     <b style="color:green">✔</b> lighter-emitter:     <b style="color:green"> Fastest</b>  60.196K op/s <b style="color:gray">±23.7K op/s   774K runs</b>
     <b style="color:yellow">•</b> events.EventEmitter: <b style="color:yellow">-61.815%</b>  22.985K op/s <b style="color:gray">±4.88K op/s   774K runs</b>

 Emitter.prototype.listeners
   with zero listeners
     <b style="color:green">•</b> events.EventEmitter: <b style="color:green"> Fastest</b>  225.77K op/s <b style="color:gray">±259K op/s   16.2M runs</b>
     <b style="color:green">•</b> lighter-emitter:     <b style="color:green">-0.0082%</b>  225.75K op/s <b style="color:gray">±259K op/s   16.2M runs</b>
   with one listener
     <b style="color:green">•</b> lighter-emitter:     <b style="color:green"> Fastest</b>  306.45K op/s <b style="color:gray">±266K op/s   22.7M runs</b>
     <b style="color:green">•</b> events.EventEmitter: <b style="color:green">-0.1488%</b>  306.00K op/s <b style="color:gray">±262K op/s   22.7M runs</b>
   with two listeners
     <b style="color:green">•</b> lighter-emitter:     <b style="color:green"> Fastest</b>  483.38K op/s <b style="color:gray">±295K op/s   36.9M runs</b>
     <b style="color:green">•</b> events.EventEmitter: <b style="color:green">-0.0244%</b>  483.26K op/s <b style="color:gray">±323K op/s   36.9M runs</b>
</code></pre>

### Differences from EventEmitter

Node's builtin EventEmitter is already highly optimized, so in order to build
a faster Emitter, some features were left out.

Emitter **does not** have:
* Automatic "newListener" and "removeListener" emitting.
* Domain support.
* A builtin "error" listener.
* A default of 10 for `_maxListeners`.


## API

### [Type](//www.npmjs.com/package/lighter-type)

The `lighter-emitter` module exports a constructor that extends from
[`lighter-type`](//www.npmjs.com/package/lighter-type) Type which can
instantiate new Emitter objects or decorate existing objects with Emitter
prototype methods.

### Emitter

A new emitter object can be constructed simply with the `new` keyword.

```js
var Emitter = require('lighter-emitter')

// Create a brand new Emitter object.
var emitter = new Emitter()
```

### Emitter.init(object)

Alternatively, a plain JavaScript object can be made into an emitter
by running the `init` method on it, thereby decorating it with
`Emitter.prototype` methods, and executing the Emiter constructor on
it. However, it does not become an instance of Emitter.

```js
var Emitter = require('lighter-emitter')

var emitter = new Emitter()
var object = {}
Emitter.init(object)

function hi (me) {
  me.on('hi', function (message) {
    console.log('Hi! ' + message + '.')
  })
  if (me instanceof Emitter) {
    me.emit('hi', 'I\'m an emitter')
  } else {
    me.emit('hi', 'I behave like an emitter')
  }
}

hi(emitter)
//> Hi! I'm an emitter.

hi(object)
//> Hi! I behave like an emitter.
```

### emitter.extend(map)

Define and return a sub type of the `Type` object, with a prototype decorated
with a `map` of additional properties. Additionally, the sub type itself gets
the same properties as its super type (such as the `extend` method).

When the `map` includes a property called `init`, it is used as the constructor
for the sub type rather than being added as a prototype property.

```js
var Emitter = require('lighter-emitter')

var BoomEmitter = Emitter.extend({

  emit: function (type) {
    this._super.emit.apply(this, arguments)
    console.log('Boom!')
  }

})

var boomer = new BoomEmitter()
boomer.on('hi', function () {
  console.log('Hi!')
})
boomer.emit('hi')

//> Hi!
//> Boom!
```

### emitter.addListener(event, listener) <small>or</small> emitter.on(event, listener)
Adds a listener to the end of the listeners array for the specified `event`.
No checks are made to see if the `listener` has already been added. Multiple
calls passing the same combination of `event` and `listener` will result in the
`listener` being added multiple times.

```js
server.on('connection', function (stream) {
  console.log('someone connected!')
})
```

Returns emitter, so calls can be chained.

### emitter.once(event, listener)
Adds a **one time** listener for the event. This listener is
invoked only the next time the event is fired, after which
it is removed.

```js
server.once('connection', function (stream) {
  console.log('Ah, we have our first user!')
})
```

Returns emitter, so calls can be chained.

### emitter.removeListener(event, listener) <small>or</small> emitter.off(event, listener)
Removes a listener from the listener array for the specified event.
**Caution**: changes array indices in the listener array behind the listener.

```js
var callback = function(stream) {
  console.log('someone connected!')
}
server.on('connection', callback)
// ...
server.removeListener('connection', callback)
```

`removeListener` will remove, at most, one instance of a listener from the
listener array. If any single listener has been added multiple times to the
listener array for the specified `event`, then `removeListener` must be called
multiple times to remove each instance.

Returns emitter, so calls can be chained.

### emitter.removeAllListeners([event])
Removes all listeners, or those of the specified event. Its not a good idea to
remove listeners that were added elsewhere in the code, especially when its on
an emitter that you didnt create (e.g. sockets or file streams).

Returns emitter, so calls can be chained.

### emitter.setMaxListeners(n)
By default EventEmitters will print a warning if more than 10 listeners are
added for a particular event. This is a useful default which helps finding
memory leaks. Obviously not all Emitters should be limited to 10. This function
allows that to be increased. Set to zero for unlimited.

Returns emitter, so calls can be chained.

### emitter.getMaxListeners()
Returns the current max listener value for the emitter which is either set by
`emitter.setMaxListeners(n)` or defaults to `EventEmitter.defaultMaxListeners`.

This can be useful to increment/decrement max listeners to avoid the warning
while not being irresponsible and setting a too big number.

```js
emitter.setMaxListeners(emitter.getMaxListeners() + 1)
emitter.once('event', function () {
  // do stuff
  emitter.setMaxListeners(Math.max(emitter.getMaxListeners() - 1, 0))
})
```

### Emitter.defaultMaxListeners
`emitter.setMaxListeners(n)` sets the maximum on a per-instance basis.
This class property lets you set it for *all* Emitter instances,
current and future, effective immediately. Use with care.

Note that `emitter.setMaxListeners(n)` still has precedence over
`Emitter.defaultMaxListeners`.

### emitter.listeners(event)
Returns a copy of the array of listeners for the specified event.

```js
server.on('connection', function (stream) {
  console.log('someone connected!')
})
console.log(util.inspect(server.listeners(connection)))
//> [ [Function] ]
```

### emitter.emit(event[, arg1][, arg2][, ...])
Calls each of the listeners in order with the supplied arguments.

Returns `true` if event had listeners, `false` otherwise.


### emitter.listenerCount(event)
Returns the number of listeners listening to the `event` of event.


## More on lighter-emitter...
* [Contributing](//github.com/lighterio/lighter-emitter/blob/master/CONTRIBUTING.md)
* [License (ISC)](//github.com/lighterio/lighter-emitter/blob/master/LICENSE.md)
* [Change Log](//github.com/lighterio/lighter-emitter/blob/master/CHANGELOG.md)
* [Roadmap](//github.com/lighterio/lighter-emitter/blob/master/ROADMAP.md)
