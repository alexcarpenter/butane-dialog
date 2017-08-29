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
  dialogActiveClass: 'is-active',
  contentContainer: '#main'
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

### contentContainer

```es6
const dialog = new ButaneDialog('.js-dialog', {
  contentContainer: '#main'
})
```

## Expected DOM structure

```html
<main id="main">
  <button class="js-dialog" aria-controls="dialog">Show Dialog</button>
</main>

<div class="c-dialog" id="dialog" aria-hidden="true">
  <div class="c-dialog__content" role="dialog" aria-labelledby="dialog-title">
    <header class="c-dialog__header">
      <h2 id="dialog-title" tabindex="0">Dialog</h2>
      <button data-hide-dialog>Close</button>
    </header>
    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quas, molestiae ad assumenda aliquam error aspernatur id consequatur architecto distinctio odit. Veritatis, dolorem rerum obcaecati quas velit quaerat saepe veniam sint?</p>
  </div>
  <div class="c-dialog__overlay" tabindex="-1" data-hide-dialog></div>
</div>
```

## License

[MIT](https://opensource.org/licenses/MIT). © 2017 Alex Carpenter
