export type Color =
  | 'black'
  | 'green'
  | 'blue'
  | 'red'
  | 'yellow'
  | 'orange'
  | 'gray'
  | 'paleGray'
  | 'white'

export const getRGB = (color: Color) => {
  switch (color) {
    case 'black':
      return '44, 62, 80'
    case 'green':
      return '26, 188, 156'
    case 'blue':
      return '52, 152, 219'
    case 'red':
      return '192, 57, 43'
    case 'yellow':
      return '241, 196, 15'
    case 'orange':
      return '230, 126, 34'
    case 'gray':
      return '149, 165, 166'
    case 'paleGray':
      return '236, 240, 241'
    case 'white':
      return '255, 255, 255'
  }

  throw new Error('unknown color.')
}
