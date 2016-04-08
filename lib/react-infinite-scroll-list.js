'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _reactAddonsCssTransitionGroup = require('react-addons-css-transition-group');

var _reactAddonsCssTransitionGroup2 = _interopRequireDefault(_reactAddonsCssTransitionGroup);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var InfiniteList = function (_React$Component) {
  _inherits(InfiniteList, _React$Component);

  function InfiniteList(props) {
    _classCallCheck(this, InfiniteList);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(InfiniteList).call(this, props));
  }

  _createClass(InfiniteList, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.reset();
      this.listener = null;
      this.attachScrollListener();
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      if (Array.isArray(this.props.children)) {
        var itemNum = this.props.children.length;
        if (itemNum > 0 && itemNum !== this.itemNum && this.props.hasMore) {
          this.itemNum = itemNum;
          this.attachScrollListener();
        }
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.detachScrollListener();
    }
  }, {
    key: 'updatePage',
    value: function updatePage() {
      this.setState({
        pageLoaded: this.state.pageLoaded + 1
      });
    }
  }, {
    key: 'reset',
    value: function reset() {
      this.pageLoaded = this.props.pageStart;
      this.itemNum = 0;
    }
  }, {
    key: 'scrollListener',
    value: function scrollListener() {
      if (this.scrollPosition() < Number(this.props.threshold)) {
        this.detachScrollListener();
        this.props.loadMore(this.pageLoaded += 1);
      }
    }
  }, {
    key: 'attachScrollListener',
    value: function attachScrollListener() {
      if (this.props.hasMore && !this.listener) {
        var target = this._getTarget();
        this.listener = this.scrollListener.bind(this);
        target.addEventListener('scroll', this.listener);
        target.addEventListener('resize', this.listener);
      }
    }
  }, {
    key: 'detachScrollListener',
    value: function detachScrollListener() {
      var target = this._getTarget();
      target.removeEventListener('scroll', this.listener);
      target.removeEventListener('resize', this.listener);
      this.listener = null;
    }
  }, {
    key: 'scrollPosition',
    value: function scrollPosition() {

      if (this.props.targetSelf || this.props.targetParent || this.props.targetById) {
        var el = this._getTarget();
        return el.scrollHeight - el.scrollTop - el.offsetHeight;
      } else {
        var _el = _reactDom2.default.findDOMNode(this);
        var scrollTop = window.pageYOffset !== undefined ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;
        return this.topPosition(_el) + _el.offsetHeight - scrollTop - window.innerHeight;
      }
    }
  }, {
    key: '_getTarget',
    value: function _getTarget() {
      if (this.props.targetSelf) {
        return _reactDom2.default.findDOMNode(this);
      } else if (this.props.targetParent) {
        return _reactDom2.default.findDOMNode(this).parentNode;
      } else if (this.props.targetById) {
        return document.getElementById(this.props.targetById);
      } else {
        return window;
      }
    }
  }, {
    key: 'topPosition',
    value: function topPosition(domEl) {
      if (!domEl) {
        return 0;
      }
      return domEl.offsetTop + this.topPosition(domEl.offsetParent);
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props;
      var children = _props.children;
      var element = _props.element;
      var transition = _props.transition;
      var hasMore = _props.hasMore;
      var loader = _props.loader;

      var props = {};
      props.className = (0, _classnames2.default)('infinite-scroll-container', this.props.className);

      if (transition) {
        var transitionProps = _extends({}, props, { component: element }, transition);
        return _react2.default.createElement(_reactAddonsCssTransitionGroup2.default, transitionProps, children, hasMore && loader);
      } else {
        return _react2.default.createElement(element, props, children, hasMore && loader);
      }
    }
  }]);

  return InfiniteList;
}(_react2.default.Component);

InfiniteList.propTypes = {
  pageStart: _react.PropTypes.number,
  threshold: _react.PropTypes.number,
  hasMore: _react.PropTypes.bool,
  targetSelf: _react.PropTypes.bool,
  targetParent: _react.PropTypes.bool,
  targetById: _react.PropTypes.string,
  loadMore: _react.PropTypes.func,
  transition: _react.PropTypes.object
};
InfiniteList.defaultProps = {
  pageStart: 0,
  hasMore: false,
  loadMore: function loadMore() {},
  threshold: 250,
  targetSelf: false,
  targetParent: false,
  targetById: '',
  element: 'div',
  transition: null
};
InfiniteList.pageLoaded = 0;
InfiniteList.listener = null;
InfiniteList.itemNum = 0;
exports.default = InfiniteList;