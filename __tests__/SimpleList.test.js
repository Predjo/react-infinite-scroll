'use strict';

import React      from 'react';
import ReactDOM   from 'react-dom';

jest.unmock('../lib/react-infinite-scroll-list.js');
jest.unmock('../examples/SimpleList');

import TestUtils  from 'react-addons-test-utils';
import SimpleList from '../examples/SimpleList';

describe('Test Simple List', function() {

  beforeEach(function() {

    this.renderedComponent = TestUtils.renderIntoDocument(
      <SimpleList />
    );

    this.renderedDOM = ReactDOM.findDOMNode(this.renderedComponent);

    this.listElement = TestUtils.findRenderedDOMComponentWithTag(
      this.renderedComponent,
      'ul'
    );

    this.listComponent = ReactDOM.findDOMNode(this.listElement)
  });

  it('<ul> should have class "infinite-scroll-container"', function() {
    expect(this.listComponent.className).toEqual('infinite-scroll-container');
  });

  it('<ul> should have 20 children <li>', function() {
    const listElements = TestUtils.scryRenderedDOMComponentsWithTag(
      this.renderedComponent,
      'li'
    );

    expect(listElements.length).toEqual(20);
  });

  //Cant test because jsdom doesnt actually render the component
  /*it('<ul> should have 40 children after scrolling to bottom', function() {

    this.renderedDOM.scrollTop = 800;
    console.log(document.getBoundingClientRect(), this.renderedDOM.className)
    
    TestUtils.Simulate.scroll(this.renderedDOM, { target: this.renderedDOM });

    const listElements = TestUtils.scryRenderedDOMComponentsWithTag(
      this.renderedComponent,
      'li'
    );

    expect(listElements.length).toEqual(40);
  });*/
});
