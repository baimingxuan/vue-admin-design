import request from '../request'

export function login(data) {
  return request({
    url: '/api/login',
    method: 'post',
    data
  })
}

export function getUserInfo(params) {
  return request({
    url: '/api/getUserInfo',
    method: 'get',
    params
  })
}
