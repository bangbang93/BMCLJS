<template>
  <div>
    <div class="game-selector">
      <el-col :span="6" v-for="version in versions" :key="version.name"  >
        <el-card class="game-versions">
          <div slot="header" class="version-name">
            {{ version.name }}
            <el-button class="button" size="small" type="primary" @click="onStart(version.name)">启动</el-button>
          </div>
          <card-body :version="version"></card-body>
        </el-card>
      </el-col>
    </div>
  </div>
</template>
<script>
  import ElCard from '../../../../node_modules/element-ui/packages/card/src/main'
  import ElButton from '../../../../node_modules/element-ui/packages/button/src/button'
  import ElCol from 'element-ui/packages/col/src/col'
  import CardBody from './card-body'
  export default {
    components: {
      CardBody,
      ElCol,
      ElButton,
      ElCard},
    name      : 'GameSelector',
    props     : {
      versions: Array,
    },
    methods   : {
      onStart (index) {
        this.$emit('select', index);
      }
    }
  };
</script>
<style scoped="" lang="scss">
  .game-selector {
    height: 100%;
    width: 100%;
  }
  .game-versions {
    float: left;
    display: inline;
    width: 90%;
    margin: 20px auto;
    height: 200px;
    .button {
      float: right;
    }
  }
</style>
