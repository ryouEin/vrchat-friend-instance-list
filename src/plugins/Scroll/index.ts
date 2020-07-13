const scrollToElement = (element: HTMLElement) => {
  const NAV_HEIGHT = 50
  const clientRect = element.getBoundingClientRect()
  const pageY = window.pageYOffset + clientRect.top - NAV_HEIGHT
  window.scrollTo({
    top: pageY,
  })
}

const scrollToElementById = (id: string) => {
  const element = document.getElementById(id)
  if (element === null) {
    throw new Error('scroll target element is null')
  }

  scrollToElement(element)
}

export type ScrollToInstance = (instanceId: string) => void
const scrollToInstance: ScrollToInstance = instanceId => {
  scrollToElementById(instanceId)
}

export type ScrollToUser = (userId: string) => void
const scrollToUser: ScrollToUser = userId => {
  scrollToElementById(userId)
}

export default {
  install(Vue: any) {
    Vue.prototype.$scrollToInstance = scrollToInstance
    Vue.prototype.$scrollToUser = scrollToUser
  },
}
