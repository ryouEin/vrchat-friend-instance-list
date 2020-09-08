import { vm } from '@/main'

export const showAuthorizationErrorDialog = () => {
  vm.$alert({
    title: '認証エラー',
    content: `VRChat公式サイトのセッションが切れました。  
公式サイトでログインし直したあと、再読込して下さい。

[公式サイトログインページ](https://www.vrchat.com/login)`,
    isMarkdown: true,
    showCloseButton: false,
    customButtonOptions: [
      {
        text: '再読込',
        onClick: () => {
          location.reload()
        },
      },
    ],
  })
}
