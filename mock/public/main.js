const controllerNameSelect = document.getElementById('ControllerName')
const statusInput = document.getElementById('Status')
const mockErrorButton = document.getElementById('MockErrorButton')
const unmockErrorButton = document.getElementById('UnmockErrorButton')

const post = async (url, bodyObject) => {
  const method = 'POST'
  const body = JSON.stringify(bodyObject)
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  }
  const response = await fetch(url, { method, headers, body })

  return await response.json()
}

mockErrorButton.addEventListener('click', async () => {
  const controllerName = (() => {
    const index = controllerNameSelect.selectedIndex
    return controllerNameSelect.options[index].value
  })()
  const status = statusInput.value

  const response = await post('/mockError', {
    controllerName,
    status,
  })
  console.log(response)
})

unmockErrorButton.addEventListener('click', async () => {
  const response = await post('/unmockError')
  console.log(response)
})
