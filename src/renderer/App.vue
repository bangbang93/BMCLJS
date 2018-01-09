<template>
  <div id="app">
    <el-menu :default-active="activeIndex" mode="horizontal" @select="onSelect" class="menu" :router="true">
      <el-menu-item :index="index + ''" :route="menu.route" v-for="(menu, index) in menuItems" :key="index">{{menu.title}}</el-menu-item>
    </el-menu>
    <transition>
      <router-view class="container"/>
    </transition>
  </div>
</template>

<script>
  export default {
    name: 'bmcljs',
    data () {
      return {
        activeIndex: '0',
        menuItems: [{
          route: {name: 'index'},
          title: 'BMCL',
        }, {
          route: {name: 'game'},
          title: '游戏列表',
        }, {
          route: {name: 'config'},
          title: '设置',
        }, {
          route: {name: 'download'},
          title: '下载',
        }]
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
