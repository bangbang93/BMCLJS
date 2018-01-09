<template>
  <div>
    <el-row>
      <el-col :span="4">
        <span>名称</span>
      </el-col>
      <el-col :span=20>
        <span> {{ version.name }}</span>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="4">
        <span>路径</span>
      </el-col>
      <el-col :span="20">
        <span> {{ version.versionPath }}</span>
      </el-col>
    </el-row>
  </div>
</template>
<script>
  export default {
    name: 'cardBody',
    props: {
      version: {
        type: Object,
        required: true,
      }
    }
  }
</script>
<style scoped="" lang="scss">
  span {
    font-size: small;
  }
</style>
