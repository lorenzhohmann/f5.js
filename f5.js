/**
 * F5.JS
 * ---------
 * This JS library is simliar to some jQuery functions.
 * My intension was to create a small and lightweight alternative without all the unused methods.
 *
 * @author Lorenz Hohmann
 * @version 1.1
 */

/**
 * This method returns a F5 object for the passed selector.
 *
 * @param {string} selector
 */
let f5 = (selector) => {
  if (typeof selector == "function") {
    document.addEventListener("DOMContentLoaded", selector);
    return false;
  }
  return new F5(selector);
};

class F5 {
  /**
   * Builds a F5 object and set default values.
   *
   * @param {string} selector
   */
  constructor(selector) {
    this.selector = selector;
    this.elements = document.querySelectorAll(selector);
  }

  /**
   * This function returns the html of the element. If a parameter is specified, the parameter is set as html of the current element.
   *
   * @param {string} html
   */
  html(html) {
    if (html) {
      this.elements.forEach((e) => (e.innerHTML = html));
    }
    return this.elements[0].innerHTML;
  }

  /**
   * This function returns the attribute of the element. If the second parameter is specified, the value is set as the attribute.
   *
   * @param {string} key
   * @param {string} value
   */
  attr(key, value) {
    if (!value) {
      return this.elements[0].getAttribute(key);
    }
    this.elements.forEach((e) => e.setAttribute(key, value));
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
      return this.elements[0].dataset[key];
    }
    for (let i = 0; i < this.elements.length; i++) {
      this.elements[i].dataset[key] = value;
    }

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
      return getComputedStyle(this.elements[0])[key];
    }
    for (let i = 0; i < this.elements.length; i++) {
      this.elements[i].style[key] = value;
    }
    return this;
  }

  /**
   * Registers the passed event as an event listener to the element.
   *
   * @param {string} event
   * @param {function} callback
   */
  when(event, callback) {
    for (let i = 0; i < this.elements.length; i++) {
      this.elements[i].addEventListener(event, callback);
    }
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
    let hasClass = false;
    for (let i = 0; i < this.elements.length; i++) {
      if (this.elements[i].classList.contains(className)) hasClass = true;
    }
    return hasClass;
  }

  /**
   * Adds a className to the element.
   *
   * @param {string} className
   */
  addClass(className) {
    for (let i = 0; i < this.elements.length; i++) {
      this.elements[i].classList.add(className);
    }
    return this;
  }

  /**
   * Removes a className from the element.
   *
   * @param {string} className
   */
  removeClass(className) {
    for (let i = 0; i < this.elements.length; i++) {
      this.elements[i].classList.remove(className);
    }
    return this;
  }

  /**
   * Toggles a className.
   * Means that if the element has the className it will be removed and if the element does not have the className it will be added.
   *
   * @param {string} className
   */
  toggleClass(className) {
    for (let i = 0; i < this.elements.length; i++) {
      if (this.hasClass(className)) {
        this.elements[i].classList.remove(className);
      } else {
        this.elements[i].classList.add(className);
      }
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
   * This functions return a boolean if an element exists in the DOM.
   */
  exists() {
    return this.element ? true : false;
  }

  /**
   * This functions return the first element of the current selector.
   */
  first() {
    return new F5(getUniqueSelector(this.elements[0]));
  }

  /**
   * This functions return the last element of the current selector.
   */
  last() {
    return new F5(getUniqueSelector(this.elements[this.elements.length - 1]));
  }

  /**
   * This function returns the parent node with the passed selector (optional).
   * It also checks if the parent, parent, parent, etc. node exists and returns this node when possible.
   *
   * @param {*} selector
   */
  parent(selector) {
    let parents = [];
    for (let i = 0; i < this.elements.length; i++) {
      if (!selector) {
        if (this.elements[i].parentElement) {
          parents.push(getUniqueSelector(this.elements[i].parentElement));
          continue;
        }
      }

      let node = this.elements[i];

      while (node.parentElement) {
        if (node.parentElement.matches(selector)) {
          parents.push(getUniqueSelector(node.parentElement));
          break;
        }
        node = node.parentElement;
      }
    }

    return new F5(implode(parents));
  }

  /**
   * This function returns the child node with the passed selector (optional).
   *
   * @param {*} selector
   */
  child(selector) {
    let childs = [];
    for (let i = 0; i < this.elements.length; i++) {
      if (!selector) {
        if (this.elements[i].childNodes) {
          for (let j = 0; j < this.elements[i].childNodes.length; j++) {
            childs.push(getUniqueSelector(this.elements[i].childNodes[j]));
          }
          continue;
        }
      }

      let node = this.elements[i];
      while (node.childNodes) {
        for (let j = 0; j < node.childNodes.length; j++) {
          console.log(node.childNodes[j]);
          if (node.childNodes[j].matches(selector)) {
            // TODO
            childs.push(getUniqueSelector(node.childNodes[j]));
            break;
          }
          node = node.childNodes[j];
        }
      }
    }

    return new F5(implode(childs));
  }
}

function getUniqueSelector(node) {
  let selector = "";
  while (node.parentElement) {
    const siblings = Array.from(node.parentElement.children).filter(
      (e) => e.tagName === node.tagName
    );

    selector =
      `${node.tagName}:nth-of-type(${siblings.indexOf(node) + 1})` +
      `${selector ? " > " : ""}${selector}`;
    node = node.parentElement;
  }
  return `html > ${selector.toLowerCase()}`;
}

function implode(arr, delimiter = ", ") {
  let result = "";
  for (let i = 0; i < arr.length; i++) {
    result += arr[i];
    if (i != arr.length - 1) {
      result += delimiter;
    }
  }
  return result;
}
