import { Color, Colors, Theme } from '../presentations/Colors'

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

export function getRGBCSSVariableValue(
  color: Color,
  theme: Theme,
  mainColor: Color
): string {
  switch (color) {
    case Colors.Black:
      return blackColor
    case Colors.PaleBlack:
      return paleBlackColor
    case Colors.TrueBlack:
      return trueBlackColor
    case Colors.Green:
      return greenColor
    case Colors.Blue:
      return blueColor
    case Colors.Red:
      return redColor
    case Colors.Yellow:
      return yellowColor
    case Colors.Orange:
      return orangeColor
    case Colors.Gray:
      return grayColor
    case Colors.PaleGray:
      return paleGrayColor
    case Colors.White:
      return whiteColor
    case Colors.Main:
      return getRGBCSSVariableValue(mainColor, theme, mainColor)
    case Colors.Front:
      return getFrontColor(theme)
    case Colors.WeakFront:
      return getWeakFrontColor(theme)
    case Colors.Back:
      return getBackColor(theme)
    case Colors.WeakBack:
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
