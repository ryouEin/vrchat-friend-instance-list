const dummyNames = require('./data/dummyNames')

const getRandomInteger = (min, max) => {
  return min + Math.round(Math.random() * (max - min))
}

const getRandomChar = () => {
  const charList =
    'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'

  return charList[Math.floor(Math.random() * charList.length)]
}

const getRandomString = (length) => {
  return Array.from(Array(length))
    .map(() => getRandomChar())
    .join('')
}

const getRandomName = () => {
  return dummyNames[Math.floor(Math.random() * dummyNames.length)]
}

module.exports = {
  getRandomInteger,
  getRandomChar,
  getRandomString,
  getRandomName,
}
