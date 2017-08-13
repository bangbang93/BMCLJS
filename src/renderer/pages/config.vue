<template>
  <el-row class="bmcl-setting">
    <el-col :span="4" class="bmcl-setting">
      <el-menu mode="vertical" theme="light" class="bmcl-setting bmcl-setting-menu">
        <el-menu-item index="0">游戏</el-menu-item>
      </el-menu>
    </el-col>
  </el-row>
</template>
<script>
  import ElCol from 'element-ui/packages/col/src/col'
  import ElMenu from '../../../node_modules/element-ui/packages/menu/src/menu'
  import ElMenuItem from '../../../node_modules/element-ui/packages/menu/src/menu-item'
  export default {
    components: {
      ElMenuItem,
      ElMenu,
      ElCol}

  }
</script>
<style scoped="" lang="scss">
  .bmcl-setting {
    height: 100%;
  }
  .bmcl-setting-menu {
    overflow: scroll;
  }
</style>
