export class TreeDataDto {
  /* id值 */
  id: number

  /* 名称 */
  name: string

  /* 子项数组 */
  children?: TreeDataDto[]
}
