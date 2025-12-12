const Pipe = require('bare-pipe')
const { SystemLog } = require('bare-logger')
const Console = require('bare-console')
global.console = new Console(new SystemLog())

console.log('nested.js logs')

const { childWriteFd, childReadFd } = Bare.Thread.self.data
const writePipe = new Pipe(childWriteFd)
const readPipe = new Pipe(childReadFd)

readPipe.on('data', () => {
    writePipe.write('nested.js has connected')
})
