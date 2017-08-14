<template>
  <el-row class="bmcl-setting">
    <el-col :span="4" class="bmcl-setting">
      <el-menu mode="vertical" theme="light" class="bmcl-setting bmcl-setting-menu" defaultActive="game" @select="onSelect">
        <el-menu-item :class="{'is-active': activeName === 'directory'}" index="directory">目录</el-menu-item>
        <el-menu-item :class="{'is-active': activeName === 'game2'}" index="game2">游戏2</el-menu-item>
        <el-menu-item :class="{'is-active': activeName === 'game3'}" index="game3">游戏3</el-menu-item>
        <el-menu-item :class="{'is-active': activeName === 'game4'}" index="game4">游戏4</el-menu-item>
        <el-menu-item :class="{'is-active': activeName === 'game5'}" index="game5">游戏5</el-menu-item>
      </el-menu>
    </el-col>
    <el-col :span="20" class="bmcl-setting-container">
      <el-button type="primary" class="btn-save">保存</el-button>
      <div style="clear: both"></div>
      <el-collapse v-model="activeName">
        <el-collapse-item name="directory" title="目录" id="directory">
          <el-table :data="tablePath" style="width: 100%" @selection-change="onPathSelect">
            <el-table-column type="selection" width="50"></el-table-column>
            <el-table-column prop="path" label="路径"></el-table-column>
          </el-table>
          <el-button-group  style="margin-top: 5px" >
            <el-button type="danger" size="small" @click="onPathDelete">删除</el-button>
            <el-button type="success" size="small" @click="onPathAdd">添加</el-button>
          </el-button-group>
        </el-collapse-item>
        <el-collapse-item name="game2" title="游戏2" id="game2">
          aa
        </el-collapse-item>
        <el-collapse-item name="game3" title="游戏3" id="game3">
          aa
        </el-collapse-item>
        <el-collapse-item name="game4" title="游戏4" id="game4">
          aa
        </el-collapse-item>
        <el-collapse-item name="game5" title="游戏5" id="game5">
          aa
        </el-collapse-item>
      </el-collapse>
    </el-col>
  </el-row>
</template>
<script>
  import * as ConfigService from '../../common/service/config';
  export default {
    data () {
      return {
        activeName: 'directory',
        directory: {
          paths: [],
          selection: [],
        },
      };
    },
    mounted () {
      this.initData();
    },
    computed: {
      tablePath () {
        return this.directory.paths.map((path) => ({path}));
      }
    },
    methods: {
      async initData () {
        this.directory.paths = await ConfigService.getPaths();
      },
      onSelect (index) {
        this.activeName = index;
        const container = document.querySelector('.bmcl-setting-container');
        const target = document.getElementById(index).offsetTop;
        const diff = container.scrollTop - target;
        const step = diff / 10;
        let last;
        function animate () {
          container.scrollTop -= step;
          if (container.scrollTop === last) return;
          last = container.scrollTop;
          requestAnimationFrame(animate);
        }
        animate();
      },
      async onPathDelete () {
        const promise = this.directory.selection.map((selection) => ConfigService.delPath(selection.path));
        await Promise.all(promise);
        await this.initData();
      },
      onPathSelect (selection) {
        this.directory.selection = selection;
      },
      async onPathAdd () {
        const dialog = require('electron').remote.dialog;
        const dir = dialog.showOpenDialog({
          properties: ['openDirectory']
        });
        if (!dir || dir.length === 0) return;
        await ConfigService.addPath(dir[0]);
        await this.initData();
      }
    }
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
    margin-top: 10px;
    margin-right: 20px;
    margin-bottom: 10px;
  }
  .bmcl-setting-item {
    transition: height 0.2s;
  }
</style>
