declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    storeState: any
  }
}

export function LogBeforeAfter(outputPropertyName?: string) {
  return function(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    if (process.env.NODE_ENV !== 'development') return

    const originalFunction = descriptor.value
    const originalFunctionName = propertyKey

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const outputProperty = (context: any) => {
      if (outputPropertyName !== undefined) {
        console.log(JSON.parse(JSON.stringify(context[outputPropertyName])))
      }
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    descriptor.value = function(...args: any) {
      console.log(`/* ${originalFunctionName} start */`)
      outputProperty(this)
      console.log(`/*********************************/`)

      originalFunction.apply(this, args)

      console.log(`/* ${originalFunctionName} end */`)
      outputProperty(this)
      console.log(`/*********************************/`)
    }
  }
}

/**
 * クラスデコレータ
 * 付与するとdevelopmentモードにて、windowオブジェクトにインスタンスの参照を通す
 * 例えば、referenceNameにsampleStoreと指定してデコレータをつけると、開発者ツールのconsoleに
 * window.storeState.sampleStore
 * と入力するとインスタンスにアクセスすることが出来る
 *
 * 主に、Vue.observableで作成したストアの状態を確認するのに使用する
 * （Vue.observableで作成したストアはVue.js devtoolsで状態を確認できないため）
 *
 * @param referenceName
 * @constructor
 */
export function MakeReferenceToWindowObjectInDevelopment(
  referenceName: string
) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return function<T extends { new (...args: any[]): {} }>(constructor: T) {
    return class extends constructor {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      constructor(...args: any[]) {
        super(...args)

        if (window.storeState === undefined) {
          window.storeState = {}
        }
        window.storeState[referenceName] = this
      }
    }
  }
}
