/**
 * Created by bangbang93 on 2017/8/14.
 */
'use strict';
import Launcher from '../../main/launcher/launcher';
const { ipcMain } = require('electron');

export const start = async function (version) {
  // TODO inheritsFrom
  const launcher = new Launcher(version.versionPath, version.minecraftPath, {}, '/usr/bin/java', {
    json: version.json
  });
  const cp = await launcher.start();
  cp.stdout.pipe(process.stdout);
  cp.stderr.pipe(process.stderr);
  return launcher;
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
