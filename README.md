# vue-waterfallvue

> A Vue waterfall component using lazy loading

[Demo](https://21hook.github.io/vue-waterfall/)

## Install
```
// import as ES6 module
import VueImagePreview from 'vue-image-preview'

// require as Node module
var VueImagePreview = require('vue-image-preview')

// then, install the plugin
Vue.use(VueImagePreview)

// load as JS file
<script src="unpack.js/"></script>
```

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build
```

## Usage
```
<waterfall :line-gap="200" :watch="items">
</waterfall>
```


## Props 
  name | type | default | description
  -----| -----| ------- | -----------
   url |  String | - | required, URL to get the list of the image details, with a url parameter
   https://host/path?:listNo=1  to get the next list
  align | String | 'row' | 'row'' or 'col', grid alignment
  lineNum | Number | 6 | integer from 0 to 24  the number of grids in a row or column                           

## License
MIT
