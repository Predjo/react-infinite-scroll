'use strict';

import React from 'react';
import { describe, it, before } from 'mocha';
import { expect } from 'chai';
import jsdom from 'jsdom';
import TestUtils from 'react-addons-test-utils';

import SimpleList from '../examples/SimpleList';

// A super simple DOM ready for React to render into
// Store this DOM and the window in global scope ready for React to access
global.document = jsdom.jsdom('<!doctype html><html><body></body></html>');
global.window   = document.parentWindow;

describe('Test Simple List', () => {

  before('render and locate element', () => {
    const renderedComponent = TestUtils.renderIntoDocument(
      <SimpleList />
    );

    // Searching for <ul> tag within rendered React component
    // Throws an exception if not found
    const listComponent = TestUtils.findRenderedDOMComponentWithTag(
      renderedComponent,
      'ul'
    );

    this.inputElement = listComponent.getDOMNode();
  });

  it('<ul> should have class "infinite-scroll-container"', () => {
    expect(this.inputElement.className).to.be('infinite-scroll-container');
  });
});
