/**
 * Created by bangbang93 on 2017/8/15.
 */
'use strict';
import * as JavaLibraryHelper from '../../helper/java-library';

class MirrorVanilla {
  constructor () {
    this._LIBRARY_SERVER = 'https://libraries.minecraft.net/';
  }

  getLibraryUrl (library) {
    let url;
    if (library['natives']) {
      const natives = library['natives'][JavaLibraryHelper.getOs()];
      if (library['downloads']) {
        const artifact = library['downloads']['classifiers'][natives];
        url = artifact['url'];
      } else {
        const path = library.path || JavaLibraryHelper.getPath(library.name, natives);
        url = this._LIBRARY_SERVER + path;
      }
    } else {
      if (library['downloads']) {
        url = library['downloads']['artifact']['url'];
      } else {
        const path = library.path || JavaLibraryHelper.getPath(library.name);
        url = this._LIBRARY_SERVER + path;
      }
    }
    return url;
  }

  getLibraryPath (library) {
    let path;
    if (library['natives']) {
      const natives = library['natives'][JavaLibraryHelper.getOs()];
      if (library['downloads']) {
        const artifact = library['downloads']['classifiers'][natives];
        path = artifact['path'];
      } else {
        path = JavaLibraryHelper.getPath(library.name, natives);
      }
    } else {
      if (library['downloads']) {
        path = library['downloads']['artifact']['path'];
      } else {
        path = JavaLibraryHelper.getPath(library.name);
      }
    }
    return path;
  }

  getVersionUrl (version) {
    throw new Error('TODO');
  }

  getAssetUrl (asset) {
    throw new Error('TODO');
  }
}

export default MirrorVanilla;
