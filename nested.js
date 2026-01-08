const SystemLog = require('bare-system-logger')
const Console = require('bare-console')
global.console = new Console(new SystemLog())

console.log('this should log')
