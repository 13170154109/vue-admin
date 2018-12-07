import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/store'
import './plugins/element.js'
// import echarts from 'echarts'
// import ApiService from './utils/http'
import Tool from './utils/tool'

Vue.config.productionTip = false
Vue.prototype.$Tool = Tool
// Vue.prototype.$echarts = echarts 
// Vue.prototype.$http = ApiService
new Vue({
  router,
  store,
  // echarts,
  render: h => h(App)
}).$mount('#app')
