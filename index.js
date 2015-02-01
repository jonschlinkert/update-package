/*!
 * update-package <https://github.com/jonschlinkert/update-package>
 *
 * Copyright (c) 2015 Jon Schlinkert, contributors.
 * Licensed under the MIT license.
 */

'use strict';

var normalize = require('normalize-pkg');
var extend = require('extend-shallow');
var pkg = require('load-pkg');
var _ = require('lodash');
var Fields = require('./lib/fields');

module.exports = updatePackage;


function updatePackage(config) {
  config = extend({}, pkg, config);
  updateConfig(config);
  console.log(config)
}


updatePackage();

function updateConfig(config) {
  var fields = new Fields(config);

  fields.set('author', function (value, key, config) {
    return value;
  });

  fields.set('bugs', function (value, key, config) {
    return value;
  });

  fields.set('licenses', function (value, key, config) {
    return [{
      "type": "MIT",
      "url": "https://github.com/jonschlinkert/normalize-pkg/blob/master/LICENSE-MIT"
    }]
  });

  fields.set('license', function (value, key, config) {
    if (config.licenses) {
      value = config.licenses[0];
      delete config.licenses;
    }
    return value;
  });

  fields.set('repository', function (value, key, config) {
    return value;
  });

  fields.set('keywords', function (value, key, config) {
    return normalize.keywords(config)[key];
  });

  fields.update();
  return config;
}

