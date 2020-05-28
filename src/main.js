import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App.vue'
import router from './router'
import store from './store'
import Echarts from 'echarts'
// import axios from 'axios'
import Http from '@/plugins/http.js'
import IconSvg from './components/SvgIcon/index.vue' //引入svg组件

Vue.prototype.$echarts = Echarts
Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(Http)
Vue.component('icon-svg', IconSvg)
// Vue.use(ElementUI, {
//   size: 'small',
//   zIndex: 3000
// })

new Vue({
  router,
  store,
  Http,
  render: h => h(App)
}).$mount('#app')