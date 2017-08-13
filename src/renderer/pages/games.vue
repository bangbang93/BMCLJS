<template>
    <el-row class="game-selector">
        <el-col :span="17" :offset="2">
          <el-input v-model="vm.filter" placeholder="搜索"></el-input>
        </el-col>
        <el-col :span="4" :offset="1">
          <el-button class="btn-refresh" @click="refresh" type="primary">刷新</el-button>
        </el-col>
        <el-col :span="24" class="game-selector">
          <game-selector :versions="vm.versions | version(vm.filter)" @select="onSelect"></game-selector>
        </el-col>
    </el-row>
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
        console.log(index);
      },
      async refresh () {
//        this.vm.versions = new Array(20).fill({name: '1.12'}).map((version, index) => ({name: `1.12(${index})`}));
        this.vm.versions = await GameService.refresh();
      }
    }
  };
</script>
<style scoped="" lang="scss">
  .game-selector {
    height: 100%;
    padding: 10px;
  }
  .game-versions {
    overflow: scroll;
  }
</style>
