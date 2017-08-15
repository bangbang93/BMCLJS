<template>
  <div class="bmcl-downloader">
    <el-table :data="queue" :row-class-name="tableRowClassName">
      <el-table-column label="名称" prop="title"></el-table-column>
      <el-table-column label="状态" prop="status"></el-table-column>
    </el-table>
  </div>
</template>
<script>
  export default {
    props: {
      tasks: {
        type: Array,
        required: true,
      }
    },
    data () {
      const queue = this.tasks.map((task) => ({
        title: task.title,
        url: task.url,
        path: task.path,
        status: 'queue',
        progress: 0,
      }));
      return {
        queue
      }
    },
    methods: {
      tableRowClassName (row) {
        return `row-${row.status}`;
      }
    }
  }
</script>
<style lang="scss">
  .bmcl-downloader {
    .row-success {
      background-color: #e3fcee;
    }
    .row-failed {
      background-color: #ffe2e2;
    }
    .row-downloading {
      background-color: #dbf0ff;
    }
  }
</style>
