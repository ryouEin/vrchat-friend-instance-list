import Vue from 'vue'
import App from './presentations/App/index.vue'
import router from './router'
import Button from '@/presentations/components/Button/index.vue'
import Dialog from '@/presentations/components/Dialog/index.vue'
import FAB from '@/presentations/components/FAB/index.vue'
import FavoriteMark from '@/presentations/components/FavoriteMark/index.vue'
import Icon from '@/presentations/components/Icon/index.vue'
import MarkdownText from '@/presentations/components/MarkdownText/index.vue'
import Select from '@/presentations/components/Select/index.vue'
import Spinner from '@/presentations/components/Spinner/index.vue'
import Toggle from '@/presentations/components/Toggle/index.vue'
import DropdownMenu from '@/presentations/components/DropdownMenu/index.vue'
import ToTopButton from '@/presentations/components/ToTopButton/index.vue'
import VueVirtualScroller from 'vue-virtual-scroller'
import 'vue-virtual-scroller/dist/vue-virtual-scroller.css'
import { VueHammer } from 'vue2-hammer'
import VueCompositionAPI from '@vue/composition-api'
import { createGlobalStore } from '@/GlobalStoreFactory'
import { ColorManager } from '@/presentations/Colors'

Vue.config.productionTip = false

// プラグイン登録
Vue.use(VueVirtualScroller)
Vue.use(VueHammer)
Vue.use(VueCompositionAPI)

// ストア初期化
const store = createGlobalStore()
Vue.prototype.$store = store

// TODO: カラーマネージャまでグローバルに通すのは行儀が悪い気がする
//  他にいい方法が思い浮かばなかったのでこうしてるが、改善方法さがして修正すること
// カラーマネージャ
Vue.prototype.$colorManager = new ColorManager(store.settingStore)

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
Vue.component('g-DropdownMenu', DropdownMenu)
Vue.component('g-ToTopButton', ToTopButton)

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
