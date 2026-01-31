const Thread = require('bare-thread')
const SystemLog = require('bare-system-logger')
const Console = require('bare-console')
global.console = new Console(new SystemLog())
console.log('Nested runs')

new Thread(require.resolve('./double-nested.js'))