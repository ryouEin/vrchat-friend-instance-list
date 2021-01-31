export const Colors = {
  Black: 'black',
  PaleBlack: 'paleBlack',
  TrueBlack: 'trueBlack',
  Green: 'green',
  Blue: 'blue',
  Red: 'red',
  Yellow: 'yellow',
  Orange: 'orange',
  Gray: 'gray',
  PaleGray: 'paleGray',
  White: 'white',
  Front: 'front',
  WeakFront: 'weakFront',
  Back: 'back',
  WeakBack: 'weakBack',
  Main: 'main',
  Primary: 'primary',
  Secondary: 'secondary',
  Success: 'success',
  Danger: 'danger',
  Warning: 'warning',
} as const
export type Color = typeof Colors[keyof typeof Colors]

export const Themes = {
  Light: 'light',
  Dark: 'dark',
} as const
export type Theme = typeof Themes[keyof typeof Themes]
