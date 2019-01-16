// 检测 dev.cookie 中 cop_domain 变化
const fs = require('fs');
const path = require('path');
const chokidar = require('chokidar');
const resolve = require('resolve');

const confFile = resolve.sync(path.resolve(__dirname, '../config'), {
  extensions: ['.js', '.json']
});

const devCookieWatcher = chokidar.watch(path.dirname(confFile), {
  ignored: /(^|[\/\\])\../,
  depth: 0
});

let callback;

devCookieWatcher.on('all', (type, fileName) => {
  console.info('all', type, fileName);
  try {
    callback && callback(currEnv);
  } catch (e) {
    console.warn(e && e.message);
  }
});

module.exports = {
  setCallback(fn) {
    callback = fn;
  }
};
