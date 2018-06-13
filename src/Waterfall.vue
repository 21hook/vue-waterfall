<template>
  <div>
      <!-- [ [{}, {}], [...] ], -->
      <el-row v-for="(row, i) in grid" type="flex" justify="center">
        <!-- [{}], [{}, {}], -->
          <el-col :span="getRowSpan" v-for="(col, j) in row">
            <el-card><!--:data-url="imgCdnPath + col"-->
              <!-- slot(template argument); replace by the slot -->
              <!-- default slot -->
              <img :style="setWaterfallAlign"  :src="col.url" alt="" :data-row="i" :data-col="j">
            </el-card>
          </el-col>
      </el-row>

      <!-- back to top button -->
      <el-button class="btn-back-to-top"
                 v-if="backToTop"
                 @click="scrollToTop"
                 style=""
                 icon="el-icon-caret-top"
                 circle></el-button>

      <!-- loading modal -->
      <div class="modal-loading"
           v-loading="loading"
           element-loading-text="加载中"
           element-loading-spinner="el-icon-loading">
        <span v-if="!loading">没有更多了</span>
      </div>
  </div>
</template>

<script>
Vue.use(ELEMENT.Row); // refer to the global variable: Vue, ELEMENT; object modules
Vue.use(ELEMENT.Col);
Vue.use(ELEMENT.Button);
Vue.use(ELEMENT.Loading.directive);
Vue.prototype.$loading = ELEMENT.Loading.service;
Vue.prototype.$message = ELEMENT.Message;

export default {
    name: "Waterfall",
    props: {
      url: {
        type: String,
        required: true,
        validator(val) {
          return typeof val === 'string';
        }
      },
      align: {
        type: String,
        default: 'row',
        validator(val) {
          return val === 'row' || val === 'col'
        }
      },
      lineNum: {
        type: Number,
        default: 6,
        validator(val) {
          return val > 0 && val <= 24 && Number.isInteger(val)
        }
      },
      verticalHeight: {
        type: Number,
        default: 100,
        validator(val) {
          return val > 0
        }
      }
    },
  created() {
    this.getCardList();
  },
  // mounted on a DOM element
  mounted () {
    this.initScroll();
  },
  methods: {
    // opt/method/operation interfaces
    async getCardList() {
      const self = this;
      const handleSuccess = (list) => {
        if (list.length !== 0) {
          const ROW_ITEMS = this.lineNum;

          // producer; [] x []
          self.list = self.list.concat(list); // keep the list
          self.grid = []; //empty the grid

          // mutator; [[], []] x [[]]
          for (let i = 0; i < self.list.length; i += ROW_ITEMS) {
            // 切片
            self.grid.push(self.list.slice(i, i + ROW_ITEMS))
          }
        } else {
          self.loading = false
        }
      };


      axios.get(this.url)
        .then(res => {
          if (res.status === 200 || res.status === 304) { // res.data -> res body
            handleSuccess(res.data) // async request process
          } else {
            this.$message({
              message: `${res.statusText}`,
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
    setPageNo() {
      // DR => DM
      // ?pageNo=0&pageSize=6
      const s = this.url.indexOf('=');
      let e = this.url.indexOf('&');
      if (e === -1) e = this.url.length;
      const pageNo = Number.parseInt(this.url.substring(s+1, e)) + 1;

      this.$emit('update:url', this.url.substring(0, s+1) + pageNo + this.url.substring(e))

    },

    // opt/method/DOM interfaces
    initScroll () {
      document.addEventListener('scroll', e => {
        /* action code/program */
        /* perceptual situation in env/condition-action rule */
        // get the visual viewport
        // set its src attr if the point is in it
        const images = document.querySelectorAll('img.waterfall-img') // NodeList object
        // const row = document.querySelectorAll('div.el-row')[24]
        const page = document.querySelector('div.page');

        // show the button for backing to top
        this.backToTop = window.scrollY > window.innerHeight

        // request more image URLs to the further rendering
        if (document.body.offsetHeight < window.scrollY + window.innerHeight) {
          // request resources to get the data
          this.setPageNo();
          this.getCardList();
        }
      })
    },

    // opt/method/event(interaction) interfaces
    scrollToTop () {
      // procedural animation
      window.webkitRequestAnimationFrame(this.scrollOnce)
    },

    // opt/method/animation interfaces
    scrollOnce () {
      // y -= 20 per frame
      window.scrollBy(0, -500) // update the properties of the current frame

      if (window.scrollY > 0) { // condition for continue animating
        window.webkitRequestAnimationFrame(this.scrollOnce)
      }
    },
  },
  computed: {
    getRowSpan() {
      return Math.floor(24 / this.lineNum)
    },
    setWaterfallAlign() {
      return {
        width: this.align === 'row' ? '100%' : 'auto',
        height: this.align === 'row' ? 'auto' : this.verticalHeight + 'px',
        display: 'block'
      }
    }
  },
  watch: {

  },
  data() { // must be a function in components
    return {
      grid: [], // 2D array
      list: [],
      loading: true,
      backToTop: false,
    }
  }
}
</script>

<style scoped>
  .waterfall-img {
  }
  .btn-back-to-top {
    position: fixed;
    bottom: 40px;
    right: 40px;
    z-index: 3000
  }
  .modal-loading {
    width: 100%;
    height: 40px;
    border-top: 1px solid #E4E7ED;
    margin-top: 20px;
    text-align: center;
  }
</style>
