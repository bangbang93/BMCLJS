<template>
  <el-menu mode="vertical" theme="light" class="game-selector game-versions" @select="onSelect">
    <el-menu-item :index="version.name" v-for="version in versions">{{version.name}}</el-menu-item>
  </el-menu>
</template>
<script>
  export default {
    name: 'GameSelector',
    props: {
      versions: Array,
      selected: {
        type: String,
        required: false,
      }
    },
    methods: {
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
  }
  .game-versions {
    overflow: scroll;
  }
</style>
