(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.ButaneDialog = factory());
}(this, (function () { 'use strict';

var focusableElements = 'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, [tabindex="0"], [contenteditable], audio[controls], video[controls]';

var keyCodes = {
  esc: 27,
  tab: 9,
  upArrow: 38,
  rightArrow: 39,
  downArrow: 40,
  leftArrow: 37
};

var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

var ButaneDialog = function () {
  function ButaneDialog(element) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    classCallCheck(this, ButaneDialog);

    if (!element) {
      throw new Error('Dialog requires an element reference');
    }

    // Setup our default dialog options
    this.options = {
      bodyActiveClass: options.bodyActiveClass ? options.bodyActiveClass : 'dialog-isOpen',
      dialogActiveClass: options.dialogActiveClass ? options.dialogActiveClass : 'is-active'
    };

    this.dialogButton = document.querySelector(element);
    this.dialogId = this.dialogButton.getAttribute('aria-controls');

    if (!this.dialogId) {
      throw new Error('Dialog button requires an aria controls attribute');
    }

    this.dialogElement = document.getElementById(this.dialogId);
    this._focusableElements = Array.from(this.dialogElement.querySelectorAll(focusableElements));
    this.dialogHideElements = this.dialogElement.querySelectorAll('[data-hide-dialog]');

    // Prebind the functions that will be bound in
    // addEventListener and removeEventListener to
    // avoid losing references
    this._toggleDialog = this.toggleDialog.bind(this);
    this._showDialog = this.showDialog.bind(this);
    this._hideDialog = this.hideDialog.bind(this);
    this._checkEsc = this.checkEsc.bind(this);

    this.initDialog();
  }

  createClass(ButaneDialog, [{
    key: 'initDialog',
    value: function initDialog() {
      this.previousActiveElement = null;
      this.dialogIsVisible = false;
      this.dialogElement.setAttribute('aria-hidden', true);
      this.dialogElement.inert = true;
      this._focusableElements.forEach(function (element) {
        element.setAttribute('tabindex', -1);
      });
      // Start watching for button clicks to show dialog
      this.dialogButton.addEventListener('click', this._toggleDialog);
    }
  }, {
    key: 'toggleDialog',
    value: function toggleDialog() {
      var dialogShow = this.dialogElement.getAttribute('aria-hidden') === 'false';
      return dialogShow ? this._showDialog() : this._hideDialog();
    }

    /**
     * Show the dialog window.
     *
     * @param {Object}
     * @return {null}
     */

  }, {
    key: 'showDialog',
    value: function showDialog(e) {
      var _this = this;

      e.preventDefault();
      // Capture the previous active element
      this.previousActiveElement = document.activeElement;
      this.dialogIsVisible = true;
      document.body.classList.add(this.options.bodyActiveClass);
      this.dialogElement.removeAttribute('inert');
      this.dialogElement.setAttribute('aria-hidden', false);
      this.dialogElement.classList.add(this.options.dialogActiveClass);

      if (this._focusableElements.length > 0) {
        this._focusableElements.forEach(function (element) {
          element.setAttribute('tabindex', 0);
        });
        this._focusableElements[0].focus();
      }

      // Add/remove event listeners
      this.dialogHideElements.forEach(function (element) {
        element.addEventListener('click', _this._hideDialog);
      });
      this.dialogButton.removeEventListener('click', this._showDialog);
      document.addEventListener('keydown', this._checkEsc);
    }

    /**
     * Hide the dialog window.
     *
     * @param {Object}
     * @return {null}
     */

  }, {
    key: 'hideDialog',
    value: function hideDialog(e) {
      var _this2 = this;

      e.preventDefault();
      this.dialogIsVisible = false;
      document.body.classList.remove(this.options.bodyActiveClass);
      this.dialogElement.inert = true;
      this.dialogElement.setAttribute('aria-hidden', true);
      this.dialogElement.classList.remove(this.options.dialogActiveClass);

      if (this._focusableElements.length > 0) {
        this._focusableElements.forEach(function (element) {
          element.setAttribute('tabindex', -1);
        });
      }

      // Focus previous active element when hiding the dialog
      this.previousActiveElement.focus();

      // Add/remove event listeners
      this.dialogHideElements.forEach(function (element) {
        element.removeEventListener('click', _this2._hideDialog);
      });
      this.dialogButton.addEventListener('click', this._showDialog);
      document.removeEventListener('keydown', this._checkEsc);
    }

    /**
     * Check if the `esc` key has been pressed.
     *
     * @param {Object} e The event object
     * @return {null}
     */

  }, {
    key: 'checkEsc',
    value: function checkEsc(e) {
      // Ensure dialog is visible before hiding
      if (this.dialogIsVisible) {
        // Hide the modal window on `esc` key press
        if (e.keyCode === keyCodes.esc) {
          this._hideDialog(e);
        }
      }
    }
  }]);
  return ButaneDialog;
}();

return ButaneDialog;

})));
