/**
 * Created by bangbang93 on 2017/8/14.
 */
'use strict';
const Unzip = require('unzip');
const createReadStream = require('fs').createReadStream;

export function getPath (fullName) {
  const [pkg, name, version] = fullName.split(':');
  return pkg.split('.').concat([name, version, `${name}-${version}.jar`]).join('/');
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
