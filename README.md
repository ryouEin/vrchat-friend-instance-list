# vrchat-friend-instance-list

## Firefoxアドオンのアップデートワークフロー

1. `master` ブランチへバージョンアップのプルリクを取り込む
1. `npm run build` でビルド
1. `npx sentry-cli --auth-token [token] releases --org [SentryのORG名] files [リリース名] upload ./dist` で、Sentryにリリース登録
1. Mozillaのアドオン開発者センターにて、xpiファイルを作成
1. Releasesに作成したxpiファイルをアップロード
1. `npm run ff_addon_lint:checkUpdateLinkValidity` で、update_linkが有効であることを確認する

## Storeに関して

Storeは以下のメリットを考えCompositionAPIで作成している

+ DI可能
+ 算出プロパティが機能する（キャッシュが効く

アプリ全体で使用するStoreは `GlobalStoreFactory` にて実体を生成すること。  
`this.$store.exampleStore` みたいな感じに使えるようになる。

特定画面でしか使用しないStoreはスコープを抑えるために、その画面で実体を生成し `provide` すること。  
使用する際は必要なコンポーネントで `inject` して使用する。

あと特定画面でしか使用しないStoreは必ず各画面のルートコンポーネントで `provide` している
（これはなんとなくでしかないが、スコープを縮めたいからと言って色々な箇所で `provide` しているとコードの予測が付きづらくなる気がしたので。好みのレベルな気もする。）

## カスタムエラー型

以下のような形で使用できる `BaseError` クラスを用意しているので、カスタムエラー型が必要な場合はこれを使うこと

```
export class NetworkError extends BaseError<{ status?: number }> {
  constructor(private readonly _status?: number, e?: string) {
    super(e)
  }

  get details() {
    return {
      status: this._status,
    }
  }
}
```

エラーに付加情報が必要な場合は、 `details` で返すようにすること。abstractにしているので付加情報が不要な場合でも空オブジェクトを返す必要がある。

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

### 色の指定

色はCSS Variablesでアプリルート（#app）に対して指定している。

この変数を利用して色を指定する際は `rgb` または `rgba` を必ず使用すること。（`rgba(var(--mainColor), 0.8)` みたいに指定できるようにするために、色を16進数ではなく `--blackcolor: 0, 0, 0` みたいにrgbで設定しているのでそうしないと反映されない。）

