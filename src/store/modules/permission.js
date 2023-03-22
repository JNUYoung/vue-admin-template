/**
 * 根据user类型来动态添加路由规则
 */

import { asyncRoutes, currencyRoutes } from '@/router'

const state = {
  routes: [],
  addRoutes: []
}

const mutations = {
  SET_ROUTES(state, payload) {
    state.routes = [...currencyRoutes, ...payload]
    state.addRoutes = payload
  }
}

// 根据user module的roles状态，遍历路由规则中的异步路由列表
// 将当前role具有权限的路由规则添加到arrNew中,最后将arrNew返回
// arrNew存储的即是当前role动态添加的路由规则
function forSearchArr(route, roles) {
  let arrNew = []
  for (let item of route) {
    let itemNew = { ...item } //解决浅拷贝共享同一内存地址
    if (roles.includes(itemNew.name)) {
      if (itemNew.children) {
        itemNew.children = forSearchArr(itemNew.children, roles)
      }
      arrNew.push(itemNew)
    }
  }
  return arrNew
}

const actions = {
  getAsyncRoutes({ commit, rootGetters }, roles) {
    return new Promise(resolve => {
      let routes = []
      if (rootGetters.userName === 'admin') {
        routes = asyncRoutes || ''
      } else {
        routes = forSearchArr(asyncRoutes, roles)
      }
      commit('SET_ROUTES', routes)
      resolve(routes)
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}