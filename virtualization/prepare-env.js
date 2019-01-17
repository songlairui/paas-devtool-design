const fsReal = require('fs');
const path = require('path');

const targetLink = path.resolve(
  __dirname,
  '..',
  'node_modules',
  'engine-mobile'
);

if (!fsReal.existsSync(targetLink)) {
  throw new Error(`U should execute yarn link ${'engine-mobile'}`);
}
const targetFolder = fsReal.realpathSync(targetLink);

const patchFolder = path.resolve(__dirname, '../fs-patch');

module.exports = { patchFolder, targetFolder };
