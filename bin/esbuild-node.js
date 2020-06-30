#!/usr/bin/env node

// Get and remove script from argv
var argv = process.argv;
var script = argv[2];
process.argv = process.argv.filter(function(_, i) {
    return i !== 2;
});

// Check if script file exists
var fs = require("fs");
if (!fs.existsSync("./" + script)) {
    throw new Error("No script found");
}

// Generate tmp build dir
var path = require("path");
var os = require("os");
var tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "esbuild-node-"));

// Build
var buildSync = require("esbuild").buildSync;
var outfile = tmpDir + "/out.js";
const res = buildSync({
    entryPoints: ["./" + script],
    outfile: outfile,
    platform: "node",
    bundle: true,
    target: "es2015",
});

// Load built file
require(outfile);
