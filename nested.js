const SystemLog = require('bare-system-logger')
const Console = require('bare-console')
global.console = new Console(new SystemLog())
const Worker = require('bare-worker')

console.log('parent Port is null:', Worker.parentPort === null)
Worker.parentPort.postMessage('throws')
