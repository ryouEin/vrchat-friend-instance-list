const path = require('path')
const { getRandomInteger } = require('./util')
const worlds = require('./data/worlds')
const friends = require('./data/friends')
const favorites = require('./data/favorites')
const { dummyErrorResponseList } = require('./dummyErrorResponseList')

const locations = (() => {
  return [
    'offline',
    'offline',
    'offline',
    'offline',
    'unknown_permission',
    'private',
    ...worlds.map((world) => `${world.id}:123~hidden(usr_0)~nonce(hogehoge)`),
    ...worlds.map(
      (world) => `${world.id}:123~hidden(usr_0)~region(jp)~nonce(hogehoge)`
    ),
    ...worlds.map(
      (world) => `${world.id}:123~hidden(usr_0)~region(eu)~nonce(hogehoge)`
    ),
    ...worlds.map((world) => `${world.id}:123~friends(usr_0)~nonce(hogehoge)`),
    ...worlds.map(
      (world) => `${world.id}:123~friends(usr_0)~region(us)~nonce(hogehoge)`
    ),
    ...worlds.map(
      (world) => `${world.id}:123~private(usr_678)~canRequestInvite~nonce(90)`
    ),
    ...worlds.map((world) => `${world.id}:123~private(usr_678)~nonce(90)`),
    ...worlds.map((world) => `${world.id}:123`),
    ...worlds.map((world) => `${world.id}:123~region(jp)`),
    ...worlds.map((world) => `${world.id}:123~region(use)`),
    ...worlds.map((world) => `${world.id}:hogehoge~fugafuga`),
  ]
})()
const getRandomLocation = () => {
  const randomIndex = getRandomInteger(0, locations.length - 1)
  return locations[randomIndex]
}

module.exports = {
  getFriends(req, res) {
    const { n, offset } = req.query

    const onlineFriends = friends
      .map((friend) => {
        return {
          ...friend,
          location: getRandomLocation(),
        }
      })
      .filter((friend) => friend.location !== 'offline')

    res.json(onlineFriends.slice(offset, offset + n))
  },
  listFavorites(req, res) {
    const { n, offset } = req.query
    res.json(favorites.slice(offset, offset + n))
  },
  addFavorite(req, res) {
    const timeString = String(new Date().getTime())
    const newFavorite = {
      id: `fvrt_${timeString}`,
      favoriteId: req.body.favoriteId,
      type: req.body.type,
      tags: req.body.tags,
    }
    favorites.push(newFavorite)

    res.json(newFavorite)
  },
  deleteFavorite(req, res) {
    const index = favorites.findIndex((favorite) => favorite.id === req.body.id)
    favorites.splice(index, 1)

    res.json()
  },
  getWorld(req, res) {
    const id = req.params.id
    const world = worlds.find((world) => world.id === id)
    if (world === undefined) {
      throw new Error(`world ${id} is not found.`)
    }

    res.json(world)
  },
  listWorlds(req, res) {
    const listedWorlds = [...worlds].slice(0, Math.round(worlds.length / 2))

    res.json(listedWorlds)
  },
  getInstanceInfo(req, res) {
    const location = req.params.location
    const worldId = location.split(':')[0]
    const world = worlds.find((world) => world.id === worldId)

    res.json({
      location,
      n_users: Math.floor(Math.random() * 10) + 3,
      capacity: world.capacity,
    })
  },
  inviteMe(req, res) {
    res.json({})
  },
  listNews(req, res) {
    res.json({
      contents: [
        {
          id: 'ftunsbzb1',
          createdAt: '2030-07-05T14:26:44.242Z',
          updatedAt: '2030-07-05T14:26:44.242Z',
          publishedAt: '2030-07-05T14:26:44.242Z',
          title: 'お知らせ4',
          content: 'お知らせ4',
        },
        {
          id: 'x5nmty1rd',
          createdAt: '2030-07-05T14:26:23.438Z',
          updatedAt: '2030-07-05T14:26:23.438Z',
          publishedAt: '2030-07-05T14:26:23.438Z',
          title: 'お知らせ3',
          content:
            '## 中見出し\n\nダミーテキストダミーテキストダミーテキストダミーテキストダミーテキストダミーテキストダミーテキストダミーテキストダミーテキストダミーテキストダミーテキストダミーテキストダミーテキストダミーテキストダミーテキストダミーテキストダミーテキスト\n\n## 中見出し\n\nダミーテキスト[リンクテキスト](https://google.com)',
        },
        {
          id: '0ygmje1av',
          createdAt: '2020-08-05T05:59:07.624Z',
          updatedAt: '2020-08-05T05:59:07.624Z',
          publishedAt: '2020-08-05T05:59:07.624Z',
          title: 'お知らせ2',
          content: 'お知らせ本文',
        },
        {
          id: '0ygmje1vv',
          createdAt: '2020-07-05T05:59:07.624Z',
          updatedAt: '2020-07-05T05:59:07.624Z',
          publishedAt: '2020-07-05T05:59:07.624Z',
          title: 'お知らせ1',
          content: 'お知らせ本文',
        },
      ],
      totalCount: 4,
      offset: 0,
      limit: 10,
    })
  },
  getDummyImage(req, res) {
    res.sendFile(path.resolve(__dirname, './data/dummy.png'))
  },
  getDummyOverrideImage(req, res) {
    res.sendFile(path.resolve(__dirname, './data/dummy_override.png'))
  },
  mockError(req, res) {
    dummyErrorResponseList.addItem({
      controllerName: req.body.controllerName,
      status: req.body.status,
    })

    res.json(dummyErrorResponseList.items)
  },
  unmockError(req, res) {
    dummyErrorResponseList.clear()
    res.json(dummyErrorResponseList.items)
  },
}
