const path = require('path')
const { getRandomInteger } = require('./util')
const worlds = require('./data/worlds')
const friends = require('./data/friends')
const { dummyErrorResponseList } = require('./dummyErrorResponseList')

const locations = (() => {
  return [
    'offline',
    'private',
    ...worlds.map(world => `${world.id}:123~hidden(usr_0)~nonce(hogehoge)`),
    ...worlds.map(world => `${world.id}:123~friends(usr_0)~nonce(hogehoge)`),
    ...worlds.map(world => `${world.id}:123`),
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
      .map(friend => {
        return {
          ...friend,
          location: getRandomLocation(),
        }
      })
      .filter(friend => friend.location !== 'offline')

    res.json(onlineFriends.slice(offset, offset + n))
  },
  listFavorites(req, res) {
    const favoriteFriends = friends.slice(0, 5)

    res.json(
      favoriteFriends.map(friend => {
        return {
          favoriteId: friend.id,
        }
      })
    )
  },
  getWorld(req, res) {
    const id = req.params.id
    const world = worlds.find(world => world.id === id)
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
    const world = worlds.find(world => world.id === worldId)

    res.json({
      location,
      n_users: Math.floor(Math.random() * 10) + 3,
      capacity: world.capacity,
    })
  },
  listNews(req, res) {
    res.json({
      contents: [
        {
          id: 'yvlvweqsh',
          createdAt: '2030-07-05T14:26:53.289Z',
          updatedAt: '2030-07-05T14:26:53.289Z',
          publishedAt: '2030-07-05T14:26:53.289Z',
          title: 'お知らせ4',
          content: 'お知らせ4',
        },
        {
          id: 'ftunsbzb1',
          createdAt: '2030-07-05T14:26:44.242Z',
          updatedAt: '2030-07-05T14:26:44.242Z',
          publishedAt: '2030-07-05T14:26:44.242Z',
          title: 'お知らせ3',
          content: 'お知らせ3',
        },
        {
          id: 'x5nmty1rd',
          createdAt: '2030-07-05T14:26:23.438Z',
          updatedAt: '2030-07-05T14:26:23.438Z',
          publishedAt: '2030-07-05T14:26:23.438Z',
          title: 'お知らせ2',
          content:
            '## 中見出し\n\nダミーテキストダミーテキストダミーテキストダミーテキストダミーテキストダミーテキストダミーテキストダミーテキストダミーテキストダミーテキストダミーテキストダミーテキストダミーテキストダミーテキストダミーテキストダミーテキストダミーテキスト\n\n## 中見出し\n\nダミーテキスト[リンクテキスト](https://google.com)',
        },
        {
          id: '0ygmje1vv',
          createdAt: '2020-07-05T05:59:07.624Z',
          updatedAt: '2020-07-05T05:59:07.624Z',
          publishedAt: '2020-07-05T05:59:07.624Z',
          title: '最初のお知らせ',
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
