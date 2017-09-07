'use strict';

require('wicg-inert');

const focusableElements = 'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, [tabindex="0"], [contenteditable], audio[controls], video[controls]';

const keyCodes = {
  esc: 27,
  tab: 9,
  upArrow: 38,
  rightArrow: 39,
  downArrow: 40,
  leftArrow: 37
};

class ButaneDialog {
  constructor (element, options) {
    if (!element) {
      throw new Error('Dialog requires an element reference')
    }

    // Setup our default dialog options
    this.options = {
      bodyActiveClass: options.bodyActiveClass ? options.bodyActiveClass : 'dialog-isOpen',
      dialogActiveClass: options.dialogActiveClass ? options.dialogActiveClass : 'is-active',
      contentContainer: options.contentContainer ? options.contentContainer : '#main'
    };

    this.dialogButton = element;
    this.dialogId = this.dialogButton.getAttribute('data-butane-dialog-controls');

    this.dialogElement = document.getElementById(this.dialogId);
    this._focusableElements = Array.from(
      this.dialogElement.querySelectorAll(focusableElements)
    );
    this.dialogHideElements = this.dialogElement.querySelectorAll('[data-butane-dialog-hide]');

    this.contentContainer = document.querySelector(this.options.contentContainer);

    if (!this.contentContainer) {
      throw new Error('No content container element was found')
    }

    // Prebind the functions that will be bound in
    // addEventListener and removeEventListener to
    // avoid losing references
    this._show = this.show.bind(this);
    this._hide = this.hide.bind(this);
    this._bindKeyPress = this.bindKeyPress.bind(this);

    this.previousActiveElement = null;
    this.dialogIsVisible = false;
    this.dialogElement.setAttribute('aria-hidden', true);
    this.dialogElement.inert = true;

    this.addEventListeners();
  }

  addEventListeners () {
    this.dialogButton.addEventListener('click', this._show);
    this.dialogHideElements.forEach(element => {
      element.addEventListener('click', this._hide);
    });
    this.dialogElement.addEventListener('keydown', this._bindKeyPress);
  }

  /**
   * Show the dialog window.
   *
   * @param {Object}
   * @return {null}
   */
  show (e) {
    e.preventDefault();
    // Capture the previous active element
    this.previousActiveElement = document.activeElement;
    this.dialogIsVisible = true;
    document.body.classList.add(this.options.bodyActiveClass);
    this.dialogElement.inert = false;
    this.dialogElement.setAttribute('aria-hidden', false);
    this.dialogElement.classList.add(this.options.dialogActiveClass);
    this.contentContainer.inert = true;

    if (this._focusableElements.length > 0) {
      this._focusableElements[0].focus();
    }
  }

  /**
   * Hide the dialog window.
   *
   * @param {Object}
   * @return {null}
   */
  hide (e) {
    e.preventDefault();
    this.dialogIsVisible = false;
    document.body.classList.remove(this.options.bodyActiveClass);
    this.dialogElement.inert = true;
    this.dialogElement.setAttribute('aria-hidden', true);
    this.dialogElement.classList.remove(this.options.dialogActiveClass);
    this.contentContainer.inert = false;

    // Focus previous active element when hiding the dialog
    this.previousActiveElement.focus();
  }

  /**
   * Check if the `esc` key has been pressed.
   *
   * @param {Object} e The event object
   * @return {null}
   */
  bindKeyPress (e) {
    // Ensure dialog is visible before hiding
    if (this.dialogIsVisible) {
      // Hide the modal window on `esc` key press
      if (e.keyCode === keyCodes.esc) {
        this._hide(e);
      }
    }
  }
}

const init = (options = {}) => {
  const butaneDialogs = document.querySelectorAll('[data-butane-dialog-controls]');

  Array.from(butaneDialogs).forEach(dialog => {
    new ButaneDialog(dialog, options);
  });
};

var main = { init };

module.exports = main;
