/**
 * Created by bangbang93 on 2017/8/13.
 */
'use strict';
import {config} from './datastore';
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
  let paths = await config.findOne({
    key: 'config.path'
  });
  paths = paths.value;
  paths.push(path);
  return config.update(paths);
}

export const getPaths = async function () {
  let paths = await config.findOne({
    key: 'config.path',
  });
  return paths.value;
}

export const delPath = async function (path) {
  let paths = await config.findOne({
    key: 'config.path'
  });
  paths = paths.value;
  const index = paths.indexOf(path);
  if (index === -1) return;
  paths.splice(index, 1);
  return config.update(paths);
}

export const getConfig = async function (key) {
  const value = await config.findOne({
    key: `config.${key}`,
  });
  if (value) {
    return value.value;
  }
  return null;
}

export const setConfig = async function (key, value) {
  return config.findAndUpdate({
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
    await config.insert({
      key: 'config.path',
      value: [VANILLA_MINECRAFT_PATH]
    });
  }
  await setConfig('mirror', 'bmclapi');
}

main().catch(console.error);
