import $axios from './index'

// dashboard组件的数据请求
export function getCardsData() {
  const url = '/getCardsData'
  return $axios.get(url)
}

export function getLineData() {
  const url = '/getLineData'
  return $axios.get(url)
}

export function getTableData() {
  const url = '/getTableList'
  return $axios.get(url)
}

export function getBarData() {
  const url = '/getBarData'
  return $axios.get(url)
}