<template>
  <div class="container">
    <el-row>
      <el-col :span="22" :offset="1">
        <bmcl-running-card :pcb="pcb" v-for="(pcb, index) in running" :key="index"></bmcl-running-card>
      </el-col>
    </el-row>
  </div>
</template>
<script>
  const ipcRenderer = require('electron').ipcRenderer;
  console.log(ipcRenderer.sendSync('game:running'));
  export default {
    components: {
      bmclRunningCard: require('../components/game/bmcl-running-card.vue').default,
    },
    data () {
      return {
        running: [{
          version: {
            name: '1.7.10',
          },
          launcher: {},
          process: {},
        }]
      }
    }
  }
</script>
<style scoped="" lang="scss">
  .container {
    padding-top: 10px;
  }
</style>
