function isString (str: string | number | object): boolean {
  return typeof (str) === 'string'
}

const getFirstLetter = (str: string) => str.substr(0, 1)
const getFirstLetters = (str: string) => str.split(' ').map(s => getFirstLetter(s)).join('')
const getFirstWord = (str: string) => str.split(' ')[0]
const camelCase = (str: string) => str.split(' ').map(s => getFirstLetter(s).toUpperCase() + s.substr(1, s.length - 1).toLowerCase())

export {
  isString,
  getFirstLetter,
  getFirstLetters,
  getFirstWord,
  camelCase
}
