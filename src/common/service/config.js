/**
 * Created by bangbang93 on 2017/8/13.
 */
'use strict';
import db from './datastore';
const path = require('path');
const app = require('electron').app;
const fs = require('mz').fs;

export const addPath = async function (path) {
  let paths = await db.findOne({
    key: 'settings.path'
  });
  paths = paths.value;
  paths.push(path);
  return db.update({
    value: paths,
  }, {
    key: 'setting.path',
  });
}

async function main () {
  const LOCK_FILE = path.join(app.getPath('appData'), 'bmcljs.lock');
  if (!await fs.exists(LOCK_FILE)) {
    await init();
    await fs.writeFile(LOCK_FILE, '');
  }
}

async function init () {
  const VANILLA_MINECRAFT_PATH = path.join(app.getPath('appData'), 'minecraft');
  if (await fs.exists(VANILLA_MINECRAFT_PATH)) {
    console.log(db)
    await db.insert({
      key: 'settings.path',
      value: [VANILLA_MINECRAFT_PATH]
    })
  }
}

main().catch(console.error);
