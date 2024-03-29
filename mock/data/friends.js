const { BASE_URL } = require('../config')
const { getRandomString, getRandomName } = require('../util')

const makeUser = (index) => {
  const hasProfilePicOverride = Math.random() > 0.5

  return {
    id: `usr_${index}`,
    username: `username${index}`,
    displayName: getRandomName(),
    currentAvatarImageUrl: `${BASE_URL}/dummyImage/${getRandomString(20)}`,
    currentAvatarThumbnailImageUrl: `${BASE_URL}/dummyImage/${getRandomString(
      20
    )}`,
    profilePicOverride: hasProfilePicOverride
      ? `${BASE_URL}/dummyOverrideImage/${getRandomString(20)}`
      : '',
  }
}

const friends = []
for (let index = 0; index < 200; index++) {
  friends.push(makeUser(index))
}

module.exports = friends
