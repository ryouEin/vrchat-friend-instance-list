import Vue from 'vue'
import App from './App/index.vue'
import router from './router'
import store from './store'
import AlertPlugin from './plugins/Alert'
import FullLoaderPlugin from './plugins/FullLoader'
import ScrollPlugin from './plugins/Scroll'
import Button from '@/components/Button/index.vue'
import Dialog from '@/components/Dialog/index.vue'
import FAB from '@/components/FAB/index.vue'
import FavoriteMark from '@/components/FavoriteMark/index.vue'
import Icon from '@/components/Icon/index.vue'
import MarkdownText from '@/components/MarkdownText/index.vue'
import Select from '@/components/Select/index.vue'
import Spinner from '@/components/Spinner/index.vue'
import Toggle from '@/components/Toggle/index.vue'

Vue.config.productionTip = false

// プラグイン登録
Vue.use(AlertPlugin)
Vue.use(FullLoaderPlugin)
Vue.use(ScrollPlugin)

// グローバルコンポーネント登録
Vue.component('g-Button', Button)
Vue.component('g-Dialog', Dialog)
Vue.component('g-FAB', FAB)
Vue.component('g-FavoriteMark', FavoriteMark)
Vue.component('g-Icon', Icon)
Vue.component('g-MarkdownText', MarkdownText)
Vue.component('g-Select', Select)
Vue.component('g-Spinner', Spinner)
Vue.component('g-Toggle', Toggle)

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
