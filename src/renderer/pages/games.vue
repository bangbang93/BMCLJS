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
        <game-selector :versions="vm.versions | version(vm.filter)" @select="onSelect"></game-selector>
      </el-col>
    </el-row>
  </div>
</template>
<script>
  import GameSelector from '../components/game/game-selector';
  import ElCol from 'element-ui/packages/col/src/col';
  import ElInput from '../../../node_modules/element-ui/packages/input/src/input';
  import * as GameService from '../../common/service/game';
  export default {
    components: {
      ElInput,
      ElCol,
      GameSelector
    },
    data () {
      return {
        vm: {
          defaultActive: '1',
          versions: [],
          selected: '',
          filter: '',
        }
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
      onSelect (index) {
        for (const version of this.vm.versions) {
          if (version.name === index) {
            alert(version.versionPath);
          }
        }
      },
      async refresh () {
        this.vm.versions = await GameService.refresh();
      }
    }
  };
</script>
<style scoped="" lang="scss">
  .bmcl-game-page {
    height: 100%;
    padding: 10px;
  }
  .bmcl-game-search {
    padding: 10px auto 10px;
  }
  .game-board {
    height: calc(100% - 46px);
    overflow: scroll;
  }
</style>
