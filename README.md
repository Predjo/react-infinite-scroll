React Infinite Scroll List
=====================

React infinite scroll component based on React Infinite Scroll by [guillaumervls](https://github.com/guillaumervls).
Added more options including transitions and support for React 0.14 and up.

# Getting started

Install : `npm install react-infinite-scroll-list` (soon)

ES5 :
```javascript
var InfiniteScrollList = require('react-infinite-scroll-list');
```

ES6 :
```javascript
import InfiniteScrollList from 'react-infinite-scroll-list';
```

# Use in JSX

```html
<InfiniteScrollList
  element="ul"
  targetSelf={true}
  pageStart=0
  loadMore={loadFunc}
  hasMore={true || false}
  transition={{
    transitionName         : 'list-tranistion',
    transitionEnterTimeout : 250,
    transitionLeaveTimeout : 250,
  }}
  loader={<div className="loader">Loading ...</div>}>
  {items} // <-- This is the "stuff" you want to load
</InfiniteScrollList>
```

- `element` : Wrapping element for the component

- `targetSelf(bool)` : Listents for the scroll event on the wrapping element instead of the window

- `targetParent(bool)` : Listents for the scroll event on immediate parent of the wrapping element instead of the window

- `targetById(string)` : Listents for the scroll event on the element specified by ID instead of the window

- `pageStart` : The page number corresponding to the initial `items`, defaults to `0`
                which means that for the first loading, `loadMore` will be called with `1`

- `loadMore(pageToLoad)` : This function is called when the user scrolls down
                           and we need to load stuff

- `hasMore` : Boolean stating if we should keep listening to scroll event and
              trying to load more stuff

- `loader` : Loader element to be displayed while loading stuff - You can use
             `InfiniteScroll.setDefaultLoader(loader);` to set a defaut loader
             for all your `InfiniteScroll` components

- `threshold` : The distance between the bottom of the page and the bottom of the
                window's viewport that triggers the loading of new stuff -
                *Defaults to `250`*

- `transition(object)` : Object including props for the ReactCSSTransitionGroup. If set it enables transitions.


## (Re)build

```
npm install
gulp build
```

### Licence

**The MIT License (MIT)**

*Copyright (c) 2016 Predjo*

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
the Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
