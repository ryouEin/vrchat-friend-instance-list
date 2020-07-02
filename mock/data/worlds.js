const makeWorld = index => {
  return {
    id: `wrld_${index}`,
    name: `World ${index}`,
    imageUrl: 'https://placehold.jp/150x150.png',
    thumbnailImageUrl: 'https://placehold.jp/150x150.png'
  }
}

const worlds = []
for (let index = 0; index < 10; index++) {
  worlds.push(makeWorld(index))
}

module.exports = worlds
