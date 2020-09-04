/**
 * F5.JS
 * ---------
 * This JS library is simliar to some jQuery functions.
 * My intension was to create a small and lightweight alternative without all the unused methods.
 * There are also some features that save you work on repetitive tasks, such as accordions (toggler).
 *
 * @author Lorenz Hohmann
 */

/**
 * This method returns a F5 object for the passed selector
 *
 * @param {string} selector
 */
let f5 = (selector) => {
  if (typeof selector == "function") {
    console.log("Not implemented yet");
    return false;
  }
  return new F5(selector);
};

class F5 {
  /**
   * Builds a F5 object and set default values
   *
   * @param {string} selector
   */
  constructor(selector) {
    this.selector = selector;
    this.element = document.querySelector(selector);
  }

  /**
   * This function returns the html of the element. If a parameter is specified, the parameter is set as html of the current element.
   *
   * @param {string} html
   */
  html(html) {
    if (html) {
      this.element.innerHTML = html;
    }
    return this.element.innerHTML;
  }

  /**
   * This function returns the attribute of the element. If the second parameter is specified, the value is set as the attribute.
   *
   * @param {string} key
   * @param {string} value
   */
  attr(key, value) {
    if (!value) {
      return this.element.getAttribute(key);
    }
    this.element.setAttribute(key, value);
    return this;
  }

  /**
   * This function returns the data value of the element. If the second parameter is specified, the value is set as the data value.
   *
   * @param {string} key
   * @param {string} value
   */
  data(key, value) {
    if (!value) {
      return this.element.dataset[key];
    }
    this.element.dataset[key] = value;
    return this;
  }

  /**
   * This function returns the css property of the element. If the second parameter is specified, the value is set as the css property.
   *
   * @param {string} key
   * @param {string} value
   */
  css(key, value) {
    if (!value) {
      return this.element.style[key];
    }
    this.element.style[key] = value;
    return this;
  }

  /**
   * Registers the passed event as an event listener to the element.
   *
   * @param {string} event
   * @param {function} callback
   */
  when(event, callback) {
    this.element.addEventListener(event, callback);
  }

  /**
   * Sets the css property 'display' to 'none' that the element is not visible in the DOM.
   */
  hide() {
    return this.css("display", "none");
  }

  /**
   * Sets the css property 'display' to 'block' that the element is visible in the DOM.
   */
  show() {
    return this.css("display", "block");
  }

  /**
   * Returns if the element is visible in the DOM.
   */
  isVisible() {
    return this.css("display") == "none" ? false : true;
  }

  /**
   * Shows the element if it is hidden and hides the element if it is shown.
   */
  toggle() {
    if (this.isVisible()) {
      this.hide();
    } else {
      this.show();
    }
    return this;
  }

  /**
   * Checks if the element has a className.
   *
   * @param {string} className
   */
  hasClass(className) {
    return this.element.classList.contains(className);
  }

  /**
   * Adds a className to the element.
   *
   * @param {string} className
   */
  addClass(className) {
    this.element.classList.add(className);
    return this;
  }

  /**
   * Removes a className from the element.
   *
   * @param {string} className
   */
  removeClass(className) {
    this.element.classList.remove(className);
    return this;
  }

  /**
   * Toggles a className. Means that if the element has the className it will be removed and if the element does not have the className it will be added.
   * @param {string} className
   */
  toggleClass(className) {
    if (this.hasClass(className)) {
      this.element.classList.remove(className);
    } else {
      this.element.classList.add(className);
    }
    return this;
  }

  /**
   * This function loops about all elements with the current selector and passes all elements in a callback.
   *
   * @param {function} callback
   */
  each(callback) {
    let elements = document.querySelectorAll(this.selector);
    for (let i = 0; i < elements.length; i++) {
      callback(new F5(getUniqueSelector(elements[i])));
    }
    return this;
  }

  /**
   * This functions does an ajax request to the passed url with the passed data object. The response is converted to json text.
   * The return value is a promise object.
   *
   * @param {string} url
   * @param {object} data
   */
  getJSON(url, data) {
    return new Promise((resolve, reject) => {
      resolve(
        fetch(url, data).then((response) => response.json())
      ).catch((err) => reject(err));
    });
  }

  /**
   * This functions does an ajax request to the passed url with the passed data object. The response is converted to plain text.
   * The return value is a promise object.
   *
   * @param {string} url
   * @param {object} data
   */
  getText(url, data) {
    return new Promise((resolve, reject) => {
      resolve(
        fetch(url, data).then((response) => response.text())
      ).catch((err) => reject(err));
    });
  }

  /**
   * This functions return a boolean if an element exists in the DOM
   */
  exists() {
    return this.element ? true : false;
  }

  /**
   * This functions allows you to add an toggler element to an element. The data identifier of the elements has to be the same.
   * Usage example: accordion
   *
   * @param {f5element} togglerElements
   * @param {function} callback
   * @param {object} options
   * @param {string} identifier
   */
  addToggler(togglerElements, callback, options, identifier = "id") {
    // close content on load
    if (options.closeOnLoad) {
      this.each((element) => element.hide());
    }
    // loop over all
    togglerElements.each((togglerElement) => {
      // register click on toggler
      togglerElement.when("click", (event) => {
        // loop over content elements
        this.each((content) => {
          // if content element has same data identifier like toggler
          if (
            content.data(identifier) &&
            togglerElement.data(identifier) &&
            content.data(identifier) == togglerElement.data(identifier)
          ) {
            // toggle visibility of content
            content.toggle();
            // trigger callback for further custom user actions
            callback();
          } else {
            // hide content if element and toggler has another data identifier and 'closeOthers' option is set
            if (options.closeOthers) content.hide();
          }
        });
      });
    });
  }
}

function getUniqueSelector(node) {
  let selector = "";
  while (node.parentElement) {
    const siblings = Array.from(node.parentElement.children).filter(
      (e) => e.tagName === node.tagName
    );
    selector =
      (siblings.indexOf(node)
        ? `${node.tagName}:nth-of-type(${siblings.indexOf(node) + 1})`
        : `${node.tagName}`) + `${selector ? " > " : ""}${selector}`;
    node = node.parentElement;
  }
  return `html > ${selector.toLowerCase()}`;
}
