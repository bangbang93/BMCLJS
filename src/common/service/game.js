/**
 * Created by bangbang93 on 2017/8/13.
 */
'use strict';
import db from './datastore';
import { fs } from 'mz';
import npath from 'path';

export const refresh = async function refresh () {
  let paths = await db.findOne({
    key: 'settings.path'
  });
  paths = paths.value;
  const versions = [];
  for (const path of paths) {
    const versionPath = npath.join(path, 'versions');
    if (!await fs.exists(versionPath)) {
      continue;
    }
    const dirs = await fs.readdir(versionPath);
    for (const dir of dirs) {
      const detailPath = npath.join(versionPath, dir);
      const stat = await fs.stat(detailPath);
      if (!stat.isDirectory()) continue;
      const files = await fs.readdir(detailPath);
      if (!files.some((file) => file.match(/.json$/))) {
        continue;
      }
      versions.push({
        name: dir,
        versionPath: detailPath,
      });
    }
  }
  return versions;
}
