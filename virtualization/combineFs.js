const { traverse } = require('./utils');

module.exports = function({ targetFolder, patchFolder, fsMem, fsReal }) {
  fsMem.mkdirpSync(targetFolder);
  traverse(patchFolder, ({ isDir, srcPath }) => {
    const targetPath = srcPath.replace(patchFolder, targetFolder);
    if (isDir) {
      fsMem.mkdirpSync(targetPath);
    } else {
      const raw = fsReal.readFileSync(srcPath);
      fsMem.writeFileSync(targetPath, raw);
      console.info(`${targetPath} ...\twritten`);
    }
  });
  console.info('combine ... finished');
};
