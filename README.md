# f5.js - Refresh your workflow! 👌🏻

f5.js should simplify your work. **But how?** f5.js has a lot of great features to relieve you of annoying tasks. Code that you would otherwise write identically or similarly in many projects is processed by f5.js

There are also many features that appear on many websites, such as developing Accordion content. Even such simple functions I have implemented in f5.js.

A couple of simple examples:

```javascript
// click event example (very similiar to jQuery)
f5("#foo").when("click", () => {
  alert("bar");
});
```

My intention is to create a very simple and lightweight library (f5.js is less than 2KB!!) that everyone can understand and use without much understanding.
Meanwhile there are so many libraries which are much too big (e.g. jQuery) and contain too many "unnecessary" functions. The many ingenious frameworks often have a high development and customization effort, but what about the good old small web applications without Node.js Server as backend? Exactly here f5.js should help and similar to jQuery it should support you as a developer and be of great advantage especially for beginners.

# Installation

1. Download `f5.min.js` and copy it into your project.
2. Add `<script src="f5.min.js"></script>` before your closing `</body>` tag.
3. Start coding! 💻

# General Usage

The `f5()` selector is the keyword to use f5.js functions.

```javascript
let f5element = f5("#foobar");
```

f5.js is designed so that you can concatenate function calls, because the f5 element is always returned (with exceptions).

```javascript
f5("#foobar")
  .html("<p>new HTML content</p>")
  .css("margin-top", "10px")
  .data("foo", "bar")
  .show();
```

# Functions

Here's a list of all available functions. The explanation and usage with examples is shown below.
| DOM interaction | CSS | Event Handling | Ajax | Custom
| --------------- | ------------ | -------------- | ---------- | --------|
| .addClass() | .css() | .when() | .getJSON() | Document Ready |
| .attr() | .hide() | | .getText() |
| .data() | .isVisible() |
| .each() | .show() |
| .exists() | .toggle() |
| .first() |
| .hasClass() |
| .html() |
| .last() |
| .parent() |
| .removeClass() |
| .toggleClass() |

## .addClass(className)

Adds a className to the element.

```javascript
// add class
f5(".foo").addClass("bar");
```

## .attr(key, value)

This function returns the attribute of the element. If the second parameter is specified, the value is set as the attribute.

```javascript
// get attribute
let checked = f5(".checkbox-row input").attr("checked");

// set attribute
f5(".form-row-select option.second").attr("selected", true);
```

## .css(key, value)

This function returns the css property of the element. If the second parameter is specified, the value is set as the css property.

```javascript
// get css property
let margin = f5("#foobar").css("margin");

// set css property
f5("#foobar").css("margin", "2.5rem");
```

## .data(key, value)

This function returns the data value of the element. If the second parameter is specified, the value is set as the data value.

```javascript
// get category data
let category = f5(".product-item").data("category");

// set category data
f5(".product-item").attr("category", "frameworks");
```

## .each(callback)

This function loops about all elements with the current selector and passes all elements in a callback.

```javascript
f5("p").each((element) => {
  element.style("paddingBottom", "2rem");
});
```

## .exists()

This functions return a boolean if an element exists in the DOM.

```javascript
let specialItemExists = f5(".product#cat-32").exists();
```

## .first()

This functions return the first element of the current selector.

```javascript
let firstParagraphOnPage = f5("p").first();
```

## .getJSON(url, data)

This functions does an ajax request to the passed url with the passed data object. The response is converted to plain text.
The return value is a promise object. Use an empty `f5()` call here.

```javascript
f5()
  .getText("https://api.countapi.xyz/hit/f5.js")
  .then((data) => console.log(data));
```

## .getText(url, data)

This functions does an ajax request to the passed url with the passed data object. The response is converted to json text.
The return value is a promise object. Use an empty `f5()` call here.

```javascript
f5()
  .getJSON("https://api.countapi.xyz/hit/f5.js")
  .then((data) => console.log(data));
```

## .hasClass(className)

Checks if the element has a className.

```javascript
let hasClassBar = f5("#foo").hasClass("bar");
```

## .hide()

Sets the css property 'display' to 'none' that the element is not visible in the DOM.

```javascript
f5("p").hide();
```

## .html(html)

This function returns the html of the element. If a parameter is specified, the parameter is set as html of the current element.

```javascript
// get html
let html = f5("div.container").html();

// set html
f5("div.container").html("<p>new HTML content</p>");
```

## .isVisible()

Returns if the element is visible in the DOM.

```javascript
let visibility = f5("#foobar").isVisible();
```

## .last()

This functions return the last element of the current selector.

```javascript
let lastParagraphOnPage = f5("p").last();
```

## .parent(selector)

This function returns the parent node with the passed selector.
It also checks if the parent, parent, parent, etc. node exists and returns this node when possible.

```javascript
let parent = f5("p").parent();
let parentDiv = f5("p").parent("div");
let parentActiveClass = f5("p").parent(".active");
```

## .removeClass(className)

Removes a className from the element.

```javascript
f5(".foo").removeClass("bar");
```

## .show()

Sets the css property 'display' to 'block' that the element is visible in the DOM.

```javascript
f5("p").show();
```

## .toggle()

Shows the element if it is hidden and hides the element if it is shown.

```javascript
// now will be hidden
f5("p").toggle();

// now will be shown
f5("p").toggle();
```

## .toggleClass(className)

Toggles a className. Means that if the element has the className it will be removed and if the element does not have the className it will be added.

```javascript
// adds class .bar
f5(".foo").toggleClass("bar");

// removes class .bar
f5(".foo").toggleClass("bar");
```

## .when(event, callback)

Registers the passed event as an event listener to the element.
All typical javascript events are allowed here.

```javascript
f5("#foobar").when("click", (event) => {
  console.log(event);
});
```

# Custom

## Document Ready

This event is fired when the whole page with all its ressources has been loaded.

```javascript
f5(function () {
  console.log("Document loaded");
});
```

# Planned features 🌟

- automatic tests
- fadeIn(): Fades an element in
- fadeOut(): Fades an element out
- inView(): Checks if element is in user's view
- width(): Get element width
- height(): Get element height
- trigger(): Trigger JS events
- much more!

# Changelog

## 1.1

- ADDED call methods once for all elements of a selector, e.g. p
- ADDED first(): Get first element of the current selector
- ADDED last(): Get last element of the current selector
- UPDATED README.md
- REMOVED addToggler() - not fitting to f5.js concept
- ADDED document ready function
- ADDED parent(): Get parent of element
- ADDED child(): Get child of element
- UPDATED Copyright

## 1.0

- Initial functions
