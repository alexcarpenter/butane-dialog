'use strict'

import 'wicg-inert'
import { focusableElements, keyCodes } from './utils'

class ButaneDialog {
  constructor (element, options) {
    // Setup our default dialog options
    this.defaults = {
      bodyActiveClass: 'dialog-isOpen',
      dialogActiveClass: 'is-active',
      contentContainer: '#main'
    }
    this.config = Object.assign({}, this.defaults, options)
    this.dialogButton = element
    this.dialogId = this.dialogButton.getAttribute('data-butane-dialog-controls')
    this.dialogElement = document.getElementById(this.dialogId)

    if (!this.dialogElement) {
      throw new Error(`A Dialog with an ID of ${this.dialogId} does not exist.`)
    }

    this.focusableElements = Array.from(
      this.dialogElement.querySelectorAll(focusableElements)
    )
    this.dialogHideElements = this.dialogElement.querySelectorAll('[data-butane-dialog-hide]')
    this.contentContainer = document.querySelector(this.config.contentContainer)

    if (!this.contentContainer) {
      throw new Error('No content container element was found.')
    }

    // Prebind the functions that will be bound in
    // addEventListener and removeEventListener to
    // avoid losing references
    this._show = this.show.bind(this)
    this._hide = this.hide.bind(this)
    this._bindKeyPress = this.bindKeyPress.bind(this)

    this.previousActiveElement = null
    this.dialogIsVisible = false
    this.dialogElement.setAttribute('aria-hidden', true)
    this.dialogElement.inert = true

    this.addEventListeners()
  }

  addEventListeners () {
    this.dialogButton.addEventListener('click', this._show)
    this.dialogHideElements.forEach(element => {
      element.addEventListener('click', this._hide)
    })
    this.dialogElement.addEventListener('keydown', this._bindKeyPress)
  }

  /**
   * Show the dialog window.
   *
   * @param {Object}
   * @return {null}
   */
  show (e) {
    e.preventDefault()
    // Capture the previous active element
    this.previousActiveElement = document.activeElement
    this.dialogIsVisible = true
    document.body.classList.add(this.config.bodyActiveClass)
    this.dialogElement.inert = false
    this.dialogElement.setAttribute('aria-hidden', false)
    this.dialogElement.classList.add(this.config.dialogActiveClass)
    this.contentContainer.inert = true

    if (this.focusableElements.length > 0) {
      this.focusableElements[0].focus()
    }
  }

  /**
   * Hide the dialog window.
   *
   * @param {Object}
   * @return {null}
   */
  hide (e) {
    e.preventDefault()
    this.dialogIsVisible = false
    document.body.classList.remove(this.config.bodyActiveClass)
    this.dialogElement.inert = true
    this.dialogElement.setAttribute('aria-hidden', true)
    this.dialogElement.classList.remove(this.config.dialogActiveClass)
    this.contentContainer.inert = false

    // Focus previous active element when hiding the dialog
    this.previousActiveElement.focus()
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
        this._hide(e)
      }
    }
  }
}

const init = (options = {}) => {
  const butaneDialogs = document.querySelectorAll('[data-butane-dialog-controls]')

  Array.from(butaneDialogs).forEach(dialog => {
    new ButaneDialog(dialog, options)
  })
}

export default { init }
