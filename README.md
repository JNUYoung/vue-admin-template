# Vue-Admin-Template


## 一、简介

使用vue2和element-ui构建的SPA后台管理系统应用。

## 二、项目结构

```shell
npm install mddir -g

// cd到项目文件夹
// mddir命令在项目文件夹目录生成对应的文件结构树的md输出
```

> |-- Project
>     |-- .browserslistrc         # 指定项目的目标浏览器的范围，从而供其它插件确定需要转译的js特性和css浏览器前缀
>     |-- .env.development  # 开发环境下的配置文件 ( npm run serve )
>     |-- .env.production      # 生产环境下的配置文件 （ npm run build ）
>     |-- .eslintrc.js                # eslint配置文件
>     |-- .gitignore
>     |-- babel.config.js
>     |-- directoryList.md
>     |-- package-lock.json
>     |-- package.json
>     |-- postcss.config.js
>     |-- README.md
>     |-- vue.config.js           # vue-cli配置文件
>     |-- public
>     |   |-- favicon.ico
>     |   |-- index.html
>     |-- src
>         |-- App.vue      	 # 根组件
>         |-- main.js   		 # 项目入口文件
>         |-- api                   # axios请求文件
>         |-- assets              # 静态资源
>         |-- components   # 公共组件
>         |-- layout             # 布局组件
>         |-- mixins            # 混入
>         |-- plugins           # 插件
>         |-- router            # 项目路由配置
>         |-- store             # 项目vuex
>         |-- style              # 项目样式
>         |-- utils
>         |-- vendor
>         |-- views            # 路由的pages

## 三、路由配置

1.路由类型：

- currencyRoutes 通用路由[无需权限]
- asyncRoutes 动态路由[权限验证通过后]

2.路由元信息：

- title: 设置侧边栏标题以及面包屑组件中的导航标题
- icon：设置侧边栏图表
- noCache：设置为true时，不缓存该路由对应的组件

路由属性hidden，设置为true时，该路由对应的组件名称不在左侧侧边栏中展示。

3.使用全局前置路由守卫进行权限验证并添加动态路由：

![router](https://github.com/JNUYoung/vue-admin-template/blob/main/images/router.png)

常用路由守卫：

- 全局前置守卫 router.beforeEach()
- 全局后置钩子 router.afterEach()
- 路由独享守卫 beforeEnter()

4.路由懒加载：

当路由被访问时才加载对应组件。

```js
component: () => import('component_path')
```



## 四、全局状态管理 Vuex

1.app - 负责应用级的全局状态的管理

- opend：侧边栏sidebar的展开/折叠状态
- msgIsShow：消息中心的展开/折叠状态
- showDriver：首次进入系统时是否自动进行使用引导

2.permission - 用户权限的管理

【根据permission的全局状态生成侧边栏的路由导航】

- routes：基本路由权限列表
- addRoutes：根据当前用户权限向后台请求动态添加的路由权限列表

3.user - 用户登录信息的状态管理

- token：服务端返回的token信息，存入localStorage
- userName：服务端返回的用户名信息
- roles：服务端返回的路由权限
- introduce：服务端返回的用户的个性签名信息



## 五、Layout布局

![image-20230321182535898](https://github.com/JNUYoung/vue-admin-template/blob/main/images/image-20230321182535898.png)

- layout/index.vue：布局组件
  - header组件：固定定位到页面顶部
  - sidebar组件：固定定位到页面左侧
  - pageMain组件：宽度自适应
  - notificat-bar组件：固定定位到页面右侧
- 通过给notificat-bar组件包裹一个transition内置组件，实现其展示/隐藏时的动画效果；
- 通过vuex的app模块的opend状态控制sidebar组件的展开/折叠，给app动态添加和删除closeBar的className
- 通过vuex的app模块的msgIsShow状态，结合v-show控制消息中心组件的显示和隐藏；

## 六、相关组件

1.src/components/SideCollapse/index.vue 侧边栏开关按钮组件

- toggleOpen事件：commit一个mutation，修改全局状态的opend状态

  ```js
  methods: {
      toggleOpen() {
        this.$store.commit('app/SET_OPENED', !this.opened)
      }
  }
  ```

- 通过class类名的动态绑定，在侧边栏显示和隐藏的时候修改图标的类名以切换图标；

  ```html
  <i :class="{ 'el-icon-s-unfold': opened, 'el-icon-s-fold': !opened }" @click="toggleOpen()"></i>
  ```

2.src/components/BreadCrumb/index.vue 导航面包屑组件

- 使用element-ui的面包屑组件实现。
- 面包屑组件中通过watch来监听路由的变化，通过监听$route的变化，通过$route.matched中的当前的路由记录，通过数组的filter方法过滤出具有meta属性且meta对象具有title属性的路由记录，记录到breadList数组中。
- 面包屑组件中通过v-for遍历breadList数组生成面包屑导航。

- 如果breadList第一项不是首页，那么需要在头部插入{path: '/', meta: {title: '首页'}}，保证面包屑从首页开始导航。

```js
watch: {
$route: {
  handler(route) {
    let allList = route.matched.filter(item => {
      if (item.meta && item.meta.title) {
        if (item.redirect) {
          item.path = ''
        }
        return true
      }
    })
    if (allList[0].path !== '/' && allList[0].path !== '/dashbord') {
      allList.unshift({ path: '/', meta: { title: '首页' } })
    }
    this.breadList = allList
  },
  immediate: true
}
}
```

3.src/components/FullScreen/index.vue  全屏显示组件

- 利用screenfull库实现，点击按钮后执行toggleFull函数

```js
toggle() {
    if (!screenful.enabled) { // screenful不可用 }
    else {
        screenful.toggle()
    }
}
```

4.src/components/UserDropdown/index.vue  用户下拉菜单组件

- 利用element-ui的Dropdown组件
- 点击“退出登录”按钮时，向vuex派发loginOut的action，清除掉本地存储中的所有登录token信息，并且重新刷新路由权限，重定向到登录页面；

5.src/components/NotificatBar/index.vue 消息中心组件

- 点击按钮时，通过commit SET_MSGISOPEN 这个mutation修改vuex全局状态中的msgIsShow状态，来控制消息中心的展示和隐藏

- 消息中心展开时，点击页面其他部分使得消息中心隐藏

  点击header中组件按钮时，事件会发生冒泡，使用.stop修饰符阻止冒泡。

  ```js
  methods: {
  toggleMsgShow(e) {
    if (this.$refs.notificatBarCon && !this.$refs.notificatBarCon.contains(e.target)) {
      if (this.$store.getters.msgIsShow === true) {
        this.$store.commit('app/SET_MSGISOPEN')
      }
    }
  }
  },
  created() {
  document.addEventListener('click', this.toggleMsgShow)
  },
  beforeDestroy() {
  document.removeEventListener('click', this.toggleMsgShow)
  }
  ```

6.layout/components/sideBar/index.vue  侧边栏组件

- 侧边栏组件中各个item的渲染，基于vuex的permission模块的routes状态来渲染。通过将vuex的状态映射为计算属性，实现根据用户的路由权限来展示左侧导航栏。

7.layout/components/PageMain/index.vue   pageMain内容区组件

- 利用transition组件包裹渲染的路由组件。点击左侧导航栏切换组件时，起到平滑的动画效果；

- 利用keep-alive组件，基于当前路由meta信息中的noCache组件来决定是否需要对组件状态进行缓存；

  ```html
  <template>
    <div class="pageMain">
      <transition name="fade-page" mode="out-in">
        <keep-alive>
          <router-view v-if="!$route.meta.noCache"></router-view>
        </keep-alive>
        <router-view v-if="$route.meta.noCache"></router-view>
      </transition>
    </div>
  </template>
  ```

8.dashboard组件

- 根据用户是管理员还是普通用户，来展示不同的dashboard组件；

9.slideVerify 滑动验证组件

![image-20230322150908168](https://github.com/JNUYoung/vue-admin-template/blob/main/images/image-20230322150908168.png)

1. 通过canvas元素绘制背景图像，以及拼图图块；
2. 监听slider-mask-item的相应事件：
   - mousedown事件：记录滑块初始的坐标，originX，originY
   - mousemove事件：更新滑块移动时的x坐标和y坐标，同时更新slider-mask的样式，更新拼图图块的定位样式；
   - mouseup事件：鼠标弹起事件，此时调用verify方法验证是否验证成功，触发相应的事件以及更新样式；
3. 验证事件 verify：
   - 初始时，记录被挖空的目标区域的x坐标，block_x
   - mousedown事件触发时，记录拼图图块此时的left值，将left与block_x进行比较，判断误差是否在给定的范围内，若在范围内，则spliced置为true；
   - 验证是否为人工验证而非机器验证；mousemove过程中记录鼠标移动时的y坐标数组trail，计算trail数组元素的平均值和标准差是否相等，若相等则表示为机器验证而非人类的手工拖动验证，此时将TuringTest置为false，验证失败；

10.\src\components\Upload\index.vue 图片上传组件

需求：

1. 点击上传按钮时选择本地图片上传；
2. 上传成功的图片显示在上传框内进行预览；
3. 要求上传时只能上传图片类型；

实现：

1. 利用input元素，设置type为file，accept属性为字符串属性，定义了该input元素接收的文件类型，以逗号为分隔的唯一文件类型说明符；
2. 使用input元素的HTMLInputElement.files属性来获取上传的文件；
3. 监听input元素的change事件，将上传的图片文件传递给window.URL.createObjectURL()方法，将该方法生成的url赋值给img元素的src属性，同时让img元素的v-if绑定变为true；
4. 通过file的type属性，校验其是否在accept字符串当中；

```js
uploadImg() {
  let file = this.$refs.fileLoad.files[0]
  let size = file.size / 1024 / 1024    // 1MB = 1024 * 1024 Bytes
  if (!this.accept.includes(file.type.toLowerCase())) {
    this.$message.error('图片格式不正确!')
    return false
  }
  if (size > 2) {
    this.$message.error('图片大小不能超过2MB!')
    return false
  }
  this.imgSrc = this.createUrl(file)
  this.imgShow = true
  this.$message.success('上传成功！')
}
```



## 七、records

1.axios封装

创建.env.production和.env.development，既生产环境的配置和开发环境的配置文件。

```js
ENV = 'production'
# base api
VUE_APP_BASE_API = 'https://www.easy-mock.com/mock/5cee951f11690b5261b75566/admin'
```

其中以VUE_APP_开头的变量会被webpack.DefinePlugin嵌入到应用中，可以直接使用process.env.VUE_APP_BASE_API获取。

通过创建api文件夹将所有接口都集中在这个文件夹中，根据不同的业务创建不同js文件，来更好的划分接口的功能。

2.使用mixins

如果多个组件都用到一个或多个方法，可以不用每次都粘贴复制，通过将这些方法封装在一个js文件中,当我的某个组件需要调用这个方法时，配置组件的mixins属性即可：

```js
import aMixin from '@/mixins/a-mixin'
export default {
  name: 'page1',
  mixins: [newsMixin]  //调用mixins属性，将aMixin这个模块的数据及方法等都添加进这个组建吧
}
```

3.Object.freeze()方法

- 当组件有一个很大的数组或者对象数据确认不会改变后，可以使用Object.freeze()方法将其冻结，让响应式系统不再追踪数据的变化，提高应用性能。

4.使用require.context函数自动导入模块

- 主要用来实现自动化导入模块,在前端工程中,如果遇到从一个文件夹引入很多模块的情况,可以使用这个api,它会遍历文件夹中的指定文件,然后自动导入,使得不需要每次显式的调用import导入模块。

```js
// 自动化导入vuex的子模块
const files = require.context('./modules', false, /\.js$/)
let modules = {}
files.keys().forEach(key => {
  let name = path.basename(key, '.js')
  modules[name] = files(key).default || files(key)
})

const store = new Vuex.Store({
  modules,
  getters
})
```

5.利用cdn引入

- 对于一些不常变化的模块或库，如vue、vuex、vueRouter、echarts等，可以让webpack不对其打包，通过cdn引入的方式使用。减少项目打包体积，减少服务器带宽。
- 修改vue.config.js文件，添加externals

```js
const cdn = {
	css: [
   'https://unpkg.com/element-ui/lib/theme-chalk/index.css'
	],
	js: [
    'https://unpkg.com/vue/2.5.22/vue.min.js',
    'https://unpkg.com/element-ui/lib/index.js',
    'https://unpkg.com/vuex/3.1.0/vuex.min.js'
	]
}

# 不打包vue、element-ui、vuex
module.exports = {
	externals: {
		vue: 'Vue',
  	'element-ui':'ELEMENT',
  	vuex: 'Vuex'
  },
  chainWebpack: config => {
  	config.plugin('html')
        .tap(args => {
          args[0].cdn = cdn
          return args
        })
  }
}
```

