<template>
    <el-row class="game-selector">
        <el-col :span="24" class="game-selector">
          <game-selector :versions="vm.versions" @select="onSelect" :selected.sync="vm.selected"></game-selector>
        </el-col>
    </el-row>
</template>
<script>
  import GameSelector from '../components/game/game-selector';
  import ElCol from 'element-ui/packages/col/src/col';
  export default {
    components: {
      ElCol,
      GameSelector},
    data () {
      return {
        vm: {
          defaultActive: '1',
          versions: new Array(20).fill({name: '1.12'}).map((version, index) => ({name: `1.12(${index})`})),
          selected: '',
        }
      };
    },
    methods: {
      onSelect (index) {
        console.log(index);
      }
    }
  };
</script>
<style scoped="" lang="scss">
  .game-selector {
    height: 100%;
  }
  .game-versions {
    overflow: scroll;
  }
</style>
