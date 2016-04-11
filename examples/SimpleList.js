'use strict';

import React        from 'react';
import InfiniteList from '../lib/react-infinite-scroll-list.js';

class SimpleList extends React.Component {

  constructor() {
    super();
    this.state = {
      list : this.getNumberList(20)
    }
  }

  loadMore() {
    this.setState({ list : [ ...this.state.list, ...this.getNumberList(20) ] });
  }

  hasMoreToLoad() {
    return this.state.list.length < 100;
  }

  getNumberList(size) { //Just generate a list [0 ... size]
    return Array(size).keys();
  }

  render() {
    const { list } = this.state;

    return (
      <div className="list-wrap" style={{ height : 200, overflow: 'auto' }}>
        <InfiniteList
          loadMore = { this.loadMore }
          hasMore = { this.hasMoreToLoad() }
          element = "ul"
          pageStart = { 0 }>
          {
            list.map((item, index) => (<li key={ index } style={{ height : 40 }} >{item}</li>))
          }
        </InfiniteList>
      </div>
    )
  }
}

export default SimpleList;