(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.ButaneDialog = factory());
}(this, (function () { 'use strict';

window.addEventListener("load", function () {
  function e() {
    return null;
  }function n(a, b, c) {
    if (0 > b) {
      if (a.previousElementSibling) {
        for (a = a.previousElementSibling; a.lastElementChild;) {
          a = a.lastElementChild;
        }return a;
      }return a.parentElement;
    }if (a != c && a.firstElementChild) return a.firstElementChild;for (; a;) {
      if (a.nextElementSibling) return a.nextElementSibling;a = a.parentElement;
    }return null;
  }function k(a) {
    for (; a && a !== document.documentElement;) {
      if (a.hasAttribute("inert")) return a;a = a.parentElement;
    }return null;
  }function h(a) {
    var b = a.path;return b && b[0] || a.target;
  }function l(a) {
    a.path[a.path.length - 1] !== window && (m(h(a)), a.preventDefault(), a.stopPropagation());
  }function m(a) {
    var b = k(a);if (b) {
      if (document.hasFocus() && 0 !== g) {
        var e = (c || document).activeElement,
            d = 0 > g ? !0 : !1,
            f = null;try {
          f = new KeyboardEvent("keydown", { keyCode: 9, which: 9, key: "Tab", code: "Tab", keyIdentifier: "U+0009", shiftKey: !!d, bubbles: !0 });
        } catch (p) {
          try {
            f = document.createEvent("KeyboardEvent"), f.initKeyboardEvent("keydown", !0, !0, window, "Tab", 0, d ? "Shift" : "", !1, "en");
          } catch (q) {}
        }if (f) {
          try {
            Object.defineProperty(f, "keyCode", { value: 9 });
          } catch (p) {}document.dispatchEvent(f);
        }if (e != (c || document).activeElement) return;for (d = b;;) {
          d = n(d, g, b);if (!d) break;if (!(0 > d.tabIndex) && (d.focus(), (c || document).activeElement !== e)) return;
        }
      }a.blur();
    }
  }(function (a) {
    var b = document.createElement("style");b.type = "text/css";b.styleSheet ? b.styleSheet.cssText = a : b.appendChild(document.createTextNode(a));document.body.appendChild(b);
  })("/*[inert]*/*[inert]{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;pointer-events:none}");
  window.ShadowRoot && (e = function e(a) {
    for (; a && a !== document.documentElement;) {
      if (a instanceof window.ShadowRoot) return a;a = a.parentNode;
    }return null;
  });var g = 0;document.addEventListener("keydown", function (a) {
    g = 9 === a.keyCode ? a.shiftKey ? -1 : 1 : 0;
  });document.addEventListener("mousedown", function () {
    g = 0;
  });var c = null;document.body.addEventListener("focus", function (a) {
    var b = h(a);a = b == a.target ? null : e(b);if (a != c) {
      if (c) {
        if (!(c instanceof window.ShadowRoot)) throw Error("not shadow root: " + c);c.removeEventListener("focusin", l, !0);
      }a && a.addEventListener("focusin", l, !0);c = a;
    }m(b);
  }, !0);document.addEventListener("click", function (a) {
    k(h(a)) && (a.preventDefault(), a.stopPropagation());
  }, !0);
});Object.defineProperty(Element.prototype, "inert", { enumerable: !0, get: function get() {
    return this.hasAttribute("inert");
  }, set: function set(e) {
    e ? this.setAttribute("inert", "") : this.removeAttribute("inert");
  } });

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
  function ButaneDialog(element, options) {
    var _this = this;

    classCallCheck(this, ButaneDialog);

    if (!element) {
      throw new Error('Dialog requires an element reference');
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
    this._focusableElements = Array.from(this.dialogElement.querySelectorAll(focusableElements));
    this.dialogHideElements = this.dialogElement.querySelectorAll('[data-hide-dialog]');

    this.contentContainer = document.querySelector(this.options.contentContainer);

    if (!this.contentContainer) {
      throw new Error('No content container element was found');
    }

    // Prebind the functions that will be bound in
    // addEventListener and removeEventListener to
    // avoid losing references
    this._showDialog = this.showDialog.bind(this);
    this._hideDialog = this.hideDialog.bind(this);
    this._checkEsc = this.checkEsc.bind(this);

    this.previousActiveElement = null;
    this.dialogIsVisible = false;
    this.dialogElement.setAttribute('aria-hidden', true);
    this.dialogElement.inert = true;
    this._focusableElements.forEach(function (element) {
      element.setAttribute('tabindex', -1);
    });

    // Start watching for button clicks to show dialog
    this.dialogButton.addEventListener('click', this._showDialog);
    this.dialogHideElements.forEach(function (element) {
      element.addEventListener('click', _this._hideDialog);
    });
    this.dialogElement.addEventListener('keydown', this._checkEsc);
  }

  /**
   * Show the dialog window.
   *
   * @param {Object}
   * @return {null}
   */


  createClass(ButaneDialog, [{
    key: 'showDialog',
    value: function showDialog(e) {
      e.preventDefault();
      // Capture the previous active element
      this.previousActiveElement = document.activeElement;
      this.dialogIsVisible = true;
      document.body.classList.add(this.options.bodyActiveClass);
      this.dialogElement.removeAttribute('inert');
      this.dialogElement.setAttribute('aria-hidden', false);
      this.dialogElement.classList.add(this.options.dialogActiveClass);
      this.contentContainer.inert = true;

      if (this._focusableElements.length > 0) {
        this._focusableElements.forEach(function (element) {
          element.setAttribute('tabindex', 0);
        });
        this._focusableElements[0].focus();
      }
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
      e.preventDefault();
      this.dialogIsVisible = false;
      document.body.classList.remove(this.options.bodyActiveClass);
      this.dialogElement.inert = true;
      this.dialogElement.setAttribute('aria-hidden', true);
      this.dialogElement.classList.remove(this.options.dialogActiveClass);
      this.contentContainer.removeAttribute('inert');

      if (this._focusableElements.length > 0) {
        this._focusableElements.forEach(function (element) {
          element.setAttribute('tabindex', -1);
        });
      }

      // Focus previous active element when hiding the dialog
      this.previousActiveElement.focus();
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

var init = function init() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  var butaneDialogs = document.querySelectorAll('[data-butane-dialog-controls]');
  butaneDialogs.forEach(function (dialog) {
    new ButaneDialog(dialog, options);
  });
};

var main = { init: init };

return main;

})));
