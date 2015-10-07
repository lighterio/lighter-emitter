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
    this._flags = {}
    this._maxListeners = defaultMaxListeners
  },

  /**
   * Set the maximum number of listeners that can listen to any type of event.
   *
   * @param  {Number} max  A new maximum number of listeners (or 0 == Infinity).
   */
  setMaxListeners: function setMaxListeners (max) {
    this._maxListeners = max || Infinity
    return this
  },

  /**
   * Bind a function as a listener for a type of event.
   *
   * @param  {String}   type  A type of event.
   * @param  {Function} fn    A listener function.
   */
  addListener: function addListener (type, fn) {
    var events = this._events
    var fns = events[type]
    var length = 1
    if (typeof fns === 'undefined') {
      events[type] = fn
      return this
    }
    if (typeof fns !== 'object') {
      fns = events[type] = [fns, fn]
    } else {
      length = fns.length
      fns[length] = fn
    }
    if (length >= this._maxListeners) {
      throw new Error('Exceeded ' + this._maxListeners + ' "' + type + '" listeners.')
    }
    return this
  },

  /**
   * Set an event listener to be fired only once.
   *
   * @param  {String}   type  A type of event.
   * @param  {Function} fn    A listener function.
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
   *
   * @param  {String} type  A type of event.
   */
  listeners: function listeners (type) {
    var fns = this._events[type]
    return typeof fns === 'undefined' ? [] : typeof fns === 'object' ? fns : [fns]
  },

  /**
   * Return the number of listeners for a type of event.
   *
   * @param  {String} type  A type of event.
   */
  listenerCount: function listenerCount (type) {
    var fns = this._events[type]
    return typeof fns === 'undefined' ? 0 : typeof fns === 'object' ? fns.length : 1
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
  setListener: function one (type, fn) {
    this._events[type] = fn
    return this
  },

  emit: function emit (type) {
    var fns = this._events[type]
    var i = 0
    var l = 0
    var a = null
    var n = typeof fns === 'function'
    if (typeof fns === 'undefined') return false
    switch (arguments.length) {
      case 1:
        if (n) fns.call(this)
        else for (l = fns.length; i < l; i++) fns[i].call(this)
        break
      case 2:
        if (n) fns.call(this, arguments[1])
        else for (l = fns.length; i < l; i++) fns[i].call(this, arguments[1])
        break
      case 3:
        if (n) fns.call(this, arguments[1], arguments[2])
        else for (l = fns.length; i < l; i++) fns[i].call(this, arguments[1], arguments[2])
        break
      case 4:
        if (n) fns.call(this, arguments[1], arguments[2], arguments[3])
        else for (l = fns.length; i < l; i++) fns[i].call(this, arguments[1], arguments[2], arguments[3])
        break
      default:
        l = arguments.length - 1
        a = new Array(l)
        while (i < l) a[i] = arguments[++i]
        if (n) fns.apply(this, a)
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

var proto = Emitter.prototype
proto.on = proto.addListener
proto.off = proto.removeListener
proto.one = proto.setListener
proto.all = proto.listeners
proto.count = proto.listenerCount
proto.clear = proto.removeAllListeners
