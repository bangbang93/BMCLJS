<template>
  <el-row class="bmcl-setting">
    <el-col :span="4" class="bmcl-setting">
      <el-menu mode="vertical" theme="light" class="bmcl-setting bmcl-setting-menu" defaultActive="game">
        <el-menu-item index="game">游戏</el-menu-item>
      </el-menu>
    </el-col>
    <el-col :span="20" class="bmcl-setting-container">
      <el-card class="block" header="游戏">
        aa
      </el-card>
      <el-card class="block" header="游戏">
        aa
      </el-card>
      <el-card class="block" header="游戏">
        aa
      </el-card>
      <el-card class="block" header="游戏">
        aa
      </el-card>
      <el-card class="block" header="游戏">
        aa
      </el-card>
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
    .block {
      margin: 10px 10px 0 10px;
      border: #ccc solid 1px;
      border-radius: 4px;
      padding: 20px;
      &:hover {
        box-shadow: #ccc 2px 2px 2px 2px;
      }
    }
  }
  .bmcl-setting-menu {
    overflow: scroll;
  }
  .bmcl-setting-container {
    overflow: scroll;
    height: 100%;
  }
</style>
