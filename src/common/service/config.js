/**
 * Created by bangbang93 on 2017/8/13.
 */
'use strict';
import db from './datastore';
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
  let paths = await db.findOne({
    key: 'config.path'
  });
  paths = paths.value;
  paths.push(path);
  return db.update({
    key: 'config.path',
  }, {
    $set: {
      value: paths,
    }
  });
}

export const getPaths = async function () {
  let paths = await db.findOne({
    key: 'config.path',
  });
  return paths.value;
}

export const delPath = async function (path) {
  let paths = await db.findOne({
    key: 'config.path'
  });
  paths = paths.value;
  const index = paths.indexOf(path);
  if (index === -1) return;
  paths.splice(index, 1);
  return db.update({
    key: 'config.path',
  }, {
    $set: {
      value: paths,
    }
  });
}

export const getConfig = async function (key) {
  const value = await db.findOne({
    key: `config.${key}`,
  });
  if (value) {
    return value.value;
  }
  return null;
}

export const setConfig = async function (key, value) {
  return db.update({
    key: `config.${key}`,
  }, {
    $set: {
      value,
    }
  }, {
    upsert: true,
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
    await db.insert({
      key: 'config.path',
      value: [VANILLA_MINECRAFT_PATH]
    });
  }
  await setConfig('mirror', 'bmclapi');
}

main().catch(console.error);
