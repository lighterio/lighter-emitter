'use strict'
/**
 * Emitter is a lightweight alternative to Node's events.EventEmitter object.
 */

var Emitter = module.exports = require('lighter-type').extend({

  /**
   * Set empty events.
   */
  init: function () {
    this._events = {}
    this._maxListeners = Emitter.defaultMaxListeners
  },

  /**
   * Set the maximum number of listeners that can listen to any type of event.
   *
   * @param {number} max  A new maximum number of listeners (or 0 == Infinity).
   */
  setMaxListeners: function (max) {
    this._maxListeners = max || Infinity
    return this
  },

  /**
   * Handle the case of max listeners being exceeded for an event type.
   */
  maxListenersExceeded: function (type) {
    throw new Error('Max ' + this._maxListeners + ' listeners exceeded for "' + type + '".')
  },

  /**
   * Bind a function as a listener for a type of event.
   */
  addListener: function (type, fn) {
    var events = this._events
    var fns = events[type]
    if (isUndefined(fns)) {
      events[type] = fn
    } else if (isFunction(fns)) {
      if (this._maxListeners > 1) {
        events[type] = [fns, fn]
      } else {
        this.maxListenersExceeded(type)
      }
    } else {
      var length = fns.length
      if (length < this._maxListeners) {
        fns[length] = fn
      } else {
        this.maxListenersExceeded(type)
      }
    }
    return this
  },

  /**
   * Set an event listener to be fired only once.
   */
  once: function (type, fn) {
    function one () {
      this.off(type, one)
      fn.apply(this, arguments)
    }
    this.on(type, one)
    return this
  },

  /**
   * Return an array of listeners for a type of event.
   */
  listeners: function (type) {
    var fns = this._events[type]
    return isUndefined(fns) ? [] : isFunction(fns) ? [fns] : fns
  },

  /**
   * Return the number of listeners for a type of event.
   */
  listenerCount: function (type) {
    var fns = this._events[type]
    return isUndefined(fns) ? 0 : isFunction(fns) ? 1 : fns.length
  },

  /**
   * Remove an event listener.
   */
  removeListener: function (type, fn) {
    var events = this._events
    var fns = events[type]
    if (fns === fn) {
      delete events[type]
    } else if (typeof fns === 'object') {
      var l = fns.length - 1
      for (var i = l; i >= 0; i--) {
        if (fns[i] === fn) {
          while (i < l) {
            fns[i] = fns[++i]
          }
          fns.pop()
          if (l === 1) {
            fns = fns[0]
          }
          break
        }
      }
    }
    return this
  },

  /**
   * Remove all event listeners (optionally of a specified type).
   */
  removeAllListeners: function (type) {
    if (typeof type === 'string') {
      delete this._events[type]
    } else {
      this._events = {}
    }
    return this
  },

  /**
   * Set one listener for a type of event (replacing any others).
   */
  one: function (type, fn) {
    this._events[type] = fn
    return this
  }

})

var defaultMaxListeners = 10
Object.defineProperty(Emitter, 'defaultMaxListeners', {
  get: function () {
    return defaultMaxListeners
  },
  set: function (max) {
    defaultMaxListeners = max || Infinity
  },
  enumerable: true,
  configurable: true
})

Emitter.usingDomains = false

var proto = Emitter.prototype
proto.on = proto.addListener
proto.off = proto.removeListener
proto.stop = proto.removeAllListeners

var emit = proto.emit = emitMany
Emitter.setMaxArguments = function (n) {
  this.prototype.emit = (n > 1) ? emitMany : emitSome
  return this
}
proto.setMaxArguments = function (n) {
  this.emit = (n > 1) ? emitMany : emitSome
  return this
}

function emitSome (type) {
  var events = this._events
  var fns = events[type]
  if (typeof fns !== 'undefined') {
    if (arguments.length > 1) {
      if (isFunction(fns)) {
        fns.call(this, arguments[1])
      } else {
        for (var i = 0, l = fns.length; i < l; i++) {
          fns[i].call(this, arguments[1])
        }
      }
    } else {
      if (isFunction(fns)) {
        fns.call(this)
      } else {
        for (var i = 0, l = fns.length; i < l; i++) {
          fns[i].call(this)
        }
      }
    }
  }
  return this
}

function emitMany (type) {
  var events = this._events
  var fns = events[type]
  if (typeof fns !== 'undefined') {
    switch (arguments.length) {
      case 1:
        emit0(this, fns)
        break
      case 2:
        emit1(this, fns, arguments[1])
        break
      case 3:
        emit2(this, fns, arguments[1], arguments[2])
        break
      case 4:
        emit3(this, fns, arguments[1], arguments[2], arguments[3])
        break
      default:
        emitN(this, fns, arguments)
    }
  }
  return this
}

function emit0 (self, fns) {
  if (isFunction(fns))
    fns.call(self)
  else
    for (var i = 0, l = fns.length; i < l; i++) {
      fns[i].call(self)
    }
}

function emit1 (self, fns, a) {
  if (isFunction(fns))
    fns.call(self, a)
  else
    for (var i = 0, l = fns.length; i < l; i++) {
      fns[i].call(self, a)
    }
}

function emit2 (self, fns, a, b) {
  if (isFunction(fns))
    fns.call(self, a, b)
  else
    for (var i = 0, l = fns.length; i < l; i++) {
      fns[i].call(self, a, b)
    }
}

function emit3 (self, fns, a, b, c) {
  if (isFunction(fns))
    fns.call(self, a, b, c)
  else
    for (var i = 0, l = fns.length; i < l; i++) {
      fns[i].call(self, a, b, c)
    }
}

function emitN (self, fns, args) {
  var l = args.length - 1
  var a = new Array(l)
  var i = 0
  while (i < l) {
    a[i] = args[++i]
  }
  if (isFunction(fns))
    fns.apply(self, a)
  else
    for (var i = 0, l = fns.length; i < l; i++) {
      fns[i].apply(self, a)
    }
}

function isFunction (v) {
  return typeof v === 'function'
}

function isUndefined (v) {
  return typeof v === 'undefined'
}
