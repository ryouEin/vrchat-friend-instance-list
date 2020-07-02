chrome.tabs.onUpdated.addListener(tabId => {
  chrome.pageAction.show(tabId)
})
chrome.pageAction.onClicked.addListener(function() {
  chrome.tabs.create({ url: 'index.html' })
})
