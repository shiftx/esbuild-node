#!/usr/bin/env node

// Get and remove script from argv
var argv = process.argv;
var script = argv[2];
process.argv = process.argv.filter(function(_, i) {
    return i !== 2;
});

// Check if script file exists
var fs = require("fs");
if (!script.match(/\.(ts|js)x?/)) {
    ['ts', 'js', 'tsx', 'jsx'].find(ext => {
        if (fs.existsSync("./" + script + '.' + ext)) {
            script = script + '.' + ext
            return true
        }
    })
}

if (!fs.existsSync("./" + script)) {
    throw new Error("No script found");
}

// Build
var buildSync = require("esbuild").buildSync;

var res = buildSync({
    entryPoints: ["./" + script],
    write: false,
    platform: "node",
    bundle: true,
    target: "es2015",
});

eval(Buffer.from(res.outputFiles[0].contents).toString());
