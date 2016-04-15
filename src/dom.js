import React from 'react';
const TAG_NAMES = [
  'a', 'abbr', 'address', 'area', 'article', 'aside', 'audio', 'b', 'base',
  'bdi', 'bdo', 'blockquote', 'body', 'br', 'button', 'canvas', 'caption',
  'cite', 'code', 'col', 'colgroup', 'dd', 'del', 'dfn', 'dir', 'div', 'dl',
  'dt', 'em', 'embed', 'fieldset', 'figcaption', 'figure', 'footer', 'form',
  'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'head', 'header', 'hgroup', 'hr', 'html',
  'i', 'iframe', 'img', 'input', 'ins', 'kbd', 'keygen', 'label', 'legend',
  'li', 'link', 'main', 'map', 'mark', 'menu', 'meta', 'nav', 'noscript',
  'object', 'ol', 'optgroup', 'option', 'p', 'param', 'pre', 'q', 'rp', 'rt',
  'ruby', 's', 'samp', 'script', 'section', 'select', 'small', 'source', 'span',
  'strong', 'style', 'sub', 'sup', 'table', 'tbody', 'td', 'textarea', 'tfoot',
  'th', 'thead', 'title', 'tr', 'u', 'ul', 'video', 'progress'
];
const isValidString = param => typeof param === 'string' && param.length > 0;
const isSelector = param => isValidString(param) && (param[0] === '.' || param[0] === '#');
const splitSelector = param => ({
  selectorId: param[0],
  selector: param.slice(1, param.length)
});
const selectorToClassName = param => param.replace(/ \./g, ' ').replace(/\./g, ' ');
const isChildren = x =>
  (isValidString(x) || typeof x === 'boolean' || typeof x === 'number' || Array.isArray(x));
const flatten = arr => {
  let flat = [];
  for (let i = 0; i < arr.length; i++) {
    const el = arr[i];
    if (Array.isArray(el)) {
      flat = [...flat, ...el];
    } else {
      flat.push(el);
    }
  }
  return flat;
};

const selectorProps = (param) => {
  const { selectorId, selector } = splitSelector(param);
  const props = {};

  if (selectorId === '.') {
    props.className = selectorToClassName(selector);
  } else if (selectorId === '#') {
    props.id = selector;
  }

  return props;
};

const createElement = (component, props = null, children) =>
  React.createElement.apply(React, flatten([component, props, children]));

const factory = component => (first, second, third) => {
  if (typeof first === 'undefined') {
    return createElement(component);
  }

  if (isSelector(first)) {
    const props = selectorProps(first);
    if (isChildren(second)) {
      return createElement(component, props, second);
    }

    if (isChildren(third)) {
      return createElement(component, { ...second, ...props }, third);
    }

    return createElement(component, { ...second, ...props });
  }

  if (isChildren(first)) {
    return createElement(component, null, first);
  }

  if (isChildren(second)) {
    return createElement(component, first, second);
  }

  return createElement(component, first);
};

function h(component, ...rest) {
  return factory(component)(...rest);
}

function getExports() {
  const exported = { h, factory };
  TAG_NAMES.forEach(n => {
    exported[n] = factory(n);
  });
  return exported;
}

module.exports = getExports();
