/* global it */
var no = function () {}
var bench = global.bench || no
var libs = require('./bench-util').libs

bench('Emitter constructor', function () {
  this.benchTime = this.root.options.benchTime * 2
  Object.keys(libs).forEach(function (name) {
    var Emitter = libs[name]
    it(name, function () {
      var e
      e = new Emitter()
      e = new Emitter()
      e = new Emitter()
      e = new Emitter()
      e = new Emitter()
      e = new Emitter()
      e = new Emitter()
      e = new Emitter()
      e = new Emitter()
      e = new Emitter()
      e = new Emitter()
      e = new Emitter()
      e = new Emitter()
      e = new Emitter()
      e = new Emitter()
      e = new Emitter()
      e = new Emitter()
      e = new Emitter()
      e = new Emitter()
      e = new Emitter()
      e = new Emitter()
      e = new Emitter()
      e = new Emitter()
      e = new Emitter()
      e = new Emitter()
      e = new Emitter()
      e = new Emitter()
      e = new Emitter()
      e = new Emitter()
      e = new Emitter()
      e = new Emitter()
      e = new Emitter()
      e = new Emitter()
      e = new Emitter()
      e = new Emitter()
      e = new Emitter()
      e = new Emitter()
      e = new Emitter()
      e = new Emitter()
      e = new Emitter()
      e = new Emitter()
      e = new Emitter()
      e = new Emitter()
      e = new Emitter()
      e = new Emitter()
      e = new Emitter()
      e = new Emitter()
      e = new Emitter()
      e = new Emitter()
      e = new Emitter()
      e = new Emitter()
      e = new Emitter()
      e = new Emitter()
      e = new Emitter()
      e = new Emitter()
      e = new Emitter()
      e = new Emitter()
      e = new Emitter()
      e = new Emitter()
      e = new Emitter()
      e = new Emitter()
      e = new Emitter()
      e = new Emitter()
      e = new Emitter()
      e = new Emitter()
      e = new Emitter()
      e = new Emitter()
      e = new Emitter()
      e = new Emitter()
      e = new Emitter()
      e = new Emitter()
      e = new Emitter()
      e = new Emitter()
      e = new Emitter()
      e = new Emitter()
      e = new Emitter()
      e = new Emitter()
      e = new Emitter()
      e = new Emitter()
      e = new Emitter()
      e = new Emitter()
      e = new Emitter()
      e = new Emitter()
      e = new Emitter()
      e = new Emitter()
      e = new Emitter()
      e = new Emitter()
      e = new Emitter()
      e = new Emitter()
      e = new Emitter()
      e = new Emitter()
      e = new Emitter()
      e = new Emitter()
      e = new Emitter()
      e = new Emitter()
      e = new Emitter()
      e = new Emitter()
      e = new Emitter()
      e = new Emitter()
      e = new Emitter()
      return e
    })
  })
})