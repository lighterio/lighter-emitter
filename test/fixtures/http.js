#!/usr/bin/env node

var ons = 0, offs = 0, emits = 0

var args = Array.prototype.slice.call(process.argv, 2)
var port = args[0] || 8124
var override = args[1]
if (override) {
  var Emitter = require('../../lighter-emitter')
  var events = require('events')
  var Stream = require('stream')
  var EventEmitter = events.EventEmitter
  events.EventEmitter = Emitter
  function emitterize (type) {
    type.init = Emitter
    type.prototype.on = type.prototype.addListener = Emitter.prototype.on
    type.prototype.off = type.prototype.removeListener = Emitter.prototype.off
    type.prototype.emit = Emitter.prototype.emit
  }
  emitterize(EventEmitter)
  emitterize(Stream)
  emitterize(Stream.Readable)
  emitterize(Stream.Writable)
  emitterize(Stream.Duplex)
  emitterize(Stream.Transform)
  emitterize(Stream.PassThrough)
}

var http = require('http')
http.createServer(function (request, response) {
  response.end('ok')
}).listen(port)
