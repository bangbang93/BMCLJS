<template>
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
