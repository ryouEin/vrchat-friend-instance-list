import { DialogComponent } from '../../../../../../../components/presentational/DialogComponent/DialogComponent'
import { ButtonComponent } from '../../../../../../../components/presentational/ButtonComponent/ButtonComponent'
import styles from './style.module.scss'
import { ToggleComponent } from '../../../../../../../components/presentational/ToggleComponent/ToggleComponent'
import { Color, Colors, Themes } from '../../../../../../../Colors'
import { SelectComponent } from '../../../../../../../components/presentational/SelectComponent/SelectComponent'
import { Setting } from '../../../../../../../types'

const selectItems = [
  {
    label: 'グリーン',
    value: Colors.Green,
  },
  {
    label: 'レッド',
    value: Colors.Red,
  },
  {
    label: 'ブルー',
    value: Colors.Blue,
  },
  {
    label: 'イエロー',
    value: Colors.Yellow,
  },
  {
    label: 'オレンジ',
    value: Colors.Orange,
  },
]

type Props = {
  isVisible: boolean
  setting: Setting
  onChangeSetting: (setting: Setting) => void
  hide: () => void
}
export const SettingDialogComponent = (props: Props) => {
  const onChangeEnabledNotificationSound = (checked: boolean) => {
    props.onChangeSetting({
      ...props.setting,
      enableNotificationSound: checked,
    })
  }

  const isDarkMode = props.setting.theme === Themes.Dark
  const onChangeTheme = (checked: boolean) => {
    props.onChangeSetting({
      ...props.setting,
      theme: checked ? Themes.Dark : Themes.Light,
    })
  }

  const onChangeMainColor = (color: Color) => {
    props.onChangeSetting({
      ...props.setting,
      mainColor: color,
    })
  }

  return (
    <DialogComponent
      isVisible={props.isVisible}
      title="設定"
      contentSlot={
        <div className={styles.settingList}>
          <div className={styles.settingListItem}>
            <div className={styles.settingItem}>
              <div className={styles.settingItemLeft}>
                <div className={styles.settingItemTitle}>通知音</div>
                <div className={styles.settingItemNote}>
                  OSの通知音と重複する場合はOFFにしてください
                </div>
              </div>
              <div className={styles.settingItemInput}>
                <ToggleComponent
                  checked={props.setting.enableNotificationSound}
                  onChange={onChangeEnabledNotificationSound}
                />
              </div>
            </div>
          </div>

          <div className={styles.settingListItem}>
            <div className={styles.settingItem}>
              <div className={styles.settingItemLeft}>
                <div className={styles.settingItemTitle}>ダークモード</div>
                <div className={styles.settingItemNote} />
              </div>
              <div className={styles.settingItemInput}>
                <ToggleComponent
                  checked={isDarkMode}
                  onChange={onChangeTheme}
                />
              </div>
            </div>
          </div>

          <div className={styles.settingListItem}>
            <div className={styles.settingItem}>
              <div className={styles.settingItemLeft}>
                <div className={styles.settingItemTitle}>メインカラー</div>
                <div className={styles.settingItemNote} />
              </div>
              <div className={styles.settingItemInput}>
                <SelectComponent
                  items={selectItems}
                  value={props.setting.mainColor}
                  onChange={onChangeMainColor}
                />
              </div>
            </div>
          </div>
        </div>
      }
      buttons={[
        <ButtonComponent onClick={props.hide}>
          <span>閉じる</span>
        </ButtonComponent>,
      ]}
    />
  )
}
