const getters = {
  // user module state
  token: state => state.user.token,
  userName: state => state.user.userName,
  roles: state => state.user.roles,
  introduce: state => state.user.introduce,
  // permission module state
  routes: state => state.permission.routes,
  addRoutes: state => state.permission.addRoutes,
  // app module state
  opened: state => {
    if (state.app.opened === 'false') {
      return false
    } else if (state.app.opened === 'true') {
      return true
    }
  },
  msgIsShow: state => state.app.msgIsShow,
  showDriver: state => state.app.showDriver
}

export default getters