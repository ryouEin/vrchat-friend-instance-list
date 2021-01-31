import { VRChatApiFriendsRepository } from './VRChatApiFriendsRepository'
import { MockVRChatApi } from '../../mock/MockVRChatApi'

describe('fetchAllFriends', () => {
  const dummyFriend = {
    id: 'dummy',
    username: 'dummy',
    displayName: 'dummy',
    currentAvatarImageUrl: 'dummy',
    currentAvatarThumbnailImageUrl: 'dummy',
    location: 'dummy',
  }

  it('全ユーザーを取得する', async () => {
    const dummyFriends = []
    for (let index = 0; index < 301; index++) {
      dummyFriends.push({
        ...dummyFriend,
        id: `usr_${index}`,
      })
    }

    const mockVRChatApi = new MockVRChatApi()
    mockVRChatApi.friends = [...dummyFriends]
    const friendsRepository = new VRChatApiFriendsRepository(mockVRChatApi)
    const result = await friendsRepository.fetchAllFriends()

    expect(result).toEqual(dummyFriends)
  })
})
