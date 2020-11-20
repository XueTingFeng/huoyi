import request from '@/utils/request'

// 分页查询
export function getPage(url,params) {
  return request({
    url: url,
    method: 'get',
    params
  })
}