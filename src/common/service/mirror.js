/**
 * Created by bangbang93 on 2017/8/15.
 */
'use strict';
import BMCLAPI from './mirrors/bmclapi';
import Vanilla from './mirrors/vanilla';

/**
 * getMirror
 * @param name
 * @returns {MirrorVanilla}
 */
export function getMirror (name) {
  name = name.toLowerCase();
  switch (name) {
    case 'vanilla':
      return new Vanilla();
    case 'bmclapi':
    default:
      return new BMCLAPI();
  }
}
