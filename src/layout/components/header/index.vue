<template>
  <div class="header">
    <!-- 头部左侧与sidebar对齐的logo区域 -->
    <div class="header_l">
      <a href="javascript:;" class="logoLink"><img src="./logo.png" alt="logo" />Admin Template</a>
    </div>
    <!-- 头部右侧与pageMain保持一致的区域 -->
    <div class="header_r">
      <!-- 折叠按钮 + 面包屑 -->
      <div class="headr_d1">
        <side-collapse class="sidecoll"></side-collapse>
        <bread-crumb class="bread"></bread-crumb>
      </div>
      <!-- 消息中心 + 全屏按钮 + 下拉菜单 -->
      <div class="headr_d2">
        <ul class="headrUl clearFixed">
          <li id="domMessage" title="消息中心">
            <el-badge is-dot @click.native.stop="toggleMsgShow">
              <i class="el-icon-message-solid iconFont"></i>
            </el-badge>
          </li>
          <li id="domFullScreen" title="全屏显示">
            <full-screen></full-screen>
          </li>
          <li id="domPersonal">
            <user-dropdown></user-dropdown>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import SideCollapse from '@/components/SideCollapse'
import BreadCrumb from '@/components/BreadCrumb'
import UserDropdown from '@/components/UserDropdown'
import FullScreen from '@/components/FullScreen'

export default {
  components: {
    SideCollapse,
    BreadCrumb,
    UserDropdown,
    FullScreen
  },
  methods: {
    toggleMsgShow() {
      this.$store.commit('app/SET_MSGISOPEN')    // state.msgIsShow = !state.msgIsShow
    }
  }
}
</script>