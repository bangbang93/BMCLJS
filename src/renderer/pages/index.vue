<template>
  <div class="container">
    <el-row>
      <el-col :span="22" :offset="1">
        <bmcl-running-card :pcb="pcb" v-for="pcb in running" :key="pcb.id"/>
        <div v-if="running.length === 0" style="text-align: center; width: 100%">并没有游戏在运行</div>
      </el-col>
    </el-row>
  </div>
</template>
<script lang="ts">
  export default {
    components: {
      bmclRunningCard: require('../components/game/bmcl-running-card.vue').default,
    },
    computed: {
      running () {
        return this.$store.state.process.processes
      }
    }
  }
</script>
<style scoped="" lang="scss">
  .container {
    padding-top: 10px;
  }
</style>
