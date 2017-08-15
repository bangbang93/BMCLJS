<template>
  <div class="bmcl-game-page ">
    <el-row class="bmcl-game-search">
      <el-col :span="17" :offset="2">
        <el-input v-model="vm.filter" placeholder="搜索"></el-input>
      </el-col>
      <el-col :span="4" :offset="1">
        <el-button class="btn-refresh" @click="refresh" type="primary">刷新</el-button>
      </el-col>
    </el-row>
    <el-row class="game-board" >
      <el-col :span="24">
        <game-selector :versions="vm.versions | version(vm.filter)" @select="onSelect" :starting="starting"></game-selector>
      </el-col>
    </el-row>
  </div>
</template>
<script>
  import GameSelector from '../components/game/game-selector';
  import * as CommonGameService from '../../common/service/game';
  import * as RendererGameService from '../service/game';

  export default {
    components: {
      GameSelector
    },
    data () {
      return {
        vm: {
          defaultActive: '1',
          versions: [],
          selected: '',
          filter: '',
        },
        starting: false,
      };
    },
    filters: {
      version (value, keyword) {
        return value.filter((version) => version.name.indexOf(keyword) >= 0);
      }
    },
    mounted () {
      this.refresh();
    },
    methods: {
      async onSelect (index) {
        this.starting = true;
        for (const version of this.vm.versions) {
          if (version.name === index) {
            await start(version);
            this.starting = false;
            break;
          }
        }
      },
      async refresh () {
        this.vm.versions = await CommonGameService.refresh();
      }
    }
  };

  async function start (version) {
    try {
      await RendererGameService.start(version);
    } catch (e) {
      if (e.message === 'missing-library') {
        console.error(e.missing);
      }
    }
  }
</script>
<style scoped="" lang="scss">
  .bmcl-game-page {
    height: 100%;
    padding: 10px;
  }
  .bmcl-game-search {
    padding-bottom: 10px;
  }
  .game-board {
    height: calc(100% - 46px);
    overflow: scroll;
  }
</style>
