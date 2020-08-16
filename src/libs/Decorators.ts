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
        console.log(JSON.stringify(context[outputPropertyName]))
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
