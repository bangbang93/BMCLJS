/**
 * Created by bangbang93 on 2017/8/15.
 */
'use strict';
import MirrorVanilla from './vanilla';

const VANILLA_SERVER = 'https://libraries.minecraft.net/';

class MirrorBmclapi extends MirrorVanilla {
  constructor () {
    super();
    this._LIBRARY_SERVER = 'https://bmclapi.bangbang93.com/maven/';
  }

  getLibraryUrl (library) {
    let url = super.getLibraryUrl(library);
    url = url.replace(VANILLA_SERVER, this._LIBRARY_SERVER);
    return url;
  }
}

export default MirrorBmclapi;
