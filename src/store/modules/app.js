/**
 * app全局状态的管理：
    - opened：侧边栏是否展开
    - msgIsShow：消息中心面板是否展开
    - showDriver：
 */
const state = {
  opened: sessionStorage.getItem('open')
    ? sessionStorage.getItem('open')
    : 'false',
  msgIsShow: false,
  showDriver: localStorage.getItem('driver')
    ? localStorage.getItem('driver')
    : 'yes'
}

const mutations = {
  SET_OPENED(state, payload) {
    state.opened = String(payload)
    sessionStorage.setItem('open', payload)
  },
  SET_MSGISOPEN(state) {
    state.msgIsShow = !state.msgIsShow
  },
  SET_DRIVER(state, payload) {
    state.showDriver = payload
    localStorage.setItem('driver', payload)
  }
}

export default {
  namespaced: true,
  state,
  mutations
}