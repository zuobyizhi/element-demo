// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// import store from './store/'
import Layer from 'vue-layer'
import VueLazyload from 'vue-lazyload'
import VueResource from 'vue-resource'
import Element from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import * as Utils from './utils/utils.js'

Vue.use(Element)

Vue.use(VueResource)

Vue.config.productionTip = false

Vue.prototype.$layer = Layer(Vue)

Vue.prototype.HOST = '/api'

// 注册v-focus
Vue.directive('focus', {
  // 当绑定元素插入到 DOM 中。
  inserted: function (el) {
    // 聚焦元素
    console.log(el.nodeName)
    if (el.nodeName.toUpperCase() === 'DIV') {
      (el.getElementsByTagName('input')[0] || el.getElementsByTagName('select')[0]).focus()
    } else {
      el.focus()
    }
  }
})

// 注册v-drag,可拖动
Vue.directive('drag', function (el) {
  const oDiv = el
  oDiv.onmousedown = function (ev) {
    const disX = ev.clientX - oDiv.offsetLeft
    const disY = ev.clientY - oDiv.offsetTop
    document.onmousemove = function (ev) {
      const l = ev.clientX - disX
      const t = ev.clientY - disY
      oDiv.style.left = Utils.midNum(l, document.body.clientWidth, 0) + 'px'
      oDiv.style.top = Utils.midNum(t, document.body.clientHeight, 0) + 'px'
    }
    document.onmouseup = function () {
      document.onmousemove = null
      document.onmouseup = null
    }
  }
})

Vue.use(VueLazyload, {
  // error: 'static/error.png',//这个是请求失败后显示的图片
  // loading: '../static/img/loading.pdf', // 这个是加载的loading过渡效果
  loading: '../static/img/loading.jpg', // 这个是加载的loading过渡效果
  preLoad: 1.3,
  attempt: 1,
  try: 2 // 这个是加载图片数量
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  // store,
  template: '<App/>',
  components: { App }
})
