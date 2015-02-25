/*!
 * update-package <https://github.com/jonschlinkert/update-package>
 *
 * Copyright (c) 2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */

'use strict';

var fs = require('fs');
var normalize = require('normalize-pkg');
var merge = require('merge-deep');
var pkg = require('load-pkg');
var Fields = require('./lib/fields');

module.exports = updatePackage;

function updatePackage(config) {
  updateConfig(merge({}, pkg, config));
  return config;
}

function updateConfig(config) {
  var fields = new Fields(config);

  fields.set('author', function (value, key, config) {
    return value;
  });

  fields.set('bugs', function (value, key, config) {
    return value;
  });

  fields.set('license', function (value, key, config) {
    if (value && value.url) {
      config.licenses = [value];
    }
    return;
  });

  fields.set('licenses', function (value, key, config) {
    // if (value && value[0].url && value[0].url.indexOf('LICENSE-MIT') !== -1) {
    //   value[0].url = value[0].url.split('LICENSE-MIT').join('LICENSE');
    // }
    return value;
  });

  fields.set('repository', function (value, key, config) {
    return value;
  });

  fields.set('files', function (value, key, config) {
    if (typeof value === 'undefined') {
      value = ['index.js'];
    }
    return value;
  });

  fields.set('devDependencies', function (value, key, config) {
    if (typeof value === 'object' && value.hasOwnProperty('verb-tag-jscomments')) {
      delete value['verb-tag-jscomments'];
      delete value.verb;
    }

    return value;
  });

  fields.set('keywords', function (value, key, config) {
    // return normalize.keywords(config)[key];
    return value;
  });

  fields.set('scripts', function (value, key, config) {
    if (value && value.test && /mocha -r/i.test(value.test)) {
      value.test = 'mocha';
    }
    return value;
  });

  fields.update();
  return config;
}
