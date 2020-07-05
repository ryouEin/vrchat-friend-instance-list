const express = require('express')
const { getFriends, listFavorites, getWorld, listWorlds, getInstanceInfo } = require('./controller')

const app = express()

const sleep = (ms) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve()
    }, ms)
  })
}

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  next()
})

app.use(async (req, res, next) => {
  await sleep(3000)
  next()
})

app.use((req, res, next) => {
  if (process.env.SEND_ERROR_STATUS !== undefined) {
    return res.sendStatus(process.env.SEND_ERROR_STATUS)
  }

  next()
})

app.get('/api/1/auth/user/friends', getFriends)
app.get('/api/1/favorites', listFavorites)
app.get('/api/1/worlds/:id', getWorld)
app.get('/api/1/worlds', listWorlds)
app.get('/api/1/instances/:location', getInstanceInfo)

app.listen(3000, () => console.log('Api mock listening on port 3000!'))
