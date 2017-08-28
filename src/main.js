'use strict'

import { focusableElements, keyCodes } from './utils'

class ButaneDialog {
  constructor (element, options = {}) {
    if (!element) {
      throw new Error('Dialog requires an element reference')
    }

    // Setup our default dialog options
    this.options = {
      bodyActiveClass: options.bodyActiveClass ? options.bodyActiveClass : 'dialog-isOpen',
      dialogActiveClass: options.dialogActiveClass ? options.dialogActiveClass : 'is-active'
    }

    this.dialogButton = document.querySelector(element)
    this.dialogId = this.dialogButton.getAttribute('aria-controls')

    if (!this.dialogId) {
      throw new Error('Dialog button requires an aria controls attribute')
    }

    this.dialogElement = document.getElementById(this.dialogId)
    this._focusableElements = Array.from(
      this.dialogElement.querySelectorAll(focusableElements)
    )
    this.dialogHideElements = this.dialogElement.querySelectorAll('[data-hide-dialog]')

    // Prebind the functions that will be bound in
    // addEventListener and removeEventListener to
    // avoid losing references
    this._toggleDialog = this.toggleDialog.bind(this)
    this._showDialog = this.showDialog.bind(this)
    this._hideDialog = this.hideDialog.bind(this)
    this._checkEsc = this.checkEsc.bind(this)

    this.initDialog()
  }

  initDialog () {
    this.previousActiveElement = null
    this.dialogIsVisible = false
    this.dialogElement.setAttribute('aria-hidden', true)
    this.dialogElement.inert = true
    this._focusableElements.forEach(element => {
      element.setAttribute('tabindex', -1)
    })
    // Start watching for button clicks to show dialog
    this.dialogButton.addEventListener('click', this._toggleDialog)
  }

  toggleDialog () {
    const dialogShow = this.dialogElement.getAttribute('aria-hidden') === 'false'
    return dialogShow ? this._showDialog() : this._hideDialog()
  }

  /**
   * Show the dialog window.
   *
   * @param {Object}
   * @return {null}
   */
  showDialog (e) {
    e.preventDefault()
    // Capture the previous active element
    this.previousActiveElement = document.activeElement
    this.dialogIsVisible = true
    document.body.classList.add(this.options.bodyActiveClass)
    this.dialogElement.removeAttribute('inert')
    this.dialogElement.setAttribute('aria-hidden', false)
    this.dialogElement.classList.add(this.options.dialogActiveClass)

    if (this._focusableElements.length > 0) {
      this._focusableElements.forEach(element => {
        element.setAttribute('tabindex', 0)
      })
      this._focusableElements[0].focus()
    }

    // Add/remove event listeners
    this.dialogHideElements.forEach(element => {
      element.addEventListener('click', this._hideDialog)
    })
    this.dialogButton.removeEventListener('click', this._showDialog)
    document.addEventListener('keydown', this._checkEsc)
  }

  /**
   * Hide the dialog window.
   *
   * @param {Object}
   * @return {null}
   */
  hideDialog (e) {
    e.preventDefault()
    this.dialogIsVisible = false
    document.body.classList.remove(this.options.bodyActiveClass)
    this.dialogElement.inert = true
    this.dialogElement.setAttribute('aria-hidden', true)
    this.dialogElement.classList.remove(this.options.dialogActiveClass)

    if (this._focusableElements.length > 0) {
      this._focusableElements.forEach(element => {
        element.setAttribute('tabindex', -1)
      })
    }

    // Focus previous active element when hiding the dialog
    this.previousActiveElement.focus()

    // Add/remove event listeners
    this.dialogHideElements.forEach(element => {
      element.removeEventListener('click', this._hideDialog)
    })
    this.dialogButton.addEventListener('click', this._showDialog)
    document.removeEventListener('keydown', this._checkEsc)
  }

  /**
   * Check if the `esc` key has been pressed.
   *
   * @param {Object} e The event object
   * @return {null}
   */
  checkEsc (e) {
    // Ensure dialog is visible before hiding
    if (this.dialogIsVisible) {
      // Hide the modal window on `esc` key press
      if (e.keyCode === keyCodes.esc) {
        this._hideDialog(e)
      }
    }
  }
}

export default ButaneDialog
