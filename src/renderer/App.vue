<template>
  <div id="app">
    <el-menu theme="dark" :default-active="vm.activeIndex" mode="horizontal" @select="onSelect" class="menu" :router="true">

      <el-menu-item index="0" :route="{name: 'game'}">BMCL</el-menu-item>
      <el-menu-item index="1" :route="{name: 'game'}">游戏列表</el-menu-item>
      <el-menu-item index="2" :route="{name: 'config'}">设置</el-menu-item>
    </el-menu>
    <router-view class="container"></router-view>
  </div>
</template>

<script>
  export default {
    name: 'bmcljs',
    data () {
      return {
        vm: {
          activeIndex: '1',
        },
      };
    },
    methods: {
      onSelect (index, path) {
        console.log(index, path);
      },
    },
  };
</script>

<style scoped="" lang="scss">
  .menu {
    padding-left: 50px;
    border-top-left-radius: 0;
    border-top-right-radius: 0;
    position: fixed;
    top: 0;
    z-index: 999999;
    width: 100%;
  }
  #app,
  .container {
    height: 100%;
  }
</style>
