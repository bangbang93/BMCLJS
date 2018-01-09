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

export const db = new Lokijs( path.join(app.getPath('userData'), '/data.db'))

export const Setting = db.addCollection('Setting')
