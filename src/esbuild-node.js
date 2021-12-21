// Get and remove script from argv

var argv = process.argv;
var script = argv[2];
process.argv = process.argv.filter(function (_, i) {
  return i !== 2;
});

if (!script) {
  console.error("Error: No script provided");
  process.exit(1);
}

// Check if script file exists
var fs = require("fs");
if (!script.match(/\.(ts|js)x?/)) {
  ["ts", "js", "tsx", "jsx"].find(ext => {
    if (fs.existsSync("./" + script + "." + ext)) {
      script = script + "." + ext;
      return true;
    }
  });
}

if (!fs.existsSync("./" + script)) {
  throw new Error("No script found");
}

var cwd = process.cwd();
__dirname = cwd;
__filename = cwd + "/" + script;

// Build
var buildSync = require("esbuild").buildSync;

var path = require("path");

var getConfig = require("./get-config");

var res = buildSync({
  entryPoints: [__filename],
  ...getConfig(),
});

var Module = require("module");
var dir = path.dirname(script);
var scriptModule = new Module(dir);
scriptModule.filename = script;
scriptModule.paths = Module._nodeModulePaths(dir);

Object.assign(global, {
  __filename: script,
  __dirname: dir,
  exports: scriptModule.exports,
  module: scriptModule,
  require: scriptModule.require.bind(scriptModule),
});

require("vm").runInThisContext(
  Buffer.from(res.outputFiles[0].contents).toString(),
  { filename: script }
);
