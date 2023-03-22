<template>
  <div class="sideCollapse" id="domColapse">
    <!-- 通过vuex管理的opend全局状态,来动态切换图标元素i的类名 -->
    <i :class="{ 'el-icon-s-unfold': opened, 'el-icon-s-fold': !opened }" @click="toggleOpen()"></i>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters(['opened'])
  },
  methods: {
    toggleOpen() {
      this.$store.commit('app/SET_OPENED', !this.opened)
    }
  }
}
</script>
<style lang="scss" scoped>
.sideCollapse i {
  font-size: 18px;
  color: #363f44;
  cursor: pointer;
}
</style>
