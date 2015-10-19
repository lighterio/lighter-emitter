/* global describe it */
var no = function () {}
var bench = global.bench || no
var libs = require('./bench-util').libs

describe('Emitter.prototype.removeListener', function () {
  if (this.root.options) {
    this.benchTime = this.root.options.benchTime * 2
  }
  bench('Adding and removing 5 listeners', function () {
    Object.keys(libs).forEach(function (name) {
      var Emitter = libs[name]
      var f0 = function () {}
      var f1 = function () {}
      var f2 = function () {}
      var f3 = function () {}
      var f4 = function () {}
      var e = new Emitter()
      it(name, function () {
        e.on('a', f0)
        e.on('a', f1)
        e.on('a', f2)
        e.on('a', f3)
        e.on('a', f4)
        e.removeListener('a', f4)
        e.removeListener('a', f0)
        e.removeListener('a', f2)
        e.removeListener('a', f3)
        e.removeListener('a', f1)
        e.on('a', f0)
        e.on('a', f1)
        e.on('a', f2)
        e.on('a', f3)
        e.on('a', f4)
        e.removeListener('a', f4)
        e.removeListener('a', f0)
        e.removeListener('a', f2)
        e.removeListener('a', f3)
        e.removeListener('a', f1)
        e.on('a', f0)
        e.on('a', f1)
        e.on('a', f2)
        e.on('a', f3)
        e.on('a', f4)
        e.removeListener('a', f4)
        e.removeListener('a', f0)
        e.removeListener('a', f2)
        e.removeListener('a', f3)
        e.removeListener('a', f1)
        e.on('a', f0)
        e.on('a', f1)
        e.on('a', f2)
        e.on('a', f3)
        e.on('a', f4)
        e.removeListener('a', f4)
        e.removeListener('a', f0)
        e.removeListener('a', f2)
        e.removeListener('a', f3)
        e.removeListener('a', f1)
        e.on('a', f0)
        e.on('a', f1)
        e.on('a', f2)
        e.on('a', f3)
        e.on('a', f4)
        e.removeListener('a', f4)
        e.removeListener('a', f0)
        e.removeListener('a', f2)
        e.removeListener('a', f3)
        e.removeListener('a', f1)
        e.on('a', f0)
        e.on('a', f1)
        e.on('a', f2)
        e.on('a', f3)
        e.on('a', f4)
        e.removeListener('a', f4)
        e.removeListener('a', f0)
        e.removeListener('a', f2)
        e.removeListener('a', f3)
        e.removeListener('a', f1)
        e.on('a', f0)
        e.on('a', f1)
        e.on('a', f2)
        e.on('a', f3)
        e.on('a', f4)
        e.removeListener('a', f4)
        e.removeListener('a', f0)
        e.removeListener('a', f2)
        e.removeListener('a', f3)
        e.removeListener('a', f1)
        e.on('a', f0)
        e.on('a', f1)
        e.on('a', f2)
        e.on('a', f3)
        e.on('a', f4)
        e.removeListener('a', f4)
        e.removeListener('a', f0)
        e.removeListener('a', f2)
        e.removeListener('a', f3)
        e.removeListener('a', f1)
        e.on('a', f0)
        e.on('a', f1)
        e.on('a', f2)
        e.on('a', f3)
        e.on('a', f4)
        e.removeListener('a', f4)
        e.removeListener('a', f0)
        e.removeListener('a', f2)
        e.removeListener('a', f3)
        e.removeListener('a', f1)
        e.on('a', f0)
        e.on('a', f1)
        e.on('a', f2)
        e.on('a', f3)
        e.on('a', f4)
        e.removeListener('a', f4)
        e.removeListener('a', f0)
        e.removeListener('a', f2)
        e.removeListener('a', f3)
        e.removeListener('a', f1)
      })
    })
  })
})