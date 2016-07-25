# lighter-emitter
[![Chat](https://badges.gitter.im/chat.svg)](//gitter.im/lighterio/public)
[![Version](https://img.shields.io/npm/v/lighter-emitter.svg)](//www.npmjs.com/package/lighter-emitter)
[![Downloads](https://img.shields.io/npm/dm/lighter-emitter.svg)](//www.npmjs.com/package/lighter-emitter)
[![Build](https://img.shields.io/travis/lighterio/lighter-emitter.svg)](//travis-ci.org/lighterio/lighter-emitter)
[![Coverage](https://img.shields.io/coveralls/lighterio/lighter-emitter/master.svg)](//coveralls.io/r/lighterio/lighter-emitter)
[![Style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](//www.npmjs.com/package/standard)

**Emitter** creates event emitters with additional methods and slightly
[better performance](//github.com/lighterio/lighter-emitter/blob/master/BENCHMARKS.md)
than Node's builtin EventEmitter.

## Installation
From your project directory, install and save as a dependency:
```bash
npm install --save lighter-emitter
```

## API
The `lighter-emitter` package exports a constructor that extends the Type
constructor from [`lighter-type`](//www.npmjs.com/package/lighter-type).

- [Emitter](#emitter)
  - [.init(object, [overwrite], [args])](#emitterinitobject-overwrite-args)
  - [.extend([constructor], [prototypeProperties], [constructorProperties])](#emitterextendmap)
  - [.decorate(object, [map], [overwrite])](#emitterdecorateobject-map-overwrite)
  - [.include(type, [overwrite])](#emitterincludetype-overwrite)
  - [.is(type)](#emitteristype)
  - [.has(type)](#emitterhastype)
  - [.hide(object, key, value)](#emitterhideobject-key-value)
  - [.defaultMaxListeners](#emitterdefaultmaxlisteners)
  - .prototype
    - [.on(event, listener) <small>or</small> .addListener(event, listener)](#emitterprototypeonevent-listener-smallorsmall-emitterprototypeaddlistenerevent-listener)
    - [.once(event, listener)](#emitterprototypeonceevent-listener)
    - [.off(event, listener) <small>or</small> .removeListener(event, listener)](#emitterprototypeoffevent-listener-smallorsmall-emitterprototyperemovelistenerevent-listener)
    - [.clear([event]) <small>or</small> .removeAllListeners([event])](#emitterprototypeclearevent-smallorsmall-emitterprototyperemovealllistenersevent)
    - [.setMaxListeners(n)](#emitterprototypesetmaxlistenersn)
    - [.getMaxListeners()](#emitterprototypegetmaxlisteners)
    - [.all(event) <small>or</small> .listeners(event)](#emitterprototypeallevent-smallorsmall-emitterprototypelistenersevent)
    - [.emit(event, [arg1], [arg2], [...])](#emitterprototypeemitevent-arg1-arg2-)
    - [.count(event) <small>or</small> .listenerCount(event)](#emitterprototypecountevent-smallorsmall-emitterprototypelistenercountevent)

### Emitter
A new emitter object can be constructed simply with the `new` keyword.

```js
var Emitter = require('lighter-emitter')

// Create a brand new Emitter object.
var emitter = new Emitter()
```

### Emitter.init(object, [overwrite], [args])
*See [Type.init](https://github.com/lighterio/lighter-type#Type.init).*

A plain JavaScript object can be made into an emitter
by running the `init` method on it, thereby decorating it with
`Emitter.prototype` methods, and executing the Emitter constructor on
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

### Emitter.extend([constructor], [prototypeProperties], [constructorProperties])
*See [Type.extend](https://github.com/lighterio/lighter-type#Type.extend).*

Define and return a sub type of the `Emitter` object, with its prototype and
constructor optionally decorated with properties (beyond what the sub type
inherits from its super type).

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

### Emitter.decorate(object, [map], [overwrite])
Decorate an `object` with a `map` of additional properties.
*See (Type.decorate)[https://github.com/lighterio/lighter-type#Type.decorate].*

### Emitter.include(type, [overwrite])
Implement multiple inheritance by decorating a Emitter's prototype.
*See (Type.include)[https://github.com/lighterio/lighter-type#Type.include].*

### Emitter.is(type)
Check whether this Emitter is descended from another type.
*See (Type.is)[https://github.com/lighterio/lighter-type#Type.is].*

### Emitter.has(type)
Check whether this Emitter has acquired the functionality of another type.
*See (Type.has)[https://github.com/lighterio/lighter-type#Type.has].*

### Emitter.hide(object, key, value)
Create a non-enumerable object property.
*See (Type.hide)[https://github.com/lighterio/lighter-type#Type.hide].*

### Emitter.prototype.on(event, listener) <small>or</small> Emitter.prototype.addListener(event, listener)
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

### Emitter.prototype.once(event, listener)
Adds a **one time** listener for the event. This listener is
invoked only the next time the event is fired, after which
it is removed.

```js
server.once('connection', function (stream) {
  console.log('Ah, we have our first user!')
})
```

Returns emitter, so calls can be chained.

### Emitter.prototype.off(event, listener) <small>or</small> Emitter.prototype.removeListener(event, listener)
Removes a listener from the listener array for the specified event.
**Caution**: changes array indices in the listener array behind the listener.

```js
var callback = function(stream) {
  console.log('someone connected!')
}
server.on('connection', callback)
// ...
server.off('connection', callback)
```

`off` will remove, at most, one instance of a listener from the
listener array. If any single listener has been added multiple times to the
listener array for the specified `event`, then `removeListener` must be called
multiple times to remove each instance.

Returns emitter, so calls can be chained.

### Emitter.prototype.clear([event]) <small>or</small> Emitter.prototype.removeAllListeners([event])
Removes all listeners, or those of the specified event. It's not a good idea to
remove listeners that were added elsewhere in the code, especially when it's on
an emitter that you didnt create (e.g. sockets or file streams).

Returns emitter, so calls can be chained.

### Emitter.prototype.setMaxListeners(n)
By default EventEmitters will print a warning if more than 10 listeners are
added for a particular event. This is a useful default which helps finding
memory leaks. Not all Emitters should be limited to 10, so this function
allows that to be increased. Set to zero for unlimited.

Returns emitter, so calls can be chained.

### Emitter.prototype.getMaxListeners()
Returns the current max listener value for the emitter which is either set by
`Emitter.prototype.setMaxListeners(n)` or defaults to 10.

This can be useful to increment/decrement max listeners to avoid the warning
while not being irresponsible and setting a too big number.

```js
Emitter.prototype.setMaxListeners(Emitter.prototype.getMaxListeners() + 1)
Emitter.prototype.once('event', function () {
  // do stuff
  Emitter.prototype.setMaxListeners(Math.max(Emitter.prototype.getMaxListeners() - 1, 0))
})
```

### Emitter.defaultMaxListeners
`Emitter.prototype.setMaxListeners(n)` sets the maximum on a per-instance basis.
This class property lets you set it for *all* Emitter instances,
current and future, effective immediately. Use with care.

Note that `Emitter.prototype.setMaxListeners(n)` still has precedence over
`Emitter.defaultMaxListeners`.

### Emitter.prototype.all(event) <small>or</small> Emitter.prototype.listeners(event)
Returns a copy of the array of listeners for the specified event.

```js
server.on('connection', function (stream) {
  console.log('someone connected!')
})
console.log(util.inspect(server.listeners(connection)))
//> [ [Function] ]
```

### Emitter.prototype.emit(event, [arg1], [arg2], [...])
Calls each of the listeners in order with the supplied arguments.

Returns `true` if event had listeners, `false` otherwise.

### Emitter.prototype.count(event) <small>or</small> Emitter.prototype.listenerCount(event)
Returns the number of listeners listening to the `event` of event.

## Omissions
Node's builtin EventEmitter is already highly optimized, so in order to build
a faster Emitter, some features were omitted.

Emitter **does not**:
* Emit "newListener" and "removeListener" events.
* Support domains.
* Have a magic "error" listener.

## More on lighter-emitter...
* [Contributing](//github.com/lighterio/lighter-emitter/blob/master/CONTRIBUTING.md)
* [License (ISC)](//github.com/lighterio/lighter-emitter/blob/master/LICENSE.md)
* [Change Log](//github.com/lighterio/lighter-emitter/blob/master/CHANGELOG.md)
* [Benchmarks](//github.com/lighterio/lighter-emitter/blob/master/BENCHMARKS.md)
* [Roadmap](//github.com/lighterio/lighter-emitter/blob/master/ROADMAP.md)
