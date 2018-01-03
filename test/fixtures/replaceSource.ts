/**
 * @fileOverview
 * @author 凌恒 <jiakun.dujk@alibaba-inc.com>
 * @copyright 2017 Alibaba Group.
 */

import { hook } from '../../src/index';
import * as assert from 'assert';
const Module = require('module');
// 因为 ModuleHook 加载了，所以有缓存，先清理掉
Module._cache = Object.create(null);

hook('semver', '5.x', (loadModule, replaceSource, version) => {
  assert(version);
  replaceSource('semver.js', (source) => {
    return 'module.exports = 1';
  });
});

const semver = require('semver');
assert(semver === 1);
process.send('done');