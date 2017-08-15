/**
 * Created by bangbang93 on 2017/8/14.
 */
'use strict';
const Unzip = require('unzip');
const createReadStream = require('fs').createReadStream;

let _os;

export function getPath (fullName, native) {
  native = native || '';
  if (native) {
    native = `-${native}`;
  }
  const [pkg, name, version] = fullName.split(':');
  return pkg.split('.').concat([name, version, `${name}-${version}${native}.jar`]).join('/');
}

export const unzip = async function (file, path) {
  return new Promise((resolve, reject) => {
    createReadStream(file)
      .pipe(Unzip.Extract({
        path
      }))
      .on('close', resolve)
      .on('error', reject);
  })
}

export function getOs () {
  if (_os) return _os;
  const os = require('os');
  const platform = os.platform();
  _os = {
    'windows': 'windows',
    'linux': 'linux',
    'darwin': 'osx',
  }[platform];
  if (platform === 'windows') {
    _os = _os.replace('${arch}', os.arch()); // eslint-disable-line no-template-curly-in-string
  }
  return _os;
}
