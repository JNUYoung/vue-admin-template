import Vue from 'vue'
import App from './App.vue'
import router from '@/router'
import store from './store'
import '@/style/index.scss' // glob style
import './plugins/element.js'  // element-ui按需引入
import animated from 'animate.css'
import '@/assets/iconfont/iconfont.css'

Vue.use(animated)
// import SlideVerify from 'vue-monoplasty-slide-verify'

// Vue.use(SlideVerify)
Vue.config.productionTip = false


const app = new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')