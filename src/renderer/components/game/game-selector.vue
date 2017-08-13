<template>
  <div class="game-selector">
    <el-col :span="6" v-for="version in versions"  >
      <el-card class="game-versions">
        <div slot="header" class="version-name">
          {{ version.name }}
          <el-button class="button" size="small" type="primary">启动</el-button>
        </div>
        <div>
          <el-row>
            <el-col :span="12">
              <span>名称</span>
            </el-col>
            <el-col :span="12">
              <span> {{ version.name }}</span>
            </el-col>
          </el-row>
        </div>
      </el-card>
    </el-col>
  </div>
</template>
<script>
  import ElCard from '../../../../node_modules/element-ui/packages/card/src/main'
  import ElButton from '../../../../node_modules/element-ui/packages/button/src/button'
  import ElCol from 'element-ui/packages/col/src/col'
  export default {
    components: {
      ElCol,
      ElButton,
      ElCard},
    name      : 'GameSelector',
    props     : {
      versions: Array,
      selected: {
        type: String,
        required: false,
      }
    },
    methods   : {
      onSelect (index) {
        this.$emit('select', index);
        this.$emit('update:selected', index);
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
    .button {
      float: right;
    }
  }
</style>
