React DOM Hyperscript
=====================

Why?
----

### Pros
* Consistent javascript syntax
* Mistyped components return errors
* Template strings for `className`, no need to build a class name variable upstream
* No need to litter code with `null` values when a component doesn't have any props
* No need for a JSX syntax highlighter
* No need for a JSX linter
* JSX elements are just functions anyway, why try to hide what it is?
* HTML markup is ugly

### Cons
* Most react documentation is written with JSX so it might be unfamiliar syntax
* Most components use JSX anyway, so a JSX transform will still be necessary

API
---

For elements that have already been compiled by `factory`:

```js
tagName(selector)
tagName(attrs)
tagName(children)
tagName(attrs, children)
tagName(selector, children)
tagName(selector, attrs, children)
```

For custom components or tags not compiled by `factory`:

```js
import { h } from 'react-dom-hyperscript';

h(component, selector)
h(component, attrs)
h(component, children)
h(component, attrs, children)
h(component, selector, children)
h(component, selector, attrs, children)
```

Create your own custom tags:

```js
import { Component } from 'react';
import { factory, div } from 'react-dom-hyperscript';

class CustomComponent extends Component {
    render() {
        return div('hi there');
    }
}

module.exports = factory(CustomComponent);
```

* `component` is an HTML element as a string or a react function/class custom element
* `selector` is string, starting with "." or "#"
* `attrs` is an object of attributes (the props of the component)
* `children` is the innerHTML text (string|boolean|number), or an array of elements

Note: `children` cannot be a single component, it must be an array of components even if there is only one single node.

Example
-------

```js
import { div, span, h } from 'react-dom-hyperscript';
import MenuComponent from './menu';

const Home = ({ items, open }) => (
    div('.classSelector', [
        span('#hi', 'Hi there'),
        span('Whats up bud', { style: { color: tomato } }),
        h(MenuComponent, { open },
            items.map(menuItem => div({ onClick: menuItem.onClick }, menuItem.text))
        )
    ])
);
```

Alternatives
------------

* https://github.com/Jador/react-hyperscript-helpers
* https://github.com/ohanhi/hyperscript-helpers
* https://github.com/mlmorg/react-hyperscript

References
----------

* https://facebook.github.io/react/docs/displaying-data.html#react-without-jsx
* https://github.com/ustun/react-without-jsx
* http://jamesknelson.com/learn-raw-react-no-jsx-flux-es6-webpack/

