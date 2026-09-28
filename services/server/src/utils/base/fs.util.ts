import fs from 'fs'

/**
 * 判断是否是文件夹
 * @param path
 * @returns boolean
 */
export const isDirectory = (path: string) => {
  try {
    return fs.lstatSync(path).isDirectory()
  } catch (error) {
    throw new Error(`Path ${path} is not a directory`);
  }
}
