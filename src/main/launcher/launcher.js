/**
 * Created by bangbang93 on 2017/8/14.
 */
'use strict';
const EventEmitter = require('events').EventEmitter;
const npath = require('path');
const fs = require('mz').fs;
const rimraf = require('rimraf');

class Launcher extends EventEmitter {
  constructor (versionPath, minecraftPath, authResult, java, opts) {
    super();
    this.versionPath = versionPath;
    this.minecraftPath = minecraftPath;
    this.authResult = authResult;
    this.java = java;
    this.opts = opts;

    this._libraryPath = npath.join(minecraftPath, 'libraries');
    this._nativesPath = npath.join(versionPath, `${this.opts.json.id}-natives-${~~(new Date() / 1000)}`);
    this._arguments = [];

    const defaultOpts = {
      javaxmx: '1024'
    };

    this.opts = Object.assign(defaultOpts, this.opts);
  }

  async start () {
    this.emit('progress', 'checkJava');
    await this._checkJava();
    this.emit('progress', 'cleanNatives');
    await this._cleanNatives();
    this._arguments.push(`-Djava.library.path=${this._nativesPath}`);
    this.emit('progress', 'resolveLibraries');

  }

  async _checkJava () {
    if (!fs.exists(this.java)) throw new Error('java not found');
    this._arguments.push(`-Xmx${this.opts.javaxmx}M`);
  }

  async _cleanNatives () {
    const dirs = await fs.readdir(this.versionPath);
    for (const dir of dirs) {
      if (!dir.match(/-natives-/)) continue;
      const path = npath.join(this.versionPath, dir);
      const stat = await fs.stat(path);
      if (!stat.isDirectory()) continue;
      await (rm(path));
    }
  }

  async _setupLibaries () {
    const libraries = this.opts.json.libraries;
    for (const library of libraries) {
      if (!library.path) {

      }
    }
  }
}

export default Launcher;

function rm (f ,opts) {
  return new Promise((resolve, reject) => {
    rimraf(f, opts, function (err) {
      if (err) return reject(err);
      resolve();
    })
  })
}
