const makeUser = index => {
  return {
    id: `usr_${index}`,
    username: `username${index}`,
    displayName: `displayName${index}`,
    currentAvatarImageUrl: 'https://placehold.jp/150x150.png',
    currentAvatarThumbnailImageUrl: 'https://placehold.jp/150x150.png'
  }
}

const friends = []
for (let index = 0; index < 130; index++) {
  friends.push(makeUser(index))
}

module.exports = friends
