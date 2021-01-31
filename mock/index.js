const express = require('express')
const { PORT } = require('./config')
const {
  getFriends,
  listFavorites,
  addFavorite,
  deleteFavorite,
  getWorld,
  listWorlds,
  getInstanceInfo,
  inviteMe,
  listNews,
  getDummyImage,
  mockError,
  unmockError,
} = require('./controller')
const { dummyErrorResponseList } = require('./dummyErrorResponseList')

const app = express()
app.use(express.static('mock/public'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const errorResponseMiddleware = (controllerName) => {
  return (req, res, next) => {
    const errorResponseDetail = dummyErrorResponseList.items.find(
      (item) => item.controllerName === controllerName
    )
    if (errorResponseDetail !== undefined) {
      return res.sendStatus(errorResponseDetail.status)
    }

    next()
  }
}

const sleep = (ms) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve()
    }, ms)
  })
}

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header(
    'Access-Control-Allow-Headers',
    'X-API-KEY, Content-Type, sentry-trace'
  )
  next()
})

app.use(async (req, res, next) => {
  await sleep(1000)
  next()
})

app.use((req, res, next) => {
  if (process.env.SEND_ERROR_STATUS !== undefined) {
    return res.sendStatus(process.env.SEND_ERROR_STATUS)
  }

  next()
})

app.options('*', (req, res) => {
  res.header('Access-Control-Allow-Methods', 'PUT, DELETE')
  res.send('OPTIONS SUCCESS')
})

app.get(
  '/api/1/auth/user/friends',
  errorResponseMiddleware('getFriends'),
  getFriends
)
app.get(
  '/api/1/favorites',
  errorResponseMiddleware('listFavorites'),
  listFavorites
)
app.post(
  '/api/1/favorites',
  errorResponseMiddleware('addFavorite'),
  addFavorite
)
app.delete(
  '/api/1/favorites/:id',
  errorResponseMiddleware('deleteFavorite'),
  deleteFavorite
)
app.get('/api/1/worlds/:id', errorResponseMiddleware('getWorld'), getWorld)
app.get('/api/1/worlds', errorResponseMiddleware('listWorlds'), listWorlds)
app.get(
  '/api/1/instances/:location',
  errorResponseMiddleware('getInstanceInfo'),
  getInstanceInfo
)
app.post(
  '/api/1/instances/:location/invite',
  errorResponseMiddleware('inviteMe'),
  inviteMe
)
app.get('/news', errorResponseMiddleware('listNews'), listNews)
app.get('/dummyImage/:uid', getDummyImage)
app.post('/mockError', mockError)
app.post('/unmockError', unmockError)

app.listen(PORT, () => console.log(`Api mock listening on port ${PORT}!`))
