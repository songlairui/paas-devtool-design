const { patchRequire } = require('fs-monkey');

module.exports = (fsInstance) => {
  patchRequire(fsInstance);
  console.info('patchRequire ... ok');
};
