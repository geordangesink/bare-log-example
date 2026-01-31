const Module = require('bare-module')
const { startsWithWindowsDriveLetter } = require('bare-module-resolve')
const path = require('bare-path')
const fs = require('bare-fs')
const crypto = require('bare-crypto')
const { fileURLToPath, pathToFileURL } = require('bare-url')

const bundle = Bare.argv.pop()
const id = Bare.argv.pop()

start(id, bundle, null)
async function start(filename, source, assets) {
  if (assets !== null) {
    let url

    if (startsWithWindowsDriveLetter(assets)) {
      url = null
    } else {
      url = URL.parse(assets)
    }

    if (url === null) url = pathToFileURL(assets)

    assets = fileURLToPath(url)
  }

  let url

  if (startsWithWindowsDriveLetter(filename)) {
    url = null
  } else {
    url = URL.parse(filename)
  }
  console.log(url)
  if (url === null) url = pathToFileURL(filename)

  if (source === null) source = Module.protocol.read(url)
  else source = Buffer.from(source)

  if (assets !== null && path.extname(url.href) === '.bundle') {
    const bundle = Bundle.from(source)

    if (bundle.id !== null && bundle.assets.length > 0) {
      const id = crypto.createHash('blake2b256').update(bundle.id).digest('hex')

      const root = path.join(assets, id)

      const tmp = fs.existsSync(root) ? null : path.join(assets, 'tmp')

      if (tmp !== null) {
        fs.rmSync(tmp, { recursive: true, force: true })
        fs.mkdirSync(tmp, { recursive: true })
      }

      source = await unpack(bundle, { files: false, assets: true }, (key) => {
        if (tmp !== null) {
          const target = path.join(tmp, key)

          fs.mkdirSync(path.dirname(target), { recursive: true })
          fs.writeFileSync(target, bundle.read(key))
        }

        return pathToFileURL(path.join(root, key)).href
      })

      if (tmp !== null) fs.renameSync(tmp, root)
    }
  }

  const cache = Object.create(null) // use a clean cache to avoid id collisions

  return Module.load(url, source, {cache})
}

// TODO: execute bundle code
