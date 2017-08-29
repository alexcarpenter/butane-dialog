# Butane Dialog

[![butane-dialog on NPM](https://img.shields.io/npm/v/layzr.js.svg?style=flat-square)](https://www.npmjs.com/package/butane-dialog) [![Standard JavaScript Style](https://img.shields.io/badge/code_style-standard-brightgreen.svg?style=flat-square)](http://standardjs.com/)

> A modern accessible dialog library.

## Install

Install Butane Dialog, and add it to your `package.json` dev dependencies.

```
$ npm install butane-dialog --save-dev
```

Then `import` it into the file where you'll use it.

```es6
import ButaneDialog from 'butane-dialog'
```

## Instantiate

```es6
// using the default options

const dialog = new ButaneDialog('.js-dialog')

// using custom options

const dialog = new ButaneDialog('.js-dialog', {
  // ...
})
```

## Options

Default options are shown below, and an explanation of each follows:

```es6
const dialog = new ButaneDialog('.js-dialog', {
  bodyActiveClass: 'dialog-isOpen',
  dialogActiveClass: 'is-active'
})
```

