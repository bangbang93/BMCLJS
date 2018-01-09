/**
 * Created by bangbang93 on 2017/8/14.
 */


'use strict';
import Launcher from '../launcher/launcher';
import { ipcMain } from 'electron';

export interface IRunningGame {
  name: string,
  json: any,
  launcher: Launcher,
  id: GameIdentify
}

export interface IStartArguments {
  name: string,
  versionPath: string,
  minecraftPath: string,
  json: any,
}

class GameIdentify {
  constructor (private path: string, private version: string) {}
  valueOf() {
    return `${this.path}:${this.version}`
  }
  toString() {
    return this.valueOf()
  }
}

const running = new Map<GameIdentify, IRunningGame>();

export const start = async function (version: IStartArguments) {
  // TODO inheritsFrom
  const id = gameIdFactory({path: version.versionPath, name: version.name})
  const launcher = new Launcher(version.versionPath, version.minecraftPath, {}, '/usr/bin/java', {
    json: version.json
  });
  const p = {
    version: version,
    launcher: launcher,
  };
  running.set(id, {
    name: version.name,
    json: version.json,
    launcher: launcher,
    id,
  })
  const cp = await launcher.start();
  cp.stdout.pipe(process.stdout);
  cp.stderr.pipe(process.stderr);
  cp.on('exit', () => {
    running.delete(id)
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
  event.returnValue = [...running.values()].map((p) => ({
    version: p.name,
    launcher: p.launcher,
  }));
});

const GAME_IDS = new Map<string, GameIdentify>()

export function gameIdFactory({path, name}) {
  const id = `${path}/${name}`
  if (GAME_IDS.has(id)) {
    return GAME_IDS.get(id)
  } else {
    const GameId = new GameIdentify(path, name)
    GAME_IDS.set(id, GameId)
    return GameId
  }
}
