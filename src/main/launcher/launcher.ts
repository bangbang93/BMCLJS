/**
 * Created by bangbang93 on 2017/8/14.
 */


'use strict'
import * as JavaLibraryHelper from '../../common/helper/java-library'
import {EventEmitter} from 'events'
import * as npath from 'path'
import * as fs from 'fs-extra'
import * as cp from 'child_process'
import {ChildProcess} from 'child_process'
import * as rimraf from 'rimraf'
import {debug} from 'util'

namespace Launcher {
  export interface IOptions {
    json: any
    javaxmx?: number,
    extArg?: string | string[],
  }
}

class Launcher extends EventEmitter {
  public process:ChildProcess

  private _libraryPath: string
  private _nativesPath: string
  private _arguments: string[]
  private _missingLibrary: string[]
  private _gameDirectory: string
  private _assetDirectory: string

  constructor (public versionPath: string,
               public minecraftPath: string,
               public authResult: any,
               public java: string,
               public opts: Launcher.IOptions) {
    super()

    this._libraryPath = npath.join(minecraftPath, 'libraries')
    this._nativesPath = npath.join(versionPath, `${this.opts.json.id}-natives-${~~(Date.now() / 1000)}`)
    this._arguments = []
    this._gameDirectory = npath.join(this.versionPath, '.minecraft')
    this._assetDirectory = npath.join(this.minecraftPath, 'assets')

    const defaultOpts = {
      javaxmx: '1024',
    }

    this.opts = Object.assign(defaultOpts, this.opts)
    this._missingLibrary = []
  }

  async checkEnv () {
    this.emit('progress', 'checkJava')
    await this._checkJava()
    this.emit('progress', 'cleanNatives')
    await this._cleanNatives()
    this._arguments.push(`-Djava.library.path=${this._nativesPath}`)
    this.emit('progress', 'resolveLibraries')
    await this._setupLibraries()
    this.emit('progress', 'resolveNatives')
    await fs.mkdir(this._nativesPath)
    await this._setupNatives()
    if (this._missingLibrary.length !== 0) {
      this.emit('missing_all', this._missingLibrary)
      let err = new Error('missing library')
      err['missing'] = this._missingLibrary
      err['launcher'] = this
      throw err
    }

    await fs.ensureDir(this._gameDirectory)
    this.emit('progress', 'mergeArguments')
    this._arguments.push(this.opts.json['mainClass'])
    this._mcArguments()
    this.emit('progress', 'envOK')
  }

  async start () {
    this.emit('progress', 'launch')
    await this.checkEnv()
    console.log(this._arguments)
    this.process = cp.spawn(this.java, this._arguments, {
      cwd: this.minecraftPath,
      stdio: 'pipe',
    })
    return this.process
  }

  async _checkJava () {
    if (!await fs.pathExists(this.java)) throw new Error('java not found')
    this._arguments.push(`-Xmx${this.opts.javaxmx}M`)
    const extArg = this.opts.extArg
    if (extArg) {
      if (typeof extArg === 'string') {
        extArg.split(' ').forEach((arg) => this._arguments.push(arg))
      } else {
        extArg.forEach((arg) => this._arguments.push(arg))
      }
    }
  }

  async _cleanNatives () {
    const dirs = await fs.readdir(this.versionPath)
    for (const dir of dirs) {
      if (!dir.match(/-natives-/)) continue
      const path = npath.join(this.versionPath, dir)
      const stat = await fs.stat(path)
      if (!stat.isDirectory()) continue
      await rm(path)
    }
  }

  async _setupLibraries () {
    const libraries = this.opts.json.libraries
    const librariesPath = []
    for (const library of libraries) {
      if (library['natives']) continue
      if (!library.path) {
        if (library['downloads']) {
          library.path = library['downloads']['artifact']['path']
        } else {
          library.path = JavaLibraryHelper.getPath(library.name)
        }
      }
      const path = npath.join(this._libraryPath, library.path)
      if (!await fs.pathExists(path)) {
        this.emit('missing', library)
        this._missingLibrary.push(library)
      }

      librariesPath.push(path)
    }
    const jar = this.opts.json.jar || this.opts.json.id
    let filePath: string
    if (this.opts.json.inheritsFrom) {
      filePath = npath.join(this.versionPath, `../${this.opts.json.inheritsFrom}/${jar}.jar`)
    } else {
      filePath = npath.join(this.versionPath, `${jar}.jar`)
    }
    if (!await fs.pathExists(filePath)) throw new Error('cannot find jar')
    librariesPath.push(filePath)

    this._arguments.push('-cp')
    this._arguments.push(`${librariesPath.join(npath.delimiter)}`)
    return librariesPath.join(';')
  }

  async _setupNatives () {
    const libraries = this.opts.json.libraries
    for (const library of libraries) {
      if (!library['natives']) continue
      if (!library.path) {
        library.path = JavaLibraryHelper.getPath(library.name)
      }
      const rules = library.rules
      let result = 'allow'
      if (rules) {
        if (rules.length === 1) {
          const rule = rules[0]
          if (rule.os === getOs()) {
            result = rule.action
          } else {
            result = rule.action === 'allow' ? 'disallow' : 'allow'
          }
        } else {
          rules.reduce((result, rule) => {
            if (rule.os === getOs()) {
              return rule.action
            }
            return result
          }, result)
        }
      }
      if (result === 'disallow') {
        continue
      }
      const natives = library['natives'][getOs()]
      let path
      if (library['downloads']) {
        const artifact = library['downloads']['classifiers'][natives]
        path = artifact['path']
      } else {
        path = JavaLibraryHelper.getPath(library.name, natives)
      }
      path = npath.join(this._libraryPath, path)
      if (!await fs.pathExists(path)) {
        library.path = path
        this.emit('missing', library)
        this._missingLibrary.push(library)
      } else {
        await JavaLibraryHelper.unzip(path, this._nativesPath)
      }
    }
  }

  _mcArguments () {
    const values = {
      '${auth_player_name}': this.authResult.username,
      '${version_name}': this.opts.json['id'],
      '${game_directory}': this._gameDirectory,
      '${assets_root}': this._assetDirectory,
      '${assets_index_name}': this.opts.json['assets'],
      '${user_type}': 'Legacy',
      '${version_type}': 'Legacy',
      '${user_properties}': '{}',
    }
    if (this.authResult.args) {
      Object.keys(this.authResult.args).forEach((key) => {
        values[key] = this.authResult.args[key]
      })
    }
    const args = this.opts.json['minecraftArguments'].split(' ')
    args.forEach((e, i) => {
      if (values[e]) {
        args[i] = values[e]
      }
    })
    args.forEach((arg) => this._arguments.push(arg))
    return args
  }
}

export default Launcher

function rm (f, opts?) {
  return new Promise((resolve, reject) => {
    rimraf(f, opts || {}, function (err) {
      if (err) return reject(err)
      resolve()
    })
  })
}

let _os

function getOs () {
  if (_os) return _os
  const os = require('os')
  const platform = os.platform()
  _os = {
    'windows': 'windows',
    'linux': 'linux',
    'darwin': 'osx',
  }[platform]
  if (platform === 'windows') {
    _os = _os.replace('${arch}', os.arch()) // eslint-disable-line no-template-curly-in-string
  }
  return _os
}
