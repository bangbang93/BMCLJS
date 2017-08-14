/**
 * Created by bangbang93 on 2017/8/14.
 */
'use strict';

export function getPath (fullName) {
  const [pkg, name, version] = fullName.split(':');
  return pkg.split('.').concat([name, version, `${name}-${version}`]).join('/');
}
