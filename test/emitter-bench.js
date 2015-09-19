var Emitter = require('../lighter-emitter')
var EventEmitter = require('events').EventEmitter

describe('Benchmarks', function () {
  this.timeout(1e4)

  bench('Instantiation', function () {
    this.sampleSize = 1e3
    this.minimumSamples = 1e3

    it('lighter-emitter', function () {
      new Emitter()
    })

    it('events.EventEmitter', function () {
      new EventEmitter()
    })

  })

  bench('Listening', function () {
    this.sampleSize = 1e3
    this.minimumSamples = 1e3

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

  bench('Emitting', function () {
    this.sampleSize = 1e4
    this.minimumSamples = 1e3

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

  bench('Listening Once', function () {
    this.sampleSize = 1e3
    this.minimumSamples = 1e3

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

})
