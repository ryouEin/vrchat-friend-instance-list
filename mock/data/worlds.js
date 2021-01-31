const { BASE_URL } = require('../config')
const { getRandomString } = require('../util')

const makeWorld = (index) => {
  return {
    id: `wrld_${index}`,
    name: `World ${index} long name long name long name`,
    imageUrl: `${BASE_URL}/dummyImage/${getRandomString(20)}`,
    thumbnailImageUrl: `${BASE_URL}/dummyImage/${getRandomString(20)}`,
    capacity: 1 + index,
  }
}

const worlds = []
for (let index = 0; index < 5; index++) {
  worlds.push(makeWorld(index))
}

module.exports = worlds
