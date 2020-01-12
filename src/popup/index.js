import Vue from 'vue'
import root from './root.vue'
import vantUI from 'vant'
import 'vant/lib/index.css'

Vue.config.productionTip = false
Vue.use(vantUI)
/* eslint-disable no-new */
new Vue({
  el: '#root',
  render: h => h(root)
})
