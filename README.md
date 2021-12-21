# esbuild-node

Transform and run ts/js with the blazing fast esbuild

## Installation

```bash
npm install --save-dev esbuild-node
```
or
```bash
yarn add -D esbuild-node
```

## Usage

```bash
esbuild-node src/script.ts arg1 arg2
```

## Using the configuration file

In the root of the project, create a file `.esbuild-node.config.js`

```js
// .esbuild-node.config.js

/** @typedef { import('esbuild').BuildOptions } BuildOptions */

/**
 * @type {BuildOptions}
 */
module.exports = {
  // ... example options
  loader: {
    '.png': 'dataurl',
  },
};
```