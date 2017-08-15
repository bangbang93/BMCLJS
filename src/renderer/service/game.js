/**
 * Created by bangbang93 on 2017/8/15.
 */
'use strict';
import {ipcRenderer} from 'electron';

export const start = function (version) {
  return new Promise((resolve, reject) => {
    ipcRenderer.send('game:start', {version});
    ipcRenderer.once('game:started', (event, arg) => {
      switch (arg.status) {
        case 'success':
          console.log('running');
          break;
        case 'missing-library':
          // TODO missing library
          console.log(arg.missing);
          const err = new Error('missing-library');
          err.missing = arg.missing;
          reject(err);
          break;
        case 'error':
          alert(arg.error);
      }
      resolve();
    });
  })
}
