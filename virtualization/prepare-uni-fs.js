const { ufs } = require('unionfs');
const fsReal = require('fs');
const MemoryFileSystem = require('memory-fs');
const fsMem = new MemoryFileSystem(); // Optionally pass a javascript object

const { targetFolder } = require('./prepare-env');

ufs.use(fsMem);
ufs.use(fsReal);

fsMem.realpathSync = (str) => str;

module.exports = {
  fsMem,
  fsReal,
  ufs
};
