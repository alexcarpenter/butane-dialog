# butane-dialog

⚠️ This project is no longer maintained, checkout [butane-show-hide](https://github.com/alexcarpenter/butane-show-hide) instead. ⚠️

> Accessible dialog JS library.

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
ButaneDialog.init()

// using custom options, default options listed
ButaneDialog.init({
  bodyActiveClass: 'dialog-isOpen',
  dialogActiveClass: 'is-active',
  contentContainer: '#main'
})
```

## Expected DOM structure

```html
<main id="main">
  <button data-butane-dialog-controls="dialog">Show Dialog</button>
</main>

<div class="c-dialog" id="dialog" aria-hidden="true">
  <div class="c-dialog__content" role="dialog" aria-labelledby="dialog-title" aria-modal="true">
    <header class="c-dialog__header">
      <h2 id="dialog-title">Dialog</h2>
      <button data-butane-dialog-hide>Close</button>
    </header>
    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quas, molestiae ad assumenda aliquam error aspernatur id consequatur architecto distinctio odit. Veritatis, dolorem rerum obcaecati quas velit quaerat saepe veniam sint?</p>
  </div>
  <div class="c-dialog__overlay" data-butane-dialog-hide></div>
</div>
```

## License

[MIT](https://opensource.org/licenses/MIT). © 2017 Alex Carpenter
