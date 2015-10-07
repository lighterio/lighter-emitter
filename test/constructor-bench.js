var libs = require('./bench-util').libs

bench('Emitter constructor', function () {
  this.benchTime = this.root.options.benchTime * 2
  Object.keys(libs).forEach(function (name) {
    var Emitter = libs[name]
    it(name, function () {
      var e = new Emitter()
    })
  })
})
