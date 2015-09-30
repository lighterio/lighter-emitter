var libs = require('./bench-util').libs

describe('Emitter.prototype.on', function () {
  this.benchTime = this.root.options.benchTime / 2

  before(function () {
    Object.keys(libs).forEach(function (name) {
      mock(libs[name], {
        defaultMaxListeners: 1e3
      })
    })
  })

  after(function () {
    Object.keys(libs).forEach(function (name) {
      unmock(libs[name])
    })
  })

  bench('called once', function () {
    Object.keys(libs).forEach(function (name) {
      var Emitter = libs[name]
      var f = function () {}
      it(name, function () {
        var e = new Emitter()
        e.on('a', f)
      })
    })
  })

  bench('called twice', function () {
    Object.keys(libs).forEach(function (name) {
      var Emitter = libs[name]
      var f = function () {}
      it(name, function () {
        var e = new Emitter()
        e.on('a', f)
        e.on('a', f)
      })
    })
  })

  bench('called three times', function () {
    Object.keys(libs).forEach(function (name) {
      var Emitter = libs[name]
      var f = function () {}
      it(name, function () {
        var e = new Emitter()
        e.on('a', f)
        e.on('a', f)
        e.on('a', f)
      })
    })
  })

  bench('called 100 times', function () {
    Object.keys(libs).forEach(function (name) {
      var Emitter = libs[name]
      var f = function () {}
      it(name, function () {
        var e = new Emitter()
        for (var i = 0; i < 100; i++) {
          e.on('a', f)
        }
      })
    })
  })
})
