import {Module} from 'vuex'
import {IRootState} from '../index'
import {IRunningGame} from '../../../main/service/game'
import {ipcRenderer} from 'electron'


export interface IProcessState {
  processes: IRunningGame[]
}

const store: Module<IProcessState, IRootState> = {
  namespaced: true,
  state: {
    processes: ipcRenderer.sendSync('game:running'),
  },
  mutations: {
    startGame(state, {name, json, id}) {
      state.processes.push({
        name, json, id, launcher: null,
      })
    },
    onGameStop(state, {id}) {
      const index = state.processes.findIndex((value) => {
        if (value.id === id) return true
      })
      if (index === -1) return
      state.processes.splice(index, 1)
    }
  },
}

export default store
