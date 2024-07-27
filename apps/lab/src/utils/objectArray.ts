export const objectArray = (arr: any[], key = 'id') =>
  arr.reduce((acc, cur) => {
    acc[cur[key]] = cur
    return acc
  }, {})
