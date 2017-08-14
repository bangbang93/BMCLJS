/**
 * Created by bangbang93 on 2017/8/14.
 */
'use strict';
import * as JavaLibraryHelper from '../../common/helper/java-library';
const EventEmitter = require('events').EventEmitter;
const npath = require('path');
const fs = require('mz').fs;
const rimraf = require('rimraf');
const cp = require('child_process');

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
    this._missingLibrary = [];
  }

  async start () {
    this.emit('progress', 'checkJava');
    await this._checkJava();
    this.emit('progress', 'cleanNatives');
    await this._cleanNatives();
    this._arguments.push(`-Djava.library.path=${this._nativesPath}`);
    this.emit('progress', 'resolveLibraries');
    await this._setupLibraries();
    this.emit('progress', 'resolveNatives');
    await fs.mkdir(this._nativesPath);
    await this._setupNatives();
    if (this._missingLibrary.length !== 0) {
      this.emit('missing_all', this._missingLibrary);
      let err = new Error('missing library');
      err.missing = this._missingLibrary;
      throw err;
    }
    this.emit('progress', 'mergeArguments');
    this._arguments.push(this.opts.json['mainClass']);
    this._mcArguments();
    this.emit('progress', 'launch');
    console.log(this._arguments);
    this.process = cp.spawn(this.java, this._arguments, {
      cwd: this.minecraftPath,
      stdio: 'pipe',
    });
    return this.process;
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
      await rm(path);
    }
  }

  async _setupLibraries () {
    const libraries = this.opts.json.libraries;
    const librariesPath = [];
    for (const library of libraries) {
      if (library['natives']) continue;
      if (!library.path) {
        library.path = library['downloads']['artifact']['path'] || JavaLibraryHelper.getPath(library.name);
      }
      const path = npath.join(this._libraryPath, library.path);
      if (!await fs.exists(path)) {
        this.emit('missing', library);
        this._missingLibrary.push(library);
      }

      librariesPath.push(path);
    }
    const jar = this.opts.json.jar || this.opts.json.id
    if (this.opts.json.inheritsFrom) {
      librariesPath.push(npath.join(this.versionPath, `../${this.opts.json.inheritsFrom}/${jar}.jar`));
    } else {
      librariesPath.push(npath.join(this.versionPath, `${jar}.jar`));
    }

    this._arguments.push(`-cp${librariesPath.join(';')}`);
    return librariesPath.join(';');
  }

  async _setupNatives () {
    const libraries = this.opts.json.libraries;
    for (const library of libraries) {
      if (!library['natives']) continue;
      if (!library.path) {
        library.path = JavaLibraryHelper.getPath(library.name);
      }
      const rules = library.rules;
      let result = 'allow';
      if (rules) {
        if (rules.length === 1) {
          const rule = rules[0];
          if (rule.os === getOs()) {
            result = rule.action;
          } else {
            result = rule.action === 'allow' ? 'disallow' : 'allow';
          }
        } else {
          rules.reduce((result, rule) => {
            if (rule.os === getOs()) {
              return rule.action;
            }
            return result;
          }, result);
        }
      }
      if (result === 'disallow') {
        continue;
      }
      const natives = library['natives'][getOs()];
      const artifact = library['downloads']['classifiers'][natives];
      const path = artifact['path'] || JavaLibraryHelper.getPath(library.name);
      if (!await fs.exists(npath.join(this._libraryPath, library.path))) {
        this.emit('missing', library);
        this._missingLibrary.push(library);
      } else {
        await JavaLibraryHelper.unzip(path, this._nativesPath);
      }
    }
  }

  _mcArguments () {
/* eslint-disable no-template-curly-in-string */
    const values = {
      '${auth_player_name}': this.authResult.username,
      '${version_name}': this.opts.json['id'],
      '${game_directory}': npath.join(this.versionPath, '.minecraft'),
      '${assets_root}': npath.join(this.minecraftPath, 'assets'),
      '${assets_index_name}': this.opts.json['assets'],
      '${user_type}': 'Legacy',
      '${version_type}': 'Legacy',
      '${user_properties}': '{}',
    };
    if (this.authResult.args) {
      Object.keys(this.authResult.args).forEach((key) => {
        values[key] = this.authResult.args[key];
      });
    }
    const args = this.opts.json['minecraftArguments'].split(' ');
    args.forEach((e, i) => {
      if (values[e]) {
        args[i] = values[e];
      }
    });
    this._arguments.concat(args);
    return args;
/* eslint-enable no-template-curly-in-string */
  }
}

export default Launcher;

function rm (f, opts) {
  return new Promise((resolve, reject) => {
    rimraf(f, opts || {}, function (err) {
      if (err) return reject(err);
      resolve();
    })
  })
}

let _os;

function getOs () {
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
