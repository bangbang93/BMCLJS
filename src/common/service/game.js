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
      let jsonFile;
      let json;
      for (const file of files) {
        if (!file.endsWith('.json')) continue;
        const path = npath.join(detailPath, file);
        let content = await fs.readFile(path);
        try {
          content = JSON.parse(content);
        } catch (e) {}
        if (content && content['minecraftArguments']) {
          jsonFile = path;
          json = content;
        }
      }
      versions.push({
        name: dir,
        versionPath: detailPath,
        minecraftPath: npath.join(versionPath, '..'),
        jsonFile,
        json,
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
