<template>
  <el-row class="bmcl-setting">
    <el-col :span="4" class="bmcl-setting">
      <el-menu mode="vertical" theme="light" class="bmcl-setting bmcl-setting-menu" defaultActive="game" @select="onSelect">
        <el-menu-item :class="{'is-active': activeName === config.index}" :index="config.index" v-for="config in configs" :key="config.index">
          {{config.title}}
        </el-menu-item>
      </el-menu>
    </el-col>
    <el-col :span="20" class="bmcl-setting-container">
      <el-collapse v-model="activeName" :accordion="true">
        <el-collapse-item :name="configs[0].index" :title="configs[0].title" :id="configs[0].index">
          <el-table :data="tablePath" style="width: 100%" @selection-change="onPathSelect">
            <el-table-column type="selection" width="50"></el-table-column>
            <el-table-column prop="path" label="路径"></el-table-column>
          </el-table>
          <el-button-group style="margin-top: 5px" >
            <el-button type="danger" size="small" @click="onPathDelete">删除</el-button>
            <el-button type="success" size="small" @click="onPathAdd">添加</el-button>
          </el-button-group>
        </el-collapse-item>
        <el-collapse-item :name="configs[1].index" :title="configs[1].title" :id="configs[1].index">
          <el-radio-group v-model="download.mirror" @change="onMirrorChange">
            <el-radio label="bmclapi" name="mirror">BMCLAPI</el-radio>
            <el-radio label="official" name="mirror">官方源</el-radio>
          </el-radio-group>
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
      <el-button type="primary" class="btn-save" @click="onSave">保存</el-button>
      <div style="clear: both"></div>
    </el-col>
  </el-row>
</template>
<script>
  import * as ConfigService from '../../common/service/setting';
  export default {
    data () {
      return {
        activeName: 'directory',
        configs: [
          {
            title: '目录',
            index: 'directory',
          }, {
            title: '下载',
            index: 'download',
          }
        ],
        directory: {
          paths: [],
          selection: [],
        },
        download: {
          mirror: 'bmclapi'
        },
        java: {
          jres: [],
        }
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
        this.download.mirror = await ConfigService.getSetting('mirror');
      },
      onSave () {
        console.log(this);
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
      onMirrorChange (label) {
        return ConfigService.setSetting('mirror', label);
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
