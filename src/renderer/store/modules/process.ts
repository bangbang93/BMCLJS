import {Module} from 'vuex'
import {IRootState} from '../index'
import {IRunningGame} from '../../../main/service/game'

export interface IProcessStore {
  processes: IRunningGame[]
}

const store: Module<IProcessStore, IRootState> = {
  namespaced: true,
  state: {
    processes: []
  },
  mutations: {

  }
}

export default store
