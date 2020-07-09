/*
UserListのユーザーをソートする関数だが、どのorどういう名前のディレクトリに配置すべきかわからない
UserList.vue内にローカル関数として入れておくことも考えたが、そうなると関数単体でのテストが出来ず構築されたDOMに対してテストを書く必要があり非常に面倒
 */
import { User } from '@/types'

export const sortUsers: (users: User[]) => User[] = users => {
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
