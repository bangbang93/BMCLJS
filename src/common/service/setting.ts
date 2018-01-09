/**
 * Created by bangbang93 on 2017/8/13.
 */


'use strict';
import {ISetting, Setting} from './datastore'
import * as fs from 'fs-extra'
import * as electron from 'electron'
import * as path from 'path'

let app;
if (electron.remote) {
  app = electron.remote.app;
} else {
  app = electron.app;
}

export const addPath = function (path) {
  let gamePaths:ISetting = Setting.findOne({
    key: 'gamePaths'
  });
  if (!gamePaths) {
    gamePaths = Setting.insert({
      key: 'gamePaths',
      value: [],
    })
  }
  gamePaths.value.push(path);
  return Setting.update(gamePaths);
}

export const getPaths = function () {
  let gamePaths:ISetting = Setting.findOne({
    key: 'gamePaths',
  });
  console.log(gamePaths)
  if (!gamePaths) {
    gamePaths = Setting.insert({
      key: 'gamePaths',
      value: [],
    })
  }
  return gamePaths.value;
}

export const delPath = function (path) {
  let paths = Setting.findOne({
    key: 'gamePaths'
  });
  const index = paths.value.indexOf(path);
  if (index === -1) return;
  paths.value.splice(index, 1);
  return Setting.update(paths);
}

export const getSetting = async function (key) {
  const value = await Setting.findOne({
    key,
  });
  if (value) {
    return value.value;
  }
  return null;
}

export const setSetting = async function (key, value) {
  return Setting.findAndUpdate({
    key,
  }, (doc) => {
    doc.value = value
  })
}

async function main () {
  const LOCK_FILE = path.join(app.getPath('userData'), 'bmcljs.lock');
  if (!await fs.pathExists(LOCK_FILE)) {
    await init();
    await fs.writeFile(LOCK_FILE, '');
  }
}

async function init () {
  const VANILLA_MINECRAFT_PATH = path.join(app.getPath('appData'), 'minecraft');
  if (await fs.pathExists(VANILLA_MINECRAFT_PATH)) {
    await Setting.insert({
      key: 'gamePaths',
      value: [VANILLA_MINECRAFT_PATH]
    });
  }
  await setSetting('mirror', 'bmclapi');
}

main().catch(console.error);
