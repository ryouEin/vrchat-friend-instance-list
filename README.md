# vrchat-friend-instance-list

## Firefoxアドオンのアップデートワークフロー

1. `master` ブランチへバージョンアップのプルリクを取り込む
1. Mozillaのアドオン開発者センターにて、xpiファイルを作成
1. Releasesに作成したxpiファイルをアップロード
1. `firefox-addon-version-linter` で、update_linkが有効であることを確認する
