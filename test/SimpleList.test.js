'use strict';

import React      from 'react';
import ReactDOM   from 'react-dom';
import { describe, it, before, after } from 'mocha';
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

describe('Test Simple List', function() {

  before('render and locate element', function() {
    this.container = document.createElement('div');
    this.container.style.height = '100%';
    document.body.appendChild(this.container);

    this.renderedComponent = ReactDOM.render(
      <SimpleList />, this.container
    );

    this.renderedDOM = ReactDOM.findDOMNode(this.renderedComponent);

    // Searching for <ul> tag within rendered React component
    // Throws an exception if not found
    this.listElement = TestUtils.findRenderedDOMComponentWithTag(
      this.renderedComponent,
      'ul'
    );

    this.listComponent = ReactDOM.findDOMNode(this.listElement)
  });

  it('<ul> should have class "infinite-scroll-container"', function() {
    expect(this.listComponent.className).to.equal('infinite-scroll-container');
  });

  it('<ul> should have 20 children <li>', function() {
    const listElements = TestUtils.scryRenderedDOMComponentsWithTag(
      this.renderedComponent,
      'li'
    );

    expect(listElements.length).to.equal(20);
  });

  it('<ul> should have 40 children after scrolling to bottom', function() {

    console.log(this.renderedDOM.height)
    
    TestUtils.Simulate.scroll(this.renderedDOM, { target: this.renderedDOM, deltaY: 800 });

    const listElements = TestUtils.scryRenderedDOMComponentsWithTag(
      this.renderedComponent,
      'li'
    );

    expect(listElements.length).to.equal(40);
  });
 
  after('cleanup', function(){
    ReactDOM.unmountComponentAtNode(this.container);
  });

});
