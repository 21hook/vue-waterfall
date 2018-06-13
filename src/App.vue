<template>
  <div id="app">
    <img src="./assets/logo.png">
    <h1>{{ msg }}</h1>

    <waterfall :align="row" :line-num="6"></waterfall>
  </div>
</template>

<script>
import { Waterfall } from 'Waterfall'; // export the module for importing; source files
import axios from 'axios'; // import(encapsulate & expose) axios; source files

export default {
  name: 'app',
  comments: {Waterfall},
  created() {
    this.getDetails();
  },
  getDetails (pageNo) {
    const self = this;
    const handleSuccess = resBody => {
      if (resBody.length !== 0) {
        resBody.forEach(row => {
          row.itemList.forEach(item => {
            this.swapAttr(item)
          })
        });

        self.imgs = self.imgs.concat(resBody.entry)
      } else {
        self.loading = false
      }
    };

    // APIs/network interfaces
    // get a list of photos
    axios.get(`https://jsonplaceholder.typicode.com/photos`)
      .then(res => {
        if (res.data.status) { // res.data -> res body
          handleSuccess(res.data) // async request process
        } else {
          this.$message({
            message: `${res.data.message}`,
            type: 'warning',
            duration: 1500
          });
        }
      })
      .catch((err) => {
        this.$message({
          message: `${err}`,
          type: 'warning',
          duration: 1500
        });
      })


  },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
