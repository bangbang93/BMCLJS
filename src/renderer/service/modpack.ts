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
  dedicate: string,
  forceUpdate: string,
  releaseTime: Date,
  description: string
}
