import { SettingStore } from '@/domains/Setting/SettingStore'

export type Color =
  | 'black'
  | 'paleBlack'
  | 'trueBlack'
  | 'green'
  | 'blue'
  | 'red'
  | 'yellow'
  | 'orange'
  | 'gray'
  | 'paleGray'
  | 'white'
  | 'front'
  | 'weakFront'
  | 'back'
  | 'weakBack'
  | 'main'
  | 'primary'
  | 'secondary'
  | 'success'
  | 'danger'
  | 'warning'

export type Theme = 'light' | 'dark'

const blackColor = '25, 25, 25'

const paleBlackColor = '38, 38, 38'

const trueBlackColor = '0, 0, 0'

const greenColor = '26, 188, 156'

const blueColor = '29, 161, 243'

const redColor = '224, 36, 94'

const yellowColor = '255, 173, 30'

const orangeColor = '244, 93, 34'

const grayColor = '150, 150, 150'

const paleGrayColor = '240, 240, 240'

const whiteColor = '255, 255, 255'

const getFrontColor = (theme: Theme) => {
  switch (theme) {
    case 'light':
      return blackColor
    case 'dark':
      return whiteColor
  }
}

const getWeakFrontColor = (theme: Theme) => {
  switch (theme) {
    case 'light':
      return paleBlackColor
    case 'dark':
      return paleGrayColor
  }
}

const getBackColor = (theme: Theme) => {
  switch (theme) {
    case 'light':
      return whiteColor
    case 'dark':
      return blackColor
  }
}

const getWeakBackColor = (theme: Theme) => {
  switch (theme) {
    case 'light':
      return paleGrayColor
    case 'dark':
      return paleBlackColor
  }
}

export class ColorManager {
  constructor(private readonly _settingStore: SettingStore) {}

  getRGB(color: Color): string {
    const theme = this._settingStore.setting.value.theme
    const mainColor = this._settingStore.setting.value.mainColor

    switch (color) {
      case 'black':
        return blackColor
      case 'paleBlack':
        return paleBlackColor
      case 'trueBlack':
        return trueBlackColor
      case 'green':
        return greenColor
      case 'blue':
        return blueColor
      case 'red':
        return redColor
      case 'yellow':
        return yellowColor
      case 'orange':
        return orangeColor
      case 'gray':
        return grayColor
      case 'paleGray':
        return paleGrayColor
      case 'white':
        return whiteColor
      case 'main':
        return this.getRGB(mainColor)
      case 'front':
        return getFrontColor(theme)
      case 'weakFront':
        return getWeakFrontColor(theme)
      case 'back':
        return getBackColor(theme)
      case 'weakBack':
        return getWeakBackColor(theme)
      case 'primary':
        return greenColor
      case 'secondary':
        return grayColor
      case 'success':
        return blueColor
      case 'danger':
        return redColor
      case 'warning':
        return yellowColor
    }

    throw new Error('unknown color.')
  }
}
