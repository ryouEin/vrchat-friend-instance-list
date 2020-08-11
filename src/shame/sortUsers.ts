/*
UserListのユーザーをソートする関数だが、どのorどういう名前のディレクトリに配置すべきかわからない
OnlineFriendsList.vue内にローカル関数として入れておくことも考えたが、そうなると関数単体でのテストが出来ず構築されたDOMに対してテストを書く必要があり非常に面倒
 */
import { Friend } from '@/types'

export const sortUsers: (users: Friend[]) => Friend[] = users => {
  return users.sort((a, b) => {
    if (a.isFavorited !== b.isFavorited) {
      return a.isFavorited ? -1 : 1
    }

    if (a.isNew !== b.isNew) {
      return a.isNew ? -1 : 1
    }

    return a.displayName.localeCompare(b.displayName, 'ja')
  })
}
