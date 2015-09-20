var Emitter = require('../lighter-emitter')
var EventEmitter = require('events').EventEmitter

bench('Instantiation', function () {

  it('lighter-emitter', function () {
    new Emitter()
  })

  it('events.EventEmitter', function () {
    new EventEmitter()
  })

})

bench('Listening', function () {

  var e = new Emitter()
  e.setMaxListeners(Infinity)

  var ee = new EventEmitter()
  ee.setMaxListeners(Infinity)

  it('lighter-emitter', function () {
    e.on('a', function () {})
  })

  it('events.EventEmitter', function () {
    ee.on('a', function () {})
  })

})

describe('Emitting', function () {

  bench('zero values', function () {

    var e = new Emitter()
    e.on('a', function () {})

    var ee = new EventEmitter()
    ee.on('a', function () {})

    it('lighter-emitter', function () {
      e.emit('a')
    })

    it('events.EventEmitter', function () {
      ee.emit('a')
    })

  })

  bench('one value', function () {

    var e = new Emitter()
    e.on('a', function () {})

    var ee = new EventEmitter()
    ee.on('a', function () {})

    it('lighter-emitter', function () {
      e.emit('a', 1)
    })

    it('events.EventEmitter', function () {
      ee.emit('a', 1)
    })

  })

  bench('two values', function () {

    var e = new Emitter()
    e.on('a', function () {})

    var ee = new EventEmitter()
    ee.on('a', function () {})

    it('lighter-emitter', function () {
      e.emit('a', 1, 2)
    })

    it('events.EventEmitter', function () {
      ee.emit('a', 1, 2)
    })

  })

  bench('three values', function () {

    var e = new Emitter()
    e.on('a', function () {})

    var ee = new EventEmitter()
    ee.on('a', function () {})

    it('lighter-emitter', function () {
      e.emit('a', 1, 2, 3)
    })

    it('events.EventEmitter', function () {
      ee.emit('a', 1, 2, 3)
    })

  })
})

bench('Listening once', function () {

  var e = new Emitter()
  var ee = new EventEmitter()
  var f = function () {}

  it('lighter-emitter', function () {
    e.once('a', f)
    e.emit('a', 1)
  })

  it('events.EventEmitter', function () {
    ee.once('a', f)
    ee.emit('a', 1)
  })

})
