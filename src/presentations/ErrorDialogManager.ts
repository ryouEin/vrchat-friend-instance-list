import { alertStore } from '@/presentations/ui_store/UiStoreFactory'

export const showAuthorizationErrorDialog = () => {
  alertStore.showAction({
    title: '認証エラー',
    content: `VRChat公式サイトのセッションが切れました。  
公式サイトでログインし直したあと、再読込して下さい。

[公式サイトログインページ](https://www.vrchat.com/login)`,
    isMarkdown: true,
    showCloseButton: false,
    customButtonOptions: [
      {
        text: '再読込',
        color: 'primary',
        onClick: () => {
          location.reload()
        },
      },
    ],
  })
}
