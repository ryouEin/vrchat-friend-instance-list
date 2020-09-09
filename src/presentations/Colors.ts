import { settingStore } from '@/domains/DomainStoreFactory'

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

const blackColor = '44, 62, 80'

const paleBlackColor = '52, 73, 94'

const trueBlackColor = '0, 0, 0'

const greenColor = '26, 188, 156'

const blueColor = '52, 152, 219'

const redColor = '192, 57, 43'

const yellowColor = '241, 196, 15'

const orangeColor = '230, 126, 34'

const grayColor = '149, 165, 166'

const paleGrayColor = '236, 240, 241'

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

export const getRGB: (color: Color) => string = color => {
  const theme = settingStore.setting.theme
  const mainColor = settingStore.setting.mainColor

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
      return getRGB(mainColor)
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