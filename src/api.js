import axios from 'axios'

export function getTableList (param) {
  return axios({
    url: '../../static/mock-data/table-list.json',
    method: 'get',
    param
  })
}
