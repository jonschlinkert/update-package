'use strict';

var verb = require('verb');
var update = require('./');

verb.engine('json', function json(str, options, cb) {
  if (typeof options === 'function') {
    cb = options; options = {};
  }
  try {
    cb(null, update(str));
  } catch (err) { cb(err); }
});


verb.task('none', function() {
  verb.src('package.json')
    .pipe(verb.dest('.'));
});

verb.task('default', function() {
  verb.src('.verb.md')
    .pipe(verb.dest('.'));
});
