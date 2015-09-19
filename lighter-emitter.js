/**
 * Emitter is a lightweight event emitter object with an API similar
 * to Node's EventEmitter.
 *
 * - `emitter.addListener` is not available. Use `emitter.on` instead (and
 *   save a few characters)
 *
 * - `emitter.on` throws an error if there are too many listeners, whereas,
 *   Node would log to the console.
 *
 * - `emitter._events` doesn't exist until you've added listeners, and it is
 *   deleted if you remove all listeners.
 */

var Type = require('lighter-type')
var Emitter = module.exports = Type.extend({

  /**
   * Empty constructor (for speed).
   */
  init: function () {},

  /**
   * Set the maximum number of listeners that can listen to any type of event.
   */
  setMaxListeners: function (max) {
    this._maxListeners = max ? max : Infinity
    return this
  },

  /**
   * Handle the case of max listeners being exceeded for an event type.
   */
  maxListenersExceeded: function (type) {
    var max = this._maxListeners || Emitter.defaultMaxListeners
    throw new Error('Max ' + this._maxListeners + ' listeners exceeded for "' + type + '".')
  },

  /**
   * Bind a function as a listener for a type of event.
   */
  on: function (type, fn) {
    var events = this._events = this._events || {}
    var listeners = events[type]
    var max = this._maxListeners || Emitter.defaultMaxListeners
    // If there's only one, don't waste an Array.
    if (!listeners) {
      events[type] = fn

    // When there's more than one, start an Array unless the max is 1.
    } else if (typeof listeners === 'function') {
      if (max > 1) {
        events[type] = [listeners, fn]
      } else {
        this.maxListenersExceeded(type)
      }

    // When it's already an Array, push unless we've exceeded the max.
    } else {
      if (listeners.length < max) {
        listeners.push(fn)
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
      this.removeListener(type, one)
      fn.apply(this, arguments)
    }
    this.on(type, one)
    return this
  },

  /**
   * Emit an event with optional data.
   */
  emit: function (type, data) {
    var events = this._events
    if (events) {
      var listeners = events[type]
      if (listeners) {
        // If there's more than one data argument, build an array.
        var args
        if (arguments.length > 2) {
          args = Array.prototype.slice.call(arguments, 1)
        }
        // If there's only one listener, run it.
        if (typeof listeners === 'function') {
          if (args) {
            listeners.apply(this, args)
          } else {
            listeners.call(this, data)
          }

        // If there's more than one listener, run them all.
        } else {
          for (var i = 0, l = listeners.length; i < l; i++) {
            if (args) {
              listeners[i].apply(this, args)
            } else {
              listeners[i].call(this, data)
            }
          }
        }
      }
    }
    return this
  },

  /**
   * Return an array of listeners for an event type.
   */
  listeners: function (type) {
    var events = this._events
    var list = events ? events[type] : undefined
    return !list ? [] : list instanceof Array ? list : [list]
  },

  /**
   * Remove an event listener.
   */
  removeListener: function (type, fn) {
    var events = this._events
    if (events) {
      var listeners = events[type]
      if (listeners === fn) {
        delete events[type]
        this.emit('removeListener', type, fn)
      } else if (listeners instanceof Array) {
        for (var i = listeners.length - 1; i >= 0; i--) {
          if (listeners[i] === fn) {
            listeners.splice(i, 1)
            this.emit('removeListener', type, fn)
          }
          if (listeners.length === 1) {
            listeners = listeners[0]
            return this
          }
        }
      }
    }
    return this
  },

  /**
   * Remove all event listeners (optionally of a specified type).
   */
  removeAllListeners: function (type) {
    var events = this._events
    // We only need to do something if there are events.
    if (events) {
      if (type) {
        delete events[type]
      } else {
        delete this._events
      }
    }
    return this
  },

  /**
   * Set one listener for a type of event (replacing any others).
   */
  one: function (type, fn) {
    var events = this._events = this._events || {}
    events[type] = fn
    return this
  }

})

// Same default as native EventEmitter.
Emitter.defaultMaxListeners = 10
