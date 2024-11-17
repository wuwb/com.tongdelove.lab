export type { UnPromisify } from './types'

export * from './array/index'
export * from './typeguards/index'
export * from './asserts/index'
export * from './convert/index'
export * from './random'
export * from './crypto'
export { OctreeNode } from './color/OctreeNode'
export { Popularity } from './color/Popularity'


export function isNonEmptyString(value: unknown): value is string {
  return typeof value === 'string' && value.trim().length > 0;
}
