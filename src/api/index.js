import axios from 'axios'
import Qs from 'qs'  // url参数转换
import store from '@/store'
import router from '@/router'
import Vue from 'vue'
import { Loading, Message } from 'element-ui' // 引用element-ui的加载和消息提示组件

// 创建axios实例
const $axios = axios.create({
  // 设置超时时间
  timeout: 30000,
  // 基础url，会在请求url中自动添加前置链接
  // https://www.fastmock.site/mock/e876fd174751b3c01365da9911f2ff19/admin
  baseURL: process.env.VUE_APP_BASE_API
})

// 在每个组件中可以直接使用this.$http()来发送axios请求
Vue.prototype.$http = axios // 并发请求，在vue的原型对象上设置全局变量，从而可以在每个vue实例中访问

// 在全局请求和响应拦截器中添加请求状态
let loading = null



// 请求拦截器
$axios.interceptors.request.use(
  // 在发送请求之前做些什么
  config => {
    loading = Loading.service({ text: '拼命加载中' })  // 通过服务的形式调用element的loading组件【全局单例模式】
    const token = store.getters.token
    if (token) {
      config.headers.Authorization = token // 请求头部添加token
    }
    return config
  },
  // 对请求错误做些什么
  error => {
    return Promise.reject(error)
  }
)


// 响应拦截器
$axios.interceptors.response.use(
  // 对响应数据做些什么，2xx状态码
  response => {
    if (loading) {
      loading.close()  // 请求成功后关闭loading组件
    }
    const code = response.status
    if ((code >= 200 && code < 300) || code === 304) {
      return Promise.resolve(response.data)
    } else {
      return Promise.reject(response)
    }
  },
  // 对响应错误做些什么，非2xx状态码
  error => {
    if (loading) {
      loading.close()
    }
    console.log(error)
    if (error.response) {
      switch (error.response.status) {
        case 401:
          // 返回401，表示用户没有访问权限，需要进行身份认证，清除token信息并跳转到登陆页面
          store.commit('DEL_TOKEN')
          router.replace({
            path: '/login',
            query: {
              redirect: router.currentRoute.fullPath
            }
          })
          break
        case 404:
          Message.error('网络请求不存在')
          break
        default:
          Message.error(error.response.data.message)
      }
    } else {
      // 请求超时或者网络有问题
      if (error.message.includes('timeout')) {
        Message.error('请求超时！请检查网络是否正常')
      } else {
        Message.error('请求失败，请检查网络是否已连接')
      }
    }
    return Promise.reject(error)
  }
)


// get，post请求方法
export default {
  post(url, data) {
    return $axios({
      method: 'post',
      url,
      data: Qs.stringify(data),
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
      }
    })
  },
  get(url, params) {
    return $axios({
      method: 'get',
      url,
      params
    })
  }
}