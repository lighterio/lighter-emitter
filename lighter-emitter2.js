'use strict'
/**
 * Emitter is a lightweight alternative to Node's events.EventEmitter object.
 */
var Type = require('lighter-type')
var Emitter = module.exports = Type.extend({

  /**
   * Set empty events.
   */
  init: function init () {
    this._events = {}
    this._maxListeners = Emitter.defaultMaxListeners
  },

  /**
   * Set the maximum number of listeners that can listen to any type of event.
   *
   * @param {number} max  A new maximum number of listeners (or 0 == Infinity).
   */
  setMaxListeners: function setMaxListeners (max) {
    this._maxListeners = max || Infinity
    return this
  },

  /**
   * Handle the case of max listeners being exceeded for an event type.
   */
  maxListenersExceeded: function maxListenersExceeded (type) {
    throw new Error('Max ' + this._maxListeners + ' listeners exceeded for "' + type + '".')
  },

  /**
   * Bind a function as a listener for a type of event.
   */
  addListener: function addListener (type, fn) {
    var events = this._events
    var fns = events[type]
    if (isUndefined(fns)) {
      events[type] = fn
    } else if (typeof fns !== 'object') {
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
  once: function once (type, fn) {
    function one () {
      this.removeListener(type, one)
      fn.apply(this, arguments)
    }
    this.on(type, one)
    return this
  },

  /**
   * Return an array of listeners for a type of event.
   */
  listeners: function listeners (type) {
    var fns = this._events[type]
    return (typeof fns !== 'undefined') ? (typeof fns !== 'object' ? [fns] : fns) : []
  },

  /**
   * Return the number of listeners for a type of event.
   */
  listenerCount: function listenerCount (type) {
    var fns = this._events[type]
    return (typeof fns !== 'undefined') ? (typeof fns !== 'object' ? 1 : fns.length) : 0
  },

  /**
   * Remove an event listener.
   */
  removeListener: function removeListener (type, fn) {
    var events = this._events
    var fns = events[type]
    if (fns === fn) {
      events[type] = undefined
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
  removeAllListeners: function removeAllListeners (type) {
    if (typeof type === 'string') {
      this._events[type] = undefined
    } else {
      this._events = {}
    }
    return this
  },

  /**
   * Set one listener for a type of event (replacing any others).
   */
  one: function one (type, fn) {
    this._events[type] = fn
    return this
  },

  emit: function emit (type) {
    var fns = this._events[type], isFn, i, l, a
    if (typeof fns === 'undefined') return false
    var isFn = typeof fns !== 'object'
    switch (arguments.length) {
      case 1:
        if (isFn) fns.call(this)
        else for (i = 0, l = fns.length; i < l; i++) fns[i].call(this)
        break
      case 2:
        if (isFn) fns.call(this, arguments[1])
        else for (i = 0, l = fns.length; i < l; i++) fns[i].call(this, arguments[1])
        break
      case 3:
        if (isFn) fns.call(this, arguments[1], arguments[2])
        else for (i = 0, l = fns.length; i < l; i++) fns[i].call(this, arguments[1], arguments[2])
        break
      case 4:
        if (isFn) fns.call(this, arguments[1], arguments[2], arguments[3])
        else for (i = 0, l = fns.length; i < l; i++) fns[i].call(this, arguments[1], arguments[2], arguments[3])
        break
      default:
        i = 0
        l = arguments.length - 1
        a = new Array(l)
        while (i < l) a[i] = arguments[++i]
        if (isFn) fns.apply(this, a)
        else for (i = 0, l = fns.length; i < l; i++) fns[i].apply(this, a)
    }
    return false
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
Emitter.listenerFnError = new Error('Listener must be a function')

var proto = Emitter.prototype
proto.on = proto.addListener
proto.off = proto.removeListener
proto.stop = proto.removeAllListeners

function isUndefined (v) {
  return typeof v === 'undefined'
}
