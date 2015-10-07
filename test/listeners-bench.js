var libs = require('./bench-util').libs

describe('Emitter.prototype.listeners', function () {
  this.benchTime = this.root.options.benchTime * 2

  bench('with zero listeners', function () {
    Object.keys(libs).forEach(function (name) {
      var Emitter = libs[name]
      var e = new Emitter()
      it(name, function () {
        e.listeners()
      })
    })
  })

  bench('with one listener', function () {
    Object.keys(libs).forEach(function (name) {
      var Emitter = libs[name]
      var f = function () {}
      var e = new Emitter()
      e.on('a', f)
      it(name, function () {
        e.listeners()
      })
    })
  })

  bench('with two listeners', function () {
    Object.keys(libs).forEach(function (name) {
      var Emitter = libs[name]
      var f = function () {}
      var e = new Emitter()
      e.on('a', f)
      e.on('a', f)
      it(name, function () {
        e.listeners()
      })
    })
  })
})
