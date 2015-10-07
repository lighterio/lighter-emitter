# lighter-emitter Roadmap

***This is a living document. It describes priorities as they are perceived
today, and it can evolve over time.***

## Full Swappability with events.EventEmitter
Since lighter-emitter is slightly faster in benchmarks than Node's builtin
EventEmitter, it stands to reason that a service which uses lighter-emitter
instead of events.EventEmitter could process a few more requests per second.
At the moment, there is no method for doing this, and attempts have caused
the process to be unresponsive. But eventually, it would be great if you
could just call a method to make lighte-emitter propagate itself by
decorating existing emitters and replacing the EventEmitter constructor:
```js
require('lighter-emitter').propagate()
```

## Validation
There should be an option to check the types of inputs, at least in a development environment where most debugging is done, and where performance is not critical.

## Got ideas?
If you have ideas for features that should be in this roadmap, please submit
a pull request.

