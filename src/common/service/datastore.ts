/**
 * Created by bangbang93 on 2017/8/13.
 */

'use strict';
import * as Lokijs from 'lokijs'
import * as path from 'path';
import * as electron from 'electron';
import * as fs from 'fs-extra'
import * as SettingService from './setting'

let app;

if (electron.remote) {
  app = electron.remote.app;
} else {
  app = electron.app;
}

const DB_FILE = path.join(app.getPath('userData'), 'data.db')

export const db = new Lokijs(DB_FILE, {
  autosave: true,
  autoload: true,
  autoloadCallback: onAutoload,
  adapter: new Lokijs.LokiFsAdapter()
})

function onAutoload() {
  Setting = db.getCollection<ISetting>('setting') || db.addCollection<ISetting>('setting')
}

export interface ISetting{
  key: string,
  value: any
}
export let Setting:Collection<ISetting>
