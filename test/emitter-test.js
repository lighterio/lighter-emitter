/* global describe it beforeEach afterEach */
var Emitter = require('../lighter-emitter')
var is = global.is || require('exam-is')
var mock = global.mock || require('exam-mock')
var unmock = mock.unmock
var no = function () {}

describe('Emitter', function () {
  describe('.prototype', function () {
    it('has shorthand methods', function () {
      var e = new Emitter()
      is.function(e.on)
      is.function(e.off)
      is.function(e.once)
      is.function(e.one)
      is.function(e.emit)
      is.function(e.clear)
      is.function(e.count)
    })

    it('has equivalent long-form methods', function () {
      var e = new Emitter()
      is(e.on, e.addListener)
      is(e.off, e.removeListener)
      is(e.clear, e.removeAllListeners)
      is(e.count, e.listenerCount)
    })
  })

  describe('.prototype.on', function () {
    it('adds a listener', function (done) {
      var o = new Emitter()
      o.on('e', done)
      o.emit('e')
    })

    it('adds two listeners', function () {
      var o = new Emitter()
      var f = function (d) { o.c += 'f' + d }
      var g = function (d) { o.c += 'g' + d }
      o.c = ''
      o.on('e', f)
      o.on('e', g)
      o.emit('e', 1)
      is(o.c, 'f1g1')
    })

    it('adds three listeners', function () {
      var o = {c: ''}
      Emitter.init(o)
      var f = function (d) { o.c += 'f' + d }
      var g = function (d) { o.c += 'g' + d }
      var h = function (d) { o.c += 'h' + d }
      o.on('e', f)
      o.on('e', g)
      o.on('e', h)
      o.emit('e')
      is(o.c, 'fundefinedgundefinedhundefined')
    })
  })

  describe('.prototype.once', function () {
    it('only fires once', function () {
      var o = new Emitter()
      o.c = ''
      var f = function (d) { o.c += 'f' + d }
      o.once('e', f)
      o.emit('e', 1)
      is(o.c, 'f1')
      o.emit('e', 2)
      is(o.c, 'f1')
    })
  })

  describe('.prototype.emit', function () {
    it('returns true when there are listeners', function () {
      var e = new Emitter()
      var b = false
      e.on('a', no)
      b = e.emit('a')
      is(b, true)
      e.on('a', no)
      b = e.emit('a')
      is(b, true)
      e.on('a', no)
      b = e.emit('a')
      is(b, true)
    })

    it('returns false when there are no listeners', function () {
      var e = new Emitter()
      var b = e.emit('a')
      is(b, false)
    })

    it('emits data arguments', function () {
      var o = {c: ''}
      Emitter.init(o)
      var f = function () {
        var a = Array.prototype.slice.call(arguments)
        o.c += '[' + a.join(',') + ']'
      }
      o.on('c', f)
      o.emit('c')
      o.emit('c', 1)
      o.emit('c', 1, 2)
      o.emit('c', 1, 2, 3)
      o.emit('c', 1, 2, 3, 4)
      is(o.c, '[][1][1,2][1,2,3][1,2,3,4]')
    })

    it('emits data arguments to multiple listeners', function () {
      var o = {c: '', d: 0}
      Emitter.init(o)
      var f = function () {
        var a = Array.prototype.slice.call(arguments)
        o.c += '[' + a.join(',') + ']'
      }
      var g = function () {
        var a = Array.prototype.slice.call(arguments)
        a.forEach(function (n) {
          if (n) {
            o.d += n
          }
        })
      }
      o.on('c', f)
      o.on('c', g)
      o.emit('c')
      o.emit('c', 1)
      o.emit('c', 1, 2)
      o.emit('c', 1, 2, 3)
      o.emit('c', 1, 2, 3, 4)
      o.emit('c', 1, 2, 3, 4, 5)
      is(o.c, '[][1][1,2][1,2,3][1,2,3,4][1,2,3,4,5]')
      is(o.d, 35)
    })

    it('emits data arguments to any number of listeners', function () {
      var o = {n: 0}
      Emitter.init(o)
      var f = function (a, b) {
        o.n += a + b
      }
      is(o.n, 0)
      o.on('c', f)
      o.emit('c', 1, 2)
      is(o.n, 3)
      o.on('c', f)
      o.emit('c', 1, 2)
      is(o.n, 9)
      o.removeAllListeners()
      o.emit('c', 2, 3)
      is(o.n, 9)
    })
  })

  describe('.prototype.listeners', function () {
    it('returns an empty array if there are no listeners', function () {
      var o = new Emitter()
      is.same(o.listeners(), [])
    })

    it('returns an empty array if there are no listeners for that event type', function () {
      var o = new Emitter()
      o.on('a', no)
      is.same(o.listeners('b'), [])
    })

    it('returns a singleton array if there is one matching listener', function () {
      var o = new Emitter()
      o.on('a', no)
      is.same(o.listeners('a'), [no])
    })

    it('returns an array if there are many matching listeners', function () {
      var o = new Emitter()
      o.on('a', no)
      o.on('a', no)
      is.same(o.listeners('a'), [no, no])
    })
  })

  describe('.prototype.listenerCount', function () {
    it('returns zero if there are no listeners', function () {
      var o = new Emitter()
      is.same(o.listenerCount(), 0)
    })

    it('returns zero if there are no listeners for that event type', function () {
      var o = new Emitter()
      o.on('a', no)
      is.same(o.listenerCount('b'), 0)
    })

    it('returns one if there is one matching listener', function () {
      var o = new Emitter()
      o.on('a', no)
      is.same(o.listenerCount('a'), 1)
    })

    it('returns the number of matching listeners if there are many', function () {
      var o = new Emitter()
      o.on('a', no)
      o.on('a', no)
      is.same(o.listenerCount('a'), 2)
    })
  })

  describe('.prototype.removeListener', function () {
    it('removes a listener', function () {
      var o = {n: 0}
      Emitter.init(o)
      var f = function () {
        this.n += 1
      }
      var g = function () {
        this.n += 10
      }
      o.on('inc', f)
      o.on('inc', g)
      o.emit('inc')
      is(o.n, 11)
      o.removeListener('inc', f)
      o.emit('inc')
      is(o.n, 21)
      o.removeListener('inc', g)
      o.emit('inc')
      is(o.n, 21)
    })

    it('is OK if there are no listeners', function () {
      var o = new Emitter()
      o.removeListener('something', no)
    })

    it('is OK if listeners are corrupt', function () {
      var o = new Emitter()
      o._events = {a: 1}
      o.removeListener('a', 2)
    })
  })

  describe('.prototype.removeAllListeners', function () {
    it('removes all listeners of a type', function () {
      var o = {n: 0}
      Emitter.init(o)
      var f = function () {
        this.n += 1
      }
      var g = function () {
        this.n += 10
      }
      o.on('inc', f)
      o.on('inc', g)
      o.emit('inc')
      is(o.n, 11)
      o.removeAllListeners('inc')
      o.emit('inc')
      is(o.n, 11)
      o.on('inc', f)
      o.emit('inc')
      is(o.n, 12)
      o.removeAllListeners('inc')
      is(o.n, 12)
    })

    it('removes all listeners, period', function () {
      var o = {n: 0}
      Emitter.init(o)
      var f = function () {
        this.n += 1
      }
      var g = function () {
        this.n += 10
      }
      o.on('inc1', f)
      o.on('inc10', g)
      o.emit('inc1')
      o.emit('inc10')
      is(o.n, 11)
      o.removeAllListeners()
      o.emit('inc1')
      o.emit('inc10')
      is(o.n, 11)
    })

    it('is OK having no matching listeners', function () {
      var o = {n: 0}
      Emitter.init(o)
      o.removeAllListeners('inc')
    })
  })

  describe('.prototype.once', function () {
    it('fires an event once', function () {
      var o = {c: ''}
      Emitter.init(o)
      var f = function () {
        var a = Array.prototype.slice.call(arguments)
        o.c += '[' + a.join(',') + ']'
      }
      o.emit('c')
      o.once('c', f)
      o.emit('c', 1)
      o.emit('c', 1, 2)
      is(o.c, '[1]')
    })
  })

  describe('.defaultMaxListeners', function () {
    it('treats 0 as unlimited', function () {
      var original = Emitter.defaultMaxListeners
      Emitter.defaultMaxListeners = 0
      is(Emitter.defaultMaxListeners, Infinity)
      Emitter.defaultMaxListeners = original
    })

    it('treats 100 as 100', function () {
      var original = Emitter.defaultMaxListeners
      Emitter.defaultMaxListeners = 100
      is(Emitter.defaultMaxListeners, 100)
      Emitter.defaultMaxListeners = original
    })

    describe('default 10', function () {
      it('is returned', function () {
        is(Emitter.defaultMaxListeners, 10)
      })

      it('is inherited by instances', function () {
        mockConsole()
        var o = new Emitter()
        for (var i = 0; i < 10; i++) {
          o.on('a', no)
        }
        is(console.error.value, 0)
        is(console.trace.value, 0)
        o.on('a', no)
        is(console.error.value, 1)
        is(console.trace.value, 1)
        unmockConsole()
      })
    })
  })

  describe('.prototype.setMaxListeners', function () {
    beforeEach(mockConsole)
    afterEach(unmockConsole)

    it('treats 0 as unlimited', function () {
      var o = new Emitter()
      o.setMaxListeners(0)
      is(o._maxListeners, Infinity)
      for (var i = 0; i < 1e4; i++) {
        o.on('a', no)
      }
    })

    it('works with 1', function () {
      var o = new Emitter()
      o.setMaxListeners(1)
      o.on('a', no)
      o.on('a', no)
      is(console.error.value, 1)
      is(console.trace.value, 1)
    })

    it('works with > 1', function () {
      var o = new Emitter()
      o.setMaxListeners(2)
      o.on('a', no)
      o.on('a', no)
      o.on('a', no)
      is(console.error.value, 1)
      is(console.trace.value, 1)
    })

    it('does not re-warn', function () {
      var o = new Emitter()
      o.setMaxListeners(2)
      o.on('a', no)
      o.on('a', no)
      o.on('a', no)
      o.on('a', no)
      is(console.error.value, 1)
      is(console.trace.value, 1)
    })
  })

  describe('.prototype.getMaxListeners', function () {
    it('gets the default', function () {
      Emitter.defaultMaxListeners = 10
      var o = new Emitter()
      var m = o.getMaxListeners()
      is(m, 10)
    })

    it('gets a new setting', function () {
      var o = new Emitter()
      o.setMaxListeners(20)
      var m = o.getMaxListeners()
      is(m, 20)
    })

    it('gets a new default', function () {
      Emitter.defaultMaxListeners = 5
      var o = new Emitter()
      var m = o.getMaxListeners()
      is(m, 5)
      Emitter.defaultMaxListeners = 10
      o = new Emitter()
      m = o.getMaxListeners()
      is(m, 10)
    })
  })

  describe('.prototype.one', function () {
    it('sets a listener', function () {
      var o = {n: 0}
      Emitter.init(o)
      var f = function () {
        o.n++
      }
      o.one('a', f)
      is(o.n, 0)
      o.emit('a')
      is(o.n, 1)
    })
  })
})

function mockConsole () {
  mock(console, {
    error: mock.count(),
    trace: mock.count()
  })
}

function unmockConsole () {
  unmock(console)
}
