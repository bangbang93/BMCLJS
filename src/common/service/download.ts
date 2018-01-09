/**
 * Created by bangbang93 on 2017/8/15.
 */
'use strict';
import * as MirrorService from './mirror';
import * as Config from './setting';
import request from 'axios'
import * as fs from 'fs-extra'

interface IDownloadLibrariesArguments {

}

interface IDownloadTask {
  url: string,
  path: string,
  name: string,
}

export class CommonDownloadService {
  static async getLibrariesDownloadUrls (libraries):Promise<IDownloadTask[]> {
    const mirror = MirrorService.getMirror(await Config.getSetting('mirror'));
    return libraries.map((library) => {
      return {
        url: library.url || mirror.getLibraryUrl(library),
        path: library.path || mirror.getLibraryPath(library),
        name: library.name,
      };
    })
  }

  static async* downloadLibraries(libraries: any[]) {
    const tasks = await CommonDownloadService.getLibrariesDownloadUrls(libraries)
    for(const task of tasks){
      await task.name
      const res = await request.get(task.url)
      await fs.writeFile(task.path, res.data)
    }
  }
}
