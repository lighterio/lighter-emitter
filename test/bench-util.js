var EventEmitter = require('events').EventEmitter

var libs = exports.libs = {
  'events.EventEmitter': EventEmitter,
  'lighter-emitter': require('../lighter-emitter'),
  //'lighter-emitter2': require('../lighter-emitter2')
}

exports.emit = function (count, wording) {

  describe('Emitter.prototype.emit (' + wording + ')', function () {

    this.benchTime = this.root.options.benchTime * (1 - count / 10)

    bench('four arguments', function () {
      this.benchTime = this.parent.benchTime / 3
      Object.keys(libs).forEach(function (name) {
        var Emitter = libs[name]
        var e = new Emitter()
        var f = function (a, b, c, d) {}
        for (var i = 0; i < count; i++) {
          e.on('a', f)
        }
        if (!e.oneArg) {
          it(name, function () {
            e.emit('a', 1, 2, 3, 4)
          })
        }
      })
    })

    bench('three arguments', function () {
      this.benchTime = this.parent.benchTime / 3
      Object.keys(libs).forEach(function (name) {
        var Emitter = libs[name]
        var e = new Emitter()
        var f = function (a, b, c) {}
        for (var i = 0; i < count; i++) {
          e.on('a', f)
        }
        if (!e.oneArg) {
          it(name, function () {
            e.emit('a', 1, 2, 3)
          })
        }
      })
    })

    bench('two arguments', function () {
      this.benchTime = this.parent.benchTime / 3
      Object.keys(libs).forEach(function (name) {
        var Emitter = libs[name]
        var e = new Emitter()
        var f = function (a, b) {}
        for (var i = 0; i < count; i++) {
          e.on('a', f)
        }
        if (!e.oneArg) {
          it(name, function () {
            e.emit('a', 1, 2)
          })
        }
      })
    })

    bench('zero arguments', function () {
      Object.keys(libs).forEach(function (name) {
        var Emitter = libs[name]
        var e = new Emitter()
        var f = function () {}
        for (var i = 0; i < count; i++) {
          e.on('a', f)
        }
        it(name, function () {
          e.emit('a')
        })
      })
    })

    bench('one argument', function () {
      Object.keys(libs).forEach(function (name) {
        var Emitter = libs[name]
        var e = new Emitter()
        var f = function (a) {}
        for (var i = 0; i < count; i++) {
          e.on('a', f)
        }
        it(name, function () {
          e.emit('a', 1)
        })
      })
    })
  })
}
