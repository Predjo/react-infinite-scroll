'use strict';

import React, { PropTypes } from 'react';
import ReactDOM             from 'react-dom';
import cx                   from 'classnames';
import RCG                  from 'react-addons-css-transition-group';

class InfiniteList extends React.Component {

  static propTypes = {
    pageStart    : PropTypes.number,
    threshold    : PropTypes.number,
    hasMore      : PropTypes.bool,
    targetSelf   : PropTypes.bool,
    targetParent : PropTypes.bool,
    targetById   : PropTypes.string,
    loadMore     : PropTypes.func,
    transition   : PropTypes.object
  };

  static defaultProps = {
    pageStart    : 0,
    hasMore      : false,
    loadMore     : () => {},
    threshold    : 250,
    targetSelf   : false,
    targetParent : false,
    targetById   : '',
    element      : 'div',
    transition   : null
  };

  static pageLoaded = 0;
  static listener   = null;
  static itemNum    = 0;

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.reset();
    this.listener   = null;
    this.attachScrollListener();
  }

  componentDidUpdate() {
    if (Array.isArray(this.props.children)) {
      const itemNum  = this.props.children.length;
      if (itemNum > 0 && itemNum !== this.itemNum && this.props.hasMore) {
        this.itemNum = itemNum;
        this.attachScrollListener();
      }
    }
  }

  componentWillUnmount() {
    this.detachScrollListener();
  }

  updatePage() {
    this.setState({
      pageLoaded: this.state.pageLoaded + 1
    });
  }

  reset() {
    this.pageLoaded = this.props.pageStart;
    this.itemNum    = 0;
  }

  scrollListener() {
    if (this.scrollPosition() < Number(this.props.threshold)) {
      this.detachScrollListener();
      this.props.loadMore(this.pageLoaded += 1);
    }
  }

  attachScrollListener() {
    if (this.props.hasMore && !this.listener) {
      const target  = this._getTarget();
      this.listener = this.scrollListener.bind(this);
      target.addEventListener('scroll', this.listener);
      target.addEventListener('resize', this.listener);
    }
  }

  detachScrollListener() {
    const target = this._getTarget();
    target.removeEventListener('scroll', this.listener);
    target.removeEventListener('resize', this.listener);
    this.listener = null;
  }

  scrollPosition() {
    
    if (this.props.targetSelf || this.props.targetParent || this.props.targetById) {
      const el =  this._getTarget();
      return el.scrollHeight - el.scrollTop - el.offsetHeight;
    } else {
      const el =  ReactDOM.findDOMNode(this);
      const scrollTop = (window.pageYOffset !== undefined) ? window.pageYOffset :
        (document.documentElement || document.body.parentNode || document.body).scrollTop;
      return this.topPosition(el) + el.offsetHeight - scrollTop - window.innerHeight;
    }
  }

  _getTarget() {
    if (this.props.targetSelf) {
      return ReactDOM.findDOMNode(this);
    } else if (this.props.targetParent) {
      return ReactDOM.findDOMNode(this).parentNode
    } else if (this.props.targetById) {
      return document.getElementById(this.props.targetById);
    } else {
      return window;
    }
  }

  topPosition(domEl) {
    if (!domEl) {
      return 0;
    }
    return domEl.offsetTop + this.topPosition(domEl.offsetParent);
  }

  render() {
    const { children, element, transition, hasMore, loader } = this.props;
    const props     = {};
    props.className = cx('infinite-scroll-container', this.props.className);

    if (transition) {
      const transitionProps = { ...props, component : element, ...transition };
      return React.createElement(RCG, transitionProps, children, hasMore && loader);
    } else {
      return React.createElement(element, props, children, hasMore && loader);
    }
  }
}

export default InfiniteList;
