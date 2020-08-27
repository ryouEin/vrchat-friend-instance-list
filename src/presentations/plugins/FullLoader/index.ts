import Vue from 'vue'
import FullLoader from './component/index.vue'

// TODO: Handlerって命名はおかしくないか？
export interface FullLoaderHandler {
  show: () => void
  hide: () => void
}

class FullLoaderManager {
  private vm: Vue | null = null
  private counter = 0

  _createElement() {
    const node = document.createElement('div')
    document.body.appendChild(node)

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

    // TODO: ここのnullチェックは冗長
    if (this.vm === null) {
      throw new Error('FullLoader is null.')
    }

    // TODO: ここ本当に型アサーションするしかない？
    const fullLoader = this.vm.$refs.fullLoader as FullLoader
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
