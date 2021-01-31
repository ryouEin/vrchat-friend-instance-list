class DummyErrorResponseList {
  constructor() {
    this.items = [
      // sample
      // {
      //   controllerName: 'hogehoge',
      //   status: 401
      // }
    ]
  }

  addItem(targetItem) {
    this.items = this.items.filter(
      (item) => item.controllerName !== targetItem.controllerName
    )
    this.items.push(targetItem)
  }

  clear() {
    this.items = []
  }
}

const dummyErrorResponseList = new DummyErrorResponseList()

module.exports = {
  dummyErrorResponseList,
}
