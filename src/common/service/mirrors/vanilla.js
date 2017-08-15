/**
 * Created by bangbang93 on 2017/8/15.
 */
'use strict';
import * as JavaLibraryHelper from '../../helper/java-library';

class MirrorVaillla {
  constructor () {
    this._LIBRARY_SERVER = 'https://libraries.minecraft.net/';
  }

  getLibraryUrl (library) {
    let url;
    if (library['natives']) {
      const natives = library['natives'][JavaLibraryHelper.getOs()];
      if (library['downloads']) {
        const artifact = library['downloads']['classifiers'][natives];
        url = artifact['path'];
      } else {
        url = JavaLibraryHelper.getPath(library.name, natives);
      }
    } else {
      if (library['downloads']) {
        url = library['downloads']['artifact']['path'];
      } else {
        url = this._LIBRARY_SERVER + JavaLibraryHelper.getPath(library.name);
      }
    }
    return url;
  }

  getVersionUrl (version) {
    throw new Error('TODO');
  }

  getAssetUrl (asset) {
    throw new Error('TODO');
  }
}

export default MirrorVaillla;
