/* global it */
var no = function () {}
var bench = global.bench || no
var libs = require('./bench-util').libs

bench('Emitter.prototype.once', function () {
  Object.keys(libs).forEach(function (name) {
    var Emitter = libs[name]
    var e = new Emitter()
    var f = function () {}
    it(name, function () {
      e.once('a0', f)
      e.emit('a0', 1)
      e.once('a1', f)
      e.emit('a1', 1)
      e.once('a2', f)
      e.emit('a2', 1)
      e.once('a3', f)
      e.emit('a3', 1)
      e.once('a4', f)
      e.emit('a4', 1)
      e.once('a5', f)
      e.emit('a5', 1)
      e.once('a6', f)
      e.emit('a6', 1)
      e.once('a7', f)
      e.emit('a7', 1)
      e.once('a8', f)
      e.emit('a8', 1)
      e.once('a9', f)
      e.emit('a9', 1)
    })
  })
})
