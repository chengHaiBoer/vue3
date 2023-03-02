<template>
  <div class="main">
    <el-container class="main-content">
      <el-aside :width="isFold ? '60px' : '210px'">
        <main-menu :is-fold="isFold" />
      </el-aside>
      <el-container>
        <el-header height="50px">
          <main-header @fold-change="handleFoldChange" />
        </el-header>
        <el-main>
          <router-view v-slot="{ Component }">
            <keep-alive :max="10">
              <transition :duration="{ enter: 600, leave: 300 }"
                leave-active-class="animate__animated animate__fadeOutDown"
                enter-active-class="animate__animated animate__fadeInUp">
                <component :is="Component" />
              </transition>
            </keep-alive>
          </router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import MainMenu from '@/components/main-menu/main-menu.vue'
import MainHeader from '@/components/main-header/main-header.vue'
// import { h } from 'vue';
// const component = h(ViewComponent, assign({}, routeProps, attrs, {
//   onVnodeUnmounted,
//   ref: viewRef,
// }));
// return (
//   // pass the vnode to the slot as a prop.
//   // h and <component :is="..."> both accept vnodes
//   normalizeSlot(slots.default, { Component: component, route }) ||
//   component);

// 处理main-header中折叠的变化
const isFold = ref(false)
function handleFoldChange(flag: boolean) {
  isFold.value = flag
}
</script>

<style lang="less" scoped>
.main {
  height: 100%;
}

.main-content {
  height: 100%;

  .el-aside {
    overflow-x: hidden;
    overflow-y: auto;
    line-height: 200px;
    text-align: left;
    cursor: pointer;
    background-color: #001529;
    transition: width 0.3s ease;
  }

  .el-main {
    background-color: #f0f2f5;
  }
}
</style>
