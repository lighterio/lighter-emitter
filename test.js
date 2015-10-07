var Emitter = require('lighter-emitter')

var BoomEmitter = Emitter.extend({

  emit: function (type) {
    this._super.emit.apply(this, arguments)
    console.log('Boom!')
  }

})

var boomer = new BoomEmitter()
boomer.on('hi', function () {
  console.log('Hi!')
})
boomer.emit('hi')
