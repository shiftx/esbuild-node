const path = require('path');
const fs = require('fs');

module.exports = function getConfig() {
  const rootDir = process.cwd();
  const configFilePath = path.join(rootDir, ".esbuild-node.config.js");
  const hasConfigFile = fs.existsSync(configFilePath);

  const config = hasConfigFile ? require(configFilePath) : {};

  return {
    write: false,
    platform: "node",
    bundle: true,
    target: "node" + process.version.match(/v(.+)/)[1],
    ...config,
  };
};
