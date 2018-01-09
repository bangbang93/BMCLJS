/**
 * Created by bangbang93 on 2017/8/13.
 */
'use strict';
import {Setting} from './datastore';
const path = require('path');
const electron = require('electron');
const fs = require('mz').fs;

let app;
if (electron.remote) {
  app = electron.remote.app;
} else {
  app = electron.app;
}

export const addPath = async function (path) {
  let gamePaths = await Setting.findOne({
    key: 'gamePaths'
  });
  if (!gamePaths) {
    gamePaths = await Setting.insert({
      key: 'gamePaths',
      value: [],
    })
  }
  gamePaths = gamePaths.value;
  gamePaths.push(path);
  return Setting.update(gamePaths);
}

export const getPaths = async function () {
  let gamePaths = await Setting.findOne({
    key: 'gamePaths',
  });
  if (!gamePaths) {
    gamePaths = await Setting.insert({
      key: 'gamePaths',
      value: [],
    })
  }
  return gamePaths.value;
}

export const delPath = async function (path) {
  let paths = await Setting.findOne({
    key: 'config.path'
  });
  paths = paths.value;
  const index = paths.indexOf(path);
  if (index === -1) return;
  paths.splice(index, 1);
  return Setting.update(paths);
}

export const getConfig = async function (key) {
  const value = await Setting.findOne({
    key: `config.${key}`,
  });
  if (value) {
    return value.value;
  }
  return null;
}

export const setConfig = async function (key, value) {
  return Setting.findAndUpdate({
    key: `config.${key}`,
  }, (doc) => {
    doc.value = value
  })
}

async function main () {
  const LOCK_FILE = path.join(app.getPath('userData'), 'bmcljs.lock');
  if (!await fs.exists(LOCK_FILE)) {
    await init();
    await fs.writeFile(LOCK_FILE, '');
  }
}

async function init () {
  const VANILLA_MINECRAFT_PATH = path.join(app.getPath('appData'), 'minecraft');
  if (await fs.exists(VANILLA_MINECRAFT_PATH)) {
    await Setting.insert({
      key: 'config.path',
      value: [VANILLA_MINECRAFT_PATH]
    });
  }
  await setConfig('mirror', 'bmclapi');
}

main().catch(console.error);
