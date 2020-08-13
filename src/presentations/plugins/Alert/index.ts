// TODO: WebStorm上だとAlertPropsがないよって言われるのの解決したい。多分vue-loaderをサポートしきれてないとかそういうやつ
import Vue from 'vue'
import Alert from './component/index.vue'
import { AlertProps } from './component/script'

export type AlertHandler = (props: AlertProps) => Promise<void>

const launchAlert: AlertHandler = props => {
  return new Promise(resolve => {
    const node = document.createElement('div')
    document.body.appendChild(node)

    const vm = new Vue({
      el: node,

      render: h =>
        h(Alert, {
          ref: 'alert',
          props,
          on: {
            // TODO: これが呼ばれない理由を究明し修正
            afterLeave() {
              vm.$destroy()
              vm.$el.remove()

              resolve()
            },
          },
        }),

      mounted() {
        // TODO: ここ本当に型アサーションするしかない？
        const alert = this.$refs.alert as Alert
        alert.show()
      },
    })
  })
}

export default {
  // TODO: ここ本当にanyにするしかない？
  install(Vue: any) {
    Vue.prototype.$alert = launchAlert
  },
}
