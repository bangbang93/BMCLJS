<template>
  <el-card>
    name: {{pcb.version.name}}
  </el-card>
</template>
<script>
  export default {
    name: 'bmclRunningCard',
    props: {
      pcb: {
        type: Object,
        required: true,
      }
    }
  }
</script>
