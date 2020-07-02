import Vue from 'vue'
import App from './App/index.vue'
import router from './router'
import store from './store'
import AlertPlugin from './plugins/Alert'
import FullLoaderPlugin from './plugins/FullLoader'

Vue.config.productionTip = false

Vue.use(AlertPlugin)
Vue.use(FullLoaderPlugin)

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
