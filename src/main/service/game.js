/**
 * Created by bangbang93 on 2017/8/14.
 */
'use strict';
import Launcher from '../launcher/launcher';
const { ipcMain } = require('electron');

const running = [];

export const start = async function (version) {
  // TODO inheritsFrom
  const launcher = new Launcher(version.versionPath, version.minecraftPath, {}, '/usr/bin/java', {
    json: version.json
  });
  const p = {
    version: version,
    launcher: launcher,
  };
  running.push(p);
  const cp = await launcher.start();
  cp.stdout.pipe(process.stdout);
  cp.stderr.pipe(process.stderr);
  const index = running.indexOf(p);
  running[index].process = cp;
  cp.on('exit', () => {
    const index = running.indexOf(p);
    running.splice(index, 1);
  })
  return launcher;
}

export function getRunning () {
  return running;
}

ipcMain.on('game:start', async (event, arg) => {
  console.log('game:start');
  try {
    await start(arg.version);
    event.sender.send('game:started', {
      status: 'success',
    });
  } catch (e) {
    switch (e.message) {
      case 'missing library':
        event.sender.send('game:started', {
          status: 'missing-library',
          missing: e.missing
        });
        break;
      default:
        console.error(e);
        event.sender.send('game:started', {
          status: 'error',
          error: e.message,
        });
    }
  }
})
ipcMain.on('game:running', (event) => {
  event.returnValue = running.map((p) => ({
    version: p.version,
    launcher: p.launcher,
  }));
});
