/*!
 * update-package <https://github.com/jonschlinkert/update-package>
 *
 * Copyright (c) 2015 Jon Schlinkert.
 * Licensed under the MIT license.
 */

'use strict';

var assert = require('assert');
var should = require('should');
var pkg = require('./');

describe('pkg', function () {
  it('should use package.json of the current project by default:', function () {
    pkg().name.should.equal('update-package');
  });

  it('should use a config passed on the options:', function () {
    pkg({name: 'foo'}).name.should.equal('foo');
  });

  // it('should throw an error:', function () {
  //   (function () {
  //     updatePackage();
  //   }).should.throw('updatePackage expects valid arguments');
  // });
});
