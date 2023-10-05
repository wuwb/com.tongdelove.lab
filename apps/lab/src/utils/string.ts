export function getAllRegexMatch(regex: RegExp, str: string) {
  const matches = str.matchAll(regex)
  const ids = []
  for (const match of matches) {
    if (match[1]) {
      ids.push(match[1])
    }
  }
  return ids
}

export function returnRegexFirstMatch(
  regex: RegExp,
  str: string
): string | null {
  const matches = str.matchAll(regex)
  for (const match of matches) {
    if (match[1]) {
      return match[1]
    }
  }
  return null
}
export function stripAndLowercase(str: string) {
  return str.replace(/[^a-zA-Z0-9]/g, '').toLowerCase()
}
export function slugify(text: string) {
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(/[^\w\-]+/g, '') // Remove all non-word chars
    .replace(/\-\-+/g, '-') // Replace multiple - with single -
    .replace(/^-+/, '') // Trim - from start of text
    .replace(/-+$/, '') // Trim - from end of text
}
export const truncate = (str: string, n: number) => {
  return str.length > n ? str.slice(0, n - 1) + '...' : str
}

export function checkStringContains(
  stringList: string[],
  targetString: string
) {
  const regex = new RegExp(stringList.join('|'))
  return regex.test(targetString)
}
