/**
 * Created by bangbang93 on 2017/8/13.
 */
'use strict';
import { fs } from 'mz';
import npath from 'path';
import * as ConfigService from './config';

export const refresh = async function () {
  const paths = await ConfigService.getPaths();
  const versions = [];
  for (const path of paths) {
    const versionPaths = [
      npath.join(path, 'versions'),
      npath.join(path, '.minecraft', 'versions'),
      npath.join(path, 'minecraft', 'versions'),
    ]
    let versionPath = '';
    for (versionPath of versionPaths) {
      if (await fs.exists(versionPath)) {
        break;
      }
    }
    if (!versionPath) {
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

export const findByName = async function (name) {
  const games = await refresh();
  for (const game of games) {
    if (game.name === name) {
      return game;
    }
  }
}
