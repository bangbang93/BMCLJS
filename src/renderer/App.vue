<template>
  <div id="app">
    <el-menu theme="dark" :default-active="vm.activeIndex" mode="horizontal" @select="onSelect" class="menu">
      <el-menu-item index="1">游戏列表</el-menu-item>
      <el-menu-item index="2">设置</el-menu-item>
    </el-menu>
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'bmcljs',
    data () {
      return {
        vm: {
          activeIndex: 1,
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
    padding-left: 20px;
  }
</style>
