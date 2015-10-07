var libs = require('./bench-util').libs

bench('Emitter.prototype.once', function () {
  Object.keys(libs).forEach(function (name) {
    var Emitter = libs[name]
    var e = new Emitter()
    var f = function () {}
    it(name, function () {
      e.once('a', f)
      e.emit('a', 1)
    })
  })
})
