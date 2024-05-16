import { Random } from 'mockjs'
import { resultPageSuccess } from '../_util'

const getPhone = () => {
  const prefixList = [135, 136, 137, 138, 139, 155, 158, 183, 185, 189]
  const randomNum = Math.floor(Math.random() * 10)
  const phoneStr = prefixList[randomNum] + Math.random().toString().slice(-8)
  return Number(phoneStr)
}

const getEducation = () => {
  const educationList = ['小学', '初中', '高中', '专科', '本科', '研究生']
  const randomNum = Math.floor(Math.random() * educationList.length)
  return educationList[randomNum]
}

const getMarried = () => {
  return Math.floor(Math.random() * 4)
}

const getHobby = () => {
  const list= []
  const hobbyList = ['羽毛球', '乒乓球', '篮球', '排球', '网球', '游泳', '滑雪', '跳高', '滑翔', '潜水']
  const len = [3, 4][Number(Random.boolean())]
  for (let key = 0; key < len; key++) {
    const randomNum = Math.floor(Math.random() * 10)
    list.push(hobbyList[randomNum])
  }
  return list
}

const genList = () => {
  const list= []
  for (let index = 0; index < 100; index++) {
    const num = index < 10 ? '0' + index : index
    list.push({
      id: Number(`10${num}`) + 1,
      name: Random.cname(),
      sex: ['男', '女'][Number(Random.boolean())],
      phone: getPhone(),
      education: getEducation(),
      married: getMarried(),
      forbid: Random.boolean(),
      hobby: getHobby()
    })
  }
  return list
}

export default [
  {
    url: '/api/table/getTableList',
    timeout: 200,
    method: 'get',
    response: ({ query }) => {
      const { current = 1, pageSize = 10 } = query
      return resultPageSuccess(current, pageSize, genList())
    }
  }
]
