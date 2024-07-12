import { request } from '@umijs/max'

// 查询调度日志列表
export function listJobLog(query) {
  return request('/monitor/jobLog/list', {
    method: 'get',
    params: query,
  })
}

// 删除调度日志
export function delJobLog(jobLogId) {
  return request('/monitor/jobLog/' + jobLogId, {
    method: 'delete',
  })
}

// 清空调度日志
export function cleanJobLog() {
  return request('/monitor/jobLog/clean', {
    method: 'delete',
  })
}
