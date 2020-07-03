const Base64 = require('js-base64').Base64
const { getRandomInteger } = require('./util')
const worlds = require('./data/worlds')
const friends = require('./data/friends')

const locations = (() => {
  return [
    'offline',
    'private',
    ...worlds.map(world => `${world.id}:123~hidden(usr_0)~nonce(hogehoge)`),
    ...worlds.map(world => `${world.id}:123~friends(usr_0)~nonce(hogehoge)`),
    ...worlds.map(world => `${world.id}:123`)
  ]
})()
const getRandomLocation = () => {
  const randomIndex = getRandomInteger(0, locations.length - 1)
  return locations[randomIndex]
}

module.exports = {
  getFriends (req, res) {
    const { n, offset } = req.query

    const onlineFriends = friends.map(friend => {
      return {
        ...friend,
        location: getRandomLocation()
      }
    }).filter(friend => friend.location !== 'offline')

    res.json(onlineFriends.slice(offset, offset + n))
  },
  listFavorites (req, res) {
    const favoriteFriends = friends.slice(0, 5)

    res.json(favoriteFriends.map(friend => {
      return {
        favoriteId: friend.id
      }
    }))
  },
  getWorld (req, res) {
    const id = req.params.id
    const world = worlds.find(world => world.id === id)
    if (world === undefined) {
      throw new Error(`world ${id} is not found.`)
    }

    res.json(world)
  },
  listWorlds (req, res) {
    const listedWorlds = [...worlds].slice(0, -1)

    res.json(listedWorlds)
  },
  getInstanceInfo (req, res) {
    res.json({
      n_users: 10,
      capacity: 20
    })
  },
  versions (req, res) {
    const versionsJsonString = JSON.stringify([
      {
        version: '0.0.0',
        contents: [
          '最初のバージョン'
        ]
      },
      {
        version: '999.0.0',
        contents: [
          '最新のモックバージョン',
          '二行目',
          '超長いテキスト超長いテキスト超長いテキスト超長いテキスト超長いテキスト超長いテキスト超長いテキスト超長いテキスト超長いテキスト超長いテキスト超長いテキスト超長いテキスト超長いテキスト超長いテキスト超長いテキスト超長いテキスト超長いテキスト超長いテキスト超長いテキスト超長いテキスト超長いテキスト超長いテキスト超長いテキスト超長いテキスト超長いテキスト超長いテキスト超長いテキスト超長いテキスト超長いテキスト超長いテキスト'
        ]
      }
    ])
    res.json({
      content: Base64.encode(versionsJsonString)
    })
  }
}
