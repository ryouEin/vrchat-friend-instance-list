const friends = require('./friends')

module.exports = friends.slice(0, 5).map(friend => {
  const timeString = String(new Date().getTime())

  return {
    id: `fvrt_${timeString}`,
    favoriteId: friend.id,
    type: 'friend',
    tags: [`group_${Math.random() > 0.5 ? 0 : 1}`],
  }
})
