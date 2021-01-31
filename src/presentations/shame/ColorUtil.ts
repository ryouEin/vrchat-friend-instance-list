import { Color } from '../Colors'

export const colorToCSSVariableString = (color: Color) => {
  return `--${color}Color`
}

export const convertColorToRGBString = (color: Color) => {
  return `rgb(var(${colorToCSSVariableString(color)}))`
}

export const convertColorToRGBAString = (color: Color, opacity: number) => {
  return `rgba(var(${colorToCSSVariableString(color)}), ${opacity})`
}
