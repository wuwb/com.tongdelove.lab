import type { Chat } from '@/types/chat'

export function groupByDate(chatList: Chat[]) {
  const groupMap = new Map<string, Chat[]>()
  chatList.forEach((item) => {
    const now = new Date()
    const updateAt = new Date(item.updateAt)
    let key = '未知时间'
    const dayDiff = Math.floor(
      (now.getTime() - updateAt.getTime()) / (1000 * 60 * 60 * 24)
    )
    if (dayDiff === 0 && now.getDate() === updateAt.getDate()) {
      key = '今天'
    } else if (dayDiff <= 7) {
      key = '最近7天'
    } else if (dayDiff <= 31) {
      key = '最近一个月'
    } else if (now.getFullYear() === updateAt.getFullYear()) {
      key = `${updateAt.getMonth() + 1}月`
    } else {
      key = `${updateAt.getFullYear()}`
    }
    if (groupMap.has(key)) {
      groupMap.get(key)?.push(item)
    } else {
      groupMap.set(key, [item])
    }
  })
  groupMap.forEach((item) => {
    item.sort((a, b) => b.updateAt - a.updateAt)
  })
  const groupList = Array.from(groupMap).sort(([, list1], [, list2]) => {
    return list2[list2.length - 1].updateAt - list1[list1.length - 1].updateAt
  })
  return groupList
}
