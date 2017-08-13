/**
 * Created by bangbang93 on 2017/8/13.
 */
'use strict';
import Datastore from 'nedb-promise';
import path from 'path';
import electron from 'electron';

let app;

if (electron.remote) {
  app = electron.remote.app;
} else {
  app = electron.app;
}

export default new Datastore({
  autoload: true,
  filename: path.join(app.getPath('userData'), '/data.db'),
});
