const SystemLog = require('bare-system-logger')
const Console = require('bare-console')
global.console = new Console(new SystemLog())
const getPort = require('./getPort.js')

const port = getPort()
console.log('parent Port is null:', port === null)
port.postMessage('throws')
