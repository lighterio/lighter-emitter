# lighter-emitter Benchmarks

Micro benchmarks shouldn't be the sole reason to choose a library, however,
speed is a feature, so performance should not be overlooked. The following
benchmarks can be run by cloning this repository, installing dependencies,
and using the `bench` script, built on [Exam](http://lighter.io/exam).

```bash
git clone https://github.com/lighterio/lighter-emitter.git
cd lighter-emitter
npm install
npm run bench -- -T 60000 # Roughly 60 seconds per benchmark.
```

Results vary, and this is merely the output from a single set of runs.

```
._(O)_    ____         v1.1.0
|@A#A@|  | ___)_ ___ _ _ _ _
|@@@@@|  | _)_\ V /o` | ` ` \
|@@@@@|  |____/_A_\_,_|_|_|_|
 """""
···································+++++++++++++++++++++++++

 Emitter constructor
   ✔ lighter-emitter:      Fastest  70.945K op/s ±27.0K op/s   27.9M runs
   • events.EventEmitter: -17.866%  58.270K op/s ±19.6K op/s   27.9M runs

 Emitter.prototype.on
   called once
     ✔ lighter-emitter:      Fastest  97.220K op/s ±29.2K op/s   10.9M runs
     • events.EventEmitter: -8.2511%  89.198K op/s ±23.7K op/s   10.9M runs
   called twice
     ✔ lighter-emitter:      Fastest  73.318K op/s ±26.0K op/s   7.53M runs
     • events.EventEmitter: -10.671%  65.494K op/s ±20.8K op/s   7.53M runs
   called three times
     ✔ lighter-emitter:      Fastest  69.388K op/s ±24.9K op/s   6.91M runs
     • events.EventEmitter: -24.995%  52.044K op/s ±14.2K op/s   6.91M runs
   called 100 times
     ✔ lighter-emitter:      Fastest  9.9712K op/s ±3.36K op/s   582K runs
     • events.EventEmitter: -71.440%  2.8477K op/s   ±492 op/s   582K runs

 Emitter.prototype.removeListener
   Adding and removing 5 listeners
     ✔ lighter-emitter:      Fastest  65.613K op/s ±26.5K op/s   21.3M runs
     • events.EventEmitter: -40.024%  39.351K op/s ±12.6K op/s   21.3M runs

 Emitter.prototype.once
   ✔ lighter-emitter:      Fastest  55.445K op/s ±19.8K op/s   9.54M runs
   • events.EventEmitter: -32.823%  37.246K op/s ±12.3K op/s   9.54M runs

 Emitter.prototype.emit (zero listeners)
   zero arguments
     ✔ lighter-emitter:      Fastest  30.096K op/s ±5.51K op/s   5.85M runs
     • events.EventEmitter: -41.714%  17.541K op/s ±2.71K op/s   5.85M runs
   one argument
     ✔ lighter-emitter:      Fastest  25.574K op/s ±7.54K op/s   4.89M runs
     • events.EventEmitter: -36.135%  16.332K op/s ±3.31K op/s   4.89M runs
   two arguments
     ✔ lighter-emitter:      Fastest  25.352K op/s ±7.01K op/s   1.62M runs
     • events.EventEmitter: -36.047%  16.213K op/s ±3.33K op/s   1.62M runs
   three arguments
     ✔ lighter-emitter:      Fastest  29.831K op/s ±6.22K op/s   1.96M runs
     • events.EventEmitter: -39.420%  18.071K op/s ±3.32K op/s   1.96M runs
   four arguments
     ✔ lighter-emitter:      Fastest  25.600K op/s ±6.83K op/s   1.64M runs
     • events.EventEmitter: -36.255%  16.319K op/s ±3.46K op/s   1.64M runs

 Emitter.prototype.emit (one listener)
   zero arguments
     ✔ lighter-emitter:      Fastest  73.273K op/s ±28.4K op/s   12.5M runs
     • events.EventEmitter: -15.499%  61.916K op/s ±24.9K op/s   12.5M runs
   one argument
     ✔ lighter-emitter:      Fastest  71.810K op/s ±26.7K op/s   12.3M runs
     • events.EventEmitter: -23.279%  55.093K op/s ±17.7K op/s   12.3M runs
   two arguments
     ✔ lighter-emitter:      Fastest  68.568K op/s ±25.8K op/s   3.93M runs
     • events.EventEmitter: -22.153%  53.378K op/s ±17.4K op/s   3.93M runs
   three arguments
     ✔ lighter-emitter:      Fastest  59.200K op/s ±23.0K op/s   3.43M runs
     • events.EventEmitter: -15.695%  49.909K op/s ±18.6K op/s   3.43M runs
   four arguments
     ✔ lighter-emitter:      Fastest  18.912K op/s ±7.05K op/s   1.19M runs
     • events.EventEmitter: -8.4813%  17.308K op/s ±6.01K op/s   1.19M runs

 Emitter.prototype.emit (two listeners)
   zero arguments
     ✔ lighter-emitter:      Fastest  19.349K op/s ±9.12K op/s   3.00M runs
     • events.EventEmitter: -3.8110%  18.611K op/s ±9.78K op/s   3.00M runs
   one argument
     ✔ lighter-emitter:      Fastest  42.277K op/s ±11.3K op/s   7.57M runs
     • events.EventEmitter: -15.268%  35.822K op/s ±7.99K op/s   7.57M runs
   two arguments
     ✔ lighter-emitter:      Fastest  37.335K op/s ±12.9K op/s   2.21M runs
     • events.EventEmitter: -8.2403%  34.258K op/s ±10.8K op/s   2.21M runs
   three arguments
     ✔ lighter-emitter:      Fastest  30.304K op/s ±11.5K op/s   1.70M runs
     • events.EventEmitter: -6.9684%  28.192K op/s ±9.88K op/s   1.70M runs
   four arguments
     ✔ lighter-emitter:      Fastest  13.807K op/s ±3.45K op/s   877K runs
     • events.EventEmitter: -5.9740%  12.982K op/s ±2.99K op/s   877K runs

 Emitter.prototype.listeners
   with zero listeners
     • lighter-emitter:      Fastest  16.794K op/s ±2.79K op/s   2.17M runs
     • events.EventEmitter: -0.1501%  16.768K op/s ±2.79K op/s   2.17M runs
   with one listener
     ✔ lighter-emitter:      Fastest  17.717K op/s ±3.31K op/s   2.29M runs
     • events.EventEmitter: -0.5437%  17.621K op/s ±3.28K op/s   2.29M runs
   with two listeners
     • lighter-emitter:      Fastest  18.610K op/s ±3.84K op/s   2.38M runs
     • events.EventEmitter: -0.1373%  18.585K op/s ±3.84K op/s   2.38M runs

 50 passed (44.0m)
```

Pull requests are always welcome. Feel free to submit your own benchmarks.
