<template>
  <el-row class="bmcl-setting">
    <el-col :span="4" class="bmcl-setting">
      <el-menu mode="vertical" theme="light" class="bmcl-setting bmcl-setting-menu" defaultActive="game">
        <el-menu-item index="game">游戏</el-menu-item>
      </el-menu>
    </el-col>
    <el-col :span="20" class="bmcl-setting-container">
      <el-button type="primary" class="btn-save">保存</el-button>
      <div style="clear: both"></div>
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
  import ElButton from '../../../node_modules/element-ui/packages/button/src/button'
  export default {
    components: {
      ElButton,
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
      box-shadow: none;
      &:hover {
        box-shadow: 0 0 8px 0 rgba(232,237,250,.6), 0 2px 4px 0 rgba(232,237,250,.5);
        transition: 0.2s;
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
  .btn-save {
    float: right;
    margin-top: 20px;
    margin-right: 20px;
  }
</style>
