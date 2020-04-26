import axios from 'axios'

export function getTableList (param) {
  return axios({
    url: 'https://www.easy-mock.com/mock/5ea4dd56560b124432011ec8/vue-admin-system/tableList',
    method: 'get',
    param
  })
}
