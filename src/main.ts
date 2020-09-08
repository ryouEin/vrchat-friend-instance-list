import Vue from 'vue'
import App from './presentations/App/index.vue'
import router from './router'
import AlertPlugin from './presentations/plugins/Alert'
import FullLoaderPlugin from './presentations/plugins/FullLoader'
import Button from '@/presentations/components/Button/index.vue'
import Dialog from '@/presentations/components/Dialog/index.vue'
import FAB from '@/presentations/components/FAB/index.vue'
import FavoriteMark from '@/presentations/components/FavoriteMark/index.vue'
import Icon from '@/presentations/components/Icon/index.vue'
import MarkdownText from '@/presentations/components/MarkdownText/index.vue'
import Select from '@/presentations/components/Select/index.vue'
import Spinner from '@/presentations/components/Spinner/index.vue'
import Toggle from '@/presentations/components/Toggle/index.vue'
import VueVirtualScroller from 'vue-virtual-scroller'
import 'vue-virtual-scroller/dist/vue-virtual-scroller.css'
import { VueHammer } from 'vue2-hammer'

Vue.config.productionTip = false

// プラグイン登録
Vue.use(AlertPlugin)
Vue.use(FullLoaderPlugin)
Vue.use(VueVirtualScroller)
Vue.use(VueHammer)

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

export const vm = new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
