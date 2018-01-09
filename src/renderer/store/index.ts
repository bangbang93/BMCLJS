import Vue from 'vue';
import Vuex from 'vuex';

import modules from './modules/index';
import {ipcRenderer} from 'electron'
import {IProcessState} from './modules/process'


Vue.use(Vuex);

export interface IRootState {
  process: IProcessState
}

const store = new Vuex.Store<IRootState>({
  modules,
  strict: process.env.NODE_ENV !== 'production'
});

export default store

ipcRenderer.on('game:exit', (event, {id}) => {
  console.log('game:exit')
  store.commit('process/onGameStop', {id})
})
