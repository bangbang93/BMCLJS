<template>
  <div>
    <div class="game-selector">
      <el-col :span="6" v-for="version in versions" :key="version.name"  >
        <el-card class="game-versions">
          <div slot="header">
            <div class="bmcl-game-version-name">{{ version.name }}</div>
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
<style lang="scss">
  .game-selector {
    height: 100%;
    width: 100%;
  }
  .game-versions {
    float: left;
    display: inline;
    width: 90%;
    margin: 20px 5%;
    height: 200px;
    .button {
      float: right;
    }
    .el-card__header {
      background-color: #eee
    }
  }
  .bmcl-game-version-name {
    max-width: calc(100% - 50px);
    display: inline-block;
    line-height: 100%;
    vertical-align: middle;
    text-overflow: '...';
    white-space: nowrap;
    overflow: hidden;
  }
</style>
