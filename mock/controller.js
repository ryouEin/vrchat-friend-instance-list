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
  }
}
