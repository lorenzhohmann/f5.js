# f5.js - Refresh your workflow! 👌🏻

f5.js should simplify your work. **But how?** f5.js has a lot of great features to relieve you of annoying tasks. Code that you would otherwise write identically or similarly in many projects is processed by f5.js

There are also many features that appear on many websites, such as developing Accordion content. Even such simple functions I have implemented in f5.js.

A couple of simple examples:

```javascript
// click event example (very similiar to jQuery)
f5("#foo").when("click", () => {
  alert("bar");
});

// custom f5.js function to add add toggler element to an element (accordion) with additional parameters
f5(".toggler-content").addToggler(
  f5(".toggler"),
  () => {
    console.log("toggled");
  },
  { closeOnLoad: true, closeOthers: true }
);
```

My intention is to create a very simple and lightweight library that everyone can understand and use without much understanding.
Meanwhile there are so many libraries which are much too big (e.g. jQuery) and contain too many "unnecessary" functions. The many ingenious frameworks often have a high development and customization effort, but what about the good old small web applications without Node.js Server as backend? Exactly here f5.js should help and similar to jQuery it should support you as a developer and be of great advantage especially for beginners.

# Installation

1. Download `f5.min.js` and copy it into your project.
2. Add `<script src="f5.min.js"></script>` before your closing `</body>` tag.
3. Start coding! 💻

# General Usage

The `f5` selector is the keyword to use f5.js functions.

```javascript
let f5element = f5("#foobar");
```

f5.js is designed so that you can concatenate function calls, because the f5 element is always returned (with exceptions).

```javascript
f5('#foobar').html('<p>new HTML content</p>).css('marginTop', '10px').data('foo', 'bar').show();
```

# Functions

| DOM interaction | CSS          | Event Handling | Ajax       | f5.js Special Features |
| --------------- | ------------ | -------------- | ---------- | ---------------------- |
| .addClass()     | .css()       | .when()        | .getJSON() | .addToggler()          |
| .attr()         | .hide()      |                | .getText() |
| .data()         | .isVisible() |
| .each()         | .show()      |
| .exists()       | .toggle()    |
| .hasClass()     |
| .html()         |
| .removeClass()  |
| .toggleClass()  |

## .addClass(className)

Adds a className to the element.

```javascript
// add class
f5(".foo").addClass("bar");
```

## .addToggler(togglerElements, callback, options, identifier = "id")

This functions allows you to add an toggler element to an element. The data identifier of the elements has to be the same.
Usage example: accordion

```html
<h1 class="toggler" data-id="1">Test Toggler 1</h1>
<h1 class="toggler" data-id="2">Test Toggler 2</h1>
<p class="toggler-content" data-id="1">
  1: Lorem ipsum dolor sit amet, consetetur sadipscing elitr
</p>
<p class="toggler-content" data-id="2">
  2: Lorem ipsum dolor sit amet, consetetur
</p>
```

```javascript
f5(".toggler-content").addToggler(
  f5(".toggler"),
  () => {
    console.log("toggled");
  },
  { closeOnLoad: true, closeOthers: true }
);
```

### Options:

- closeOnLoad (bool, default: false): Close all content containers on page load
- closeOthers (bool, default: false): Close other content container when click

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

This functions return a boolean if an element exists in the DOM

```javascript
let specialItemExists = $(".product#cat-32").exists();
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
let visibility = $("#foobar").isVisible();
```

## .removeClass(className)

Removes a className from the element.

```javascript
$(".foo").removeClass("bar");
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
$(".foo").toggleClass("bar");

// removes class .bar
$(".foo").toggleClass("bar");
```

## .when(event, callback)

Registers the passed event as an event listener to the element.
All typical javascript events are allowed here.

```javascript
f5("#foobar").when("click", (event) => {
  console.log(event);
});
```

# Planned features

- call methods once for all elements of a selector, e.g. p
- document ready function
- fadeIn(): Fades an element in
- fadeOut(): Fades an element out
- inView(): Checks if element is in user's view
- parent(): Get parent of element
- child(): Get child of element
- width(): Get element width
- height(): Get element height
- trigger(): Trigger JS events
- much more!
