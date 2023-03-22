const title = 'vue-admin-webapp'

/**
 * 根据路由变化,设置document的title属性,通过网页标题来展示当前位于哪个路由或页面,优化用户使用体验
 */

const getTitle = function(til) {
  let allTitle = til + '-' + title
  return allTitle
}
export default getTitle