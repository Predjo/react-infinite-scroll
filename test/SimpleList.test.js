'use strict';

import React      from 'react';
import ReactDOM   from 'react-dom';
import { describe, it, before } from 'mocha';
import { expect } from 'chai';
import jsdom      from 'jsdom';
import TestUtils  from 'react-addons-test-utils';

import SimpleList from '../examples/SimpleList';

// A super simple DOM ready for React to render into
// Store this DOM and the window in global scope ready for React to access
const doc = jsdom.jsdom('<!doctype html><html><body></body></html>');
const win = doc.defaultView;

global.document = doc;
global.window = win;

describe('Test Simple List', () => {

  let listComponent = null;

  before('render and locate element', () => {
    const renderedComponent = TestUtils.renderIntoDocument(
      <SimpleList />
    );

    // Searching for <ul> tag within rendered React component
    // Throws an exception if not found
    const listElement = TestUtils.findRenderedDOMComponentWithTag(
      renderedComponent,
      'ul'
    );

    listComponent = ReactDOM.findDOMNode(listElement)
  });

  it('<ul> should have class "infinite-scroll-container"', () => {
    expect(listComponent.className).to.equal('infinite-scroll-container');
  });
});
