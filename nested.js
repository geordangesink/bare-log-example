const Pipe = require('bare-pipe')

console.log('nested worklet logs')

const { childWriteFd, childReadFd } = Bare.Thread.self.data
const writePipe = new Pipe(childWriteFd)
const readPipe = new Pipe(childReadFd)

readPipe.on('data', () => {
    writePipe.write('nested worklet connected')
})
