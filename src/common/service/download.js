/**
 * Created by bangbang93 on 2017/8/15.
 */
'use strict';
import * as MirrorService from './mirror';
import * as Config from './setting';

export const getLibrariesDownloadUrls = async function getLibrariesDownloadUrls (libraries) {
  const mirror = MirrorService.getMirror(await Config.getSetting('mirror'));
  return libraries.map((library) => {
    return {
      url: library.url || mirror.getLibraryUrl(library),
      path: library.path || mirror.getLibraryPath(library),
    };
  })
}
