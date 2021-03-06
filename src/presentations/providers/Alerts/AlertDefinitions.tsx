import { NewAlert } from './types'
import { ButtonComponent } from '../../components/presentational/ButtonComponent/ButtonComponent'
import React from 'react'
import { VRCHAT_WEBSITE_URL } from '../../../config/url'
import { ExternalLinkComponent } from '../../components/presentational/ExternalLinkComponent'

export const UNAUTHORIZED_FROM_VRCHAT_ERROR: NewAlert = {
  title: '認証エラー',
  contentSlot: (
    <>
      <p>VRChat公式サイトのセッションが切れました。</p>
      <p className="u-mb10">
        公式サイトでログインし直したあと、再読込して下さい。
      </p>
      <p>
        <ExternalLinkComponent href={VRCHAT_WEBSITE_URL}>
          <span>公式サイトログインページ</span>
        </ExternalLinkComponent>
      </p>
    </>
  ),
  buttons: () => [
    <ButtonComponent
      color="primary"
      onClick={() => {
        // eslint-disable-next-line no-restricted-globals
        location.reload()
      }}
    >
      <span>再読込</span>
    </ButtonComponent>,
  ],
}

export const SERVICE_UNAVAILABLE_IN_VRCHAT_ERROR: NewAlert = {
  title: '通信エラー',
  contentSlot: (
    <>
      <p>通信に失敗しました。</p>
      <p className="u-mb10">
        公式サイトをリロードする、もしくはログインし直すと改善される場合があります。
      </p>
      <p>
        <ExternalLinkComponent href={VRCHAT_WEBSITE_URL}>
          <span>公式サイトログインページ</span>
        </ExternalLinkComponent>
      </p>
    </>
  ),
  buttons: () => [
    <ButtonComponent
      color="primary"
      onClick={() => {
        // eslint-disable-next-line no-restricted-globals
        location.reload()
      }}
    >
      <span>再読込</span>
    </ButtonComponent>,
  ],
}

export const NOTIFICATION_PERMISSION_ALERT: NewAlert = {
  title: '通知の許可が必要です',
  contentSlot: (
    <>
      <p>
        デスクトップに通知を届けるには、通知の許可をして頂く必要があります。
      </p>
      <p>
        このダイアログを閉じた後、通知の許可を求めるポップアップが表示されますので、「許可」のボタンをクリックしてください。
      </p>
    </>
  ),
  buttons: (close) => [
    <ButtonComponent
      onClick={() => {
        Notification.requestPermission()
        close()
      }}
    >
      <span>閉じる</span>
    </ButtonComponent>,
  ],
}

export const NOTIFICATION_PERMISSION_WHEN_DENIED_ALERT: NewAlert = {
  title: '通知の許可が必要です',
  contentSlot: (
    <>
      <p>
        デスクトップに通知を届けるには、通知の許可をして頂く必要があります。
      </p>
      <p>通知の設定を「許可」に変更してください。</p>
    </>
  ),
}
