/**
 * Created by bangbang93 on 2017/8/13.
 */
'use strict';
import Datastore from 'nedb';
import path from 'path';
import { remote } from 'electron';

export default new Datastore({
  autoload: true,
  filename: path.join(remote.app.getPath('userData'), '/data.db'),
});
