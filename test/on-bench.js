/* global describe it before after */
var no = function () {}
var bench = global.bench || no
var mock = global.mock || require('exam-is')
var unmock = mock.unmock
var libs = require('./bench-util').libs

describe('Emitter.prototype.on', function () {
  if (this.root.options) {
    this.benchTime = this.root.options.benchTime / 2
  }

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
        e.on('a0', f)
        e.on('a1', f)
        e.on('a2', f)
        e.on('a3', f)
        e.on('a4', f)
        e.on('a5', f)
        e.on('a6', f)
        e.on('a7', f)
        e.on('a8', f)
        e.on('a9', f)
      })
    })
  })

  bench('called twice', function () {
    Object.keys(libs).forEach(function (name) {
      var Emitter = libs[name]
      var f = function () {}
      it(name, function () {
        var e = new Emitter()
        e.on('a0', f)
        e.on('a0', f)
        e.on('a1', f)
        e.on('a1', f)
        e.on('a2', f)
        e.on('a2', f)
        e.on('a3', f)
        e.on('a3', f)
        e.on('a4', f)
        e.on('a4', f)
        e.on('a5', f)
        e.on('a5', f)
        e.on('a6', f)
        e.on('a6', f)
        e.on('a7', f)
        e.on('a7', f)
        e.on('a8', f)
        e.on('a8', f)
        e.on('a9', f)
        e.on('a9', f)
      })
    })
  })

  bench('called three times', function () {
    Object.keys(libs).forEach(function (name) {
      var Emitter = libs[name]
      var f = function () {}
      it(name, function () {
        var e = new Emitter()
        e.on('a0', f)
        e.on('a0', f)
        e.on('a0', f)
        e.on('a1', f)
        e.on('a1', f)
        e.on('a1', f)
        e.on('a2', f)
        e.on('a2', f)
        e.on('a2', f)
        e.on('a3', f)
        e.on('a3', f)
        e.on('a3', f)
        e.on('a4', f)
        e.on('a4', f)
        e.on('a4', f)
        e.on('a5', f)
        e.on('a5', f)
        e.on('a5', f)
        e.on('a6', f)
        e.on('a6', f)
        e.on('a6', f)
        e.on('a7', f)
        e.on('a7', f)
        e.on('a7', f)
        e.on('a8', f)
        e.on('a8', f)
        e.on('a8', f)
        e.on('a9', f)
        e.on('a9', f)
        e.on('a9', f)
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
          e.on('a0', f)
          e.on('a1', f)
          e.on('a2', f)
          e.on('a3', f)
          e.on('a4', f)
          e.on('a5', f)
          e.on('a6', f)
          e.on('a7', f)
          e.on('a8', f)
          e.on('a9', f)
        }
      })
    })
  })
})
