<template>
  <div id="app">
    <el-menu theme="dark" :default-active="vm.activeIndex" mode="horizontal" @select="onSelect" class="menu">

      <el-menu-item index="0" :route="{path: 'index'}">BMCL</el-menu-item>
      <el-menu-item index="1" :route="{path: 'game'}">游戏列表</el-menu-item>
      <el-menu-item index="2">设置</el-menu-item>
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
    margin-top: 60px;
    height: calc(100% - 60px);
  }
</style>
