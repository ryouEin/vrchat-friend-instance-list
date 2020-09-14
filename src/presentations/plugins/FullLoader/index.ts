import Vue from 'vue'
import FullLoader from './component/index.vue'

export interface FullLoaderController {
  show: () => void
  hide: () => void
}

class FullLoaderManager implements FullLoaderController {
  private vm: Vue | null = null
  private counter = 0

  _createElement() {
    const node = document.createElement('div')
    const app = document.getElementById('app')
    if (app === null) {
      throw new Error('set id "app" to Vue root element.')
    }
    app.appendChild(node)

    this.vm = new Vue({
      el: node,

      render: h =>
        h(FullLoader, {
          ref: 'fullLoader',
        }),
    })
  }

  show() {
    if (this.vm === null) {
      this._createElement()
    }
    // TODO: this.vmが!==nullであることを!以外で示せないか？
    // eslint-disable-next-line
    const vm = this.vm!

    // TODO: ここ本当に型アサーションするしかない？
    const fullLoader = vm.$refs.fullLoader as FullLoader
    fullLoader.show()
    this.counter++
  }

  hide() {
    if (this.vm === null) {
      return
    }
    this.counter--

    if (this.counter <= 0) {
      // TODO: ここ本当に型アサーションするしかない？
      const fullLoader = this.vm.$refs.fullLoader as FullLoader
      fullLoader.hide()
    }
  }
}

export default {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  install(Vue: any) {
    Vue.prototype.$fullLoader = new FullLoaderManager()
  },
}
