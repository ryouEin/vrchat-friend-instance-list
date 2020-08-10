# vrchat-friend-instance-list

## Firefoxアドオンのアップデートワークフロー

1. `master` ブランチへバージョンアップのプルリクを取り込む
1. Mozillaのアドオン開発者センターにて、xpiファイルを作成
1. Releasesに作成したxpiファイルをアップロード
1. `npm run ff_addon_lint:checkUpdateLinkValidity` で、update_linkが有効であることを確認する

## ストア（Vuex）の方針

+ State及びMutationはprivateにし、外部からはGettersとActionのみアクセス出来るように
    + Stateは外部で書き換えられると困るので言わずもがな
    + Mutationに関しては、外部からアクセス出来るMutationとそうでないものが混在すると混乱しそうなので
+ ストアはモジュール毎にディレクトリで分け、メイン部分は `index.ts` 、ロジックは `functions.ts` に記述する。
+ テストはActionsのみ（functionsのロジックの正当性はActionsのテストで担保出来ると判断）

## CSSの規約

### 全体

+ 命名はキャメルケース
+ 一部、接頭語を付与する必要がある場合はケバブケースで付与（ex: `u-alignCenter` ）

### コンポーネント

+ コンポーネントのスタイルは、Scoped CSSで記述
+ コンポーネントのルートDOMは、接頭語として `c-` を記述。接頭語以降はコンポーネント名とする（ex: Dialogコンポーネントの場合 `c-dialog` ）
    + ルートDOMはScoped CSSでも親コンポーネントと名前がバッティングするのでそれを防ぐため

### グローバルCSS

+ 以下のカテゴリに関しては、グローバルCSSとして定義
+ 名前被りを防ぐために、カテゴリ毎に接頭語を付与する

#### utility

+ 接頭語として `u-` を記述
+ マージン調整だけしたい時など、わざわざクラスを付与してCSSを書くまでもないような時に使用

#### transitions

+ 接頭語として `t-` を記述
+ vueのtransitionに使用するスタイル
