# butane-dialog

[![butane-dialog on NPM](https://img.shields.io/npm/v/butane-dialog.svg?style=flat-square)](https://www.npmjs.com/package/butane-dialog) [![Standard JavaScript Style](https://img.shields.io/badge/code_style-standard-brightgreen.svg?style=flat-square)](http://standardjs.com/)

> A modern accessible dialog library.

## Install

Install butane-dialog, and add it to your `package.json` dev dependencies.

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

### bodyActiveClass

Customize the class that gets added to the body element when the dialog is shown.

```es6
const dialog = new ButaneDialog('.js-dialog', {
  bodyActiveClass: 'dialog-isOpen'
})
```

### dialogActiveClass

Customize the dialog active class.

```es6
const dialog = new ButaneDialog('.js-dialog', {
  dialogActiveClass: 'is-active'
})
```

## License

[MIT](https://opensource.org/licenses/MIT). © 2017 Alex Carpenter
