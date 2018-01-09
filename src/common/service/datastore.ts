/**
 * Created by bangbang93 on 2017/8/13.
 */

'use strict';
import * as Lokijs from 'lokijs'
import * as path from 'path';
import * as electron from 'electron';

let app;

if (electron.remote) {
  app = electron.remote.app;
} else {
  app = electron.app;
}

export const db = new Lokijs(path.join(app.getPath('userData'), 'data.db'), {
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
