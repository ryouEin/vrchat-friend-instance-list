import { CSSProperties, useMemo } from 'react'
import { useSelector } from 'react-redux'
import { selectMainColor, selectTheme } from '../../store/Setting/SettingStore'
import { Colors } from '../../Colors'
import { getRGBCSSVariableValue } from '../../../config/color'
import { colorToCSSVariableString } from '../../shame/ColorUtil'

export const useRootCSSVariablesStyle: () => CSSProperties = () => {
  const theme = useSelector(selectTheme)
  const mainColor = useSelector(selectMainColor)

  let rootCSSVariableStyle: any = {}
  for (const [, color] of Object.entries(Colors)) {
    // Colorは定数で、ループの内容が確実に固定なためESLintを無効化
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const rgb = useMemo(() => getRGBCSSVariableValue(color, theme, mainColor), [
      color,
      theme,
      mainColor,
    ])
    rootCSSVariableStyle[colorToCSSVariableString(color)] = rgb
  }

  return rootCSSVariableStyle
}
