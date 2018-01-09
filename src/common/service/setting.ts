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

export interface IBMCLSetting {
  gamePaths: string[],
  mirror: string,
}

const SETTING_FILE = path.join(app.getPath('userData'), 'bmcl.json')

let SETTING:IBMCLSetting = fs.readJSONSync(SETTING_FILE, {throws: false}) || init()

fs.watchFile(SETTING_FILE, (curr, prev) => {
  SETTING = fs.readJSONSync(SETTING_FILE, {throws: false}) || init()
})

async function save() {
  return fs.writeJSON(SETTING_FILE, SETTING, {spaces: 4})
}

export const addPath = async function (path) {
  SETTING.gamePaths.push(path)
  await save()
}

export const getPaths = function () {
  return SETTING.gamePaths
}

export const delPath = async function (path) {
  const index = SETTING.gamePaths.indexOf(path);
  if (index === -1) return;
  SETTING.gamePaths.splice(index, 1);
  await save()
}

export const getSetting = async function (key: string) {
  return SETTING[key]
}

export const setSetting = async function (key, value) {
  SETTING[key] = value
  await save()
}

export function init () {
  console.log('init default setting')
  const VANILLA_MINECRAFT_PATH = path.join(app.getPath('appData'), 'minecraft');
  const gamePaths = []
  if (fs.pathExistsSync(VANILLA_MINECRAFT_PATH)) {
    gamePaths.push(VANILLA_MINECRAFT_PATH)
  }
  return {
    gamePaths,
    mirror: 'bmclapi'
  }

}
