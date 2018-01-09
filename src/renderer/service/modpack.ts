import * as fs from 'fs-extra'
import {remote} from 'electron'
import * as path from 'path'
import * as rimraf from 'rimraf'
import {validate} from 'jsonschema'

const Node7z = require('node-7z')

interface IModpackManifest {
  minecraft: {
    version: string,
    modLoaders: [{
      id: string,
    }]
  },
  name: string,
  version: string,
  author: string,
  support: string,
  dedicate?: string,
  forceUpdate: boolean,
  releaseTime: Date,
  description: string,

  files?: [{
    path: string,
    sha1: string,
  }]
}

interface IModpackUpdateManifest extends IModpackManifest {
  rm?: string[]
}

const ModpackManifestSchema = require('../../common/schema/modpack-manifest.json')

class Modpack {
  public manifest: IModpackManifest
  private tempDir: string
  constructor (public filename: string) {
    this.tempDir = path.join(remote.app.getPath('temp'), 'modpack', Date.now().toString())
  }

  /**
   * parse manifest
   * @returns {Promise<void>}
   */
  async read() {
    const zip = new Node7z()
    await zip.extractFull(this.filename, this.tempDir)
    const manifestFile = path.join(this.tempDir, 'modpack.json')
    if (!await fs.pathExists(manifestFile)) {
      throw new Error('invalid modpack: modpack.json not found')
    }
    const manifest = await fs.readJSON(manifestFile)
    const validatorResult = validate(manifest, ModpackManifestSchema)
    if (!validatorResult.valid) {
      let err = new Error('invalid modpack: modpack.json format error')
      err['validate'] = validatorResult.errors
      throw err
    }

    this.manifest = manifest
  }

  /**
   * import to game dir
   * @param {string} path
   * @returns {Promise<void>}
   */
  async import(path: string) {

  }


    async close() {
    return rimraf.__promisify__(this.tempDir)
  }
}


