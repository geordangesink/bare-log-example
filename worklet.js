// /* global Bare, BareKit */
const Thread = require('bare-thread')
const RPC = require('bare-rpc')
const Pipe = require('bare-pipe')
const goodbye = require('graceful-goodbye')

console.log('worklet logs')

// setup rpc to frontend
const rpc = new RPC(BareKit.IPC, (req, error) => {
  if (req.command === 0) {
    const request = rpc.request(0)
    request.send('worklet.js connected')
  } 
})

const [parentReadFd, childWriteFd] = Pipe.pipe()
const [childReadFd, parentWriteFd] = Pipe.pipe()

new Thread(require.resolve('./nested.js'), {data: {childReadFd, childWriteFd}})

// Set up pipe to check if nested is running
const writePipe = new Pipe(parentWriteFd)
const readPipe = new Pipe(parentReadFd)
goodbye(()=>{
    writePipe.destroy()
    readPipe.destroy()
})

readPipe.on('data', (d) => {
  // send response to frontend
  const request = rpc.request(0)
  request.send(d)
})
writePipe.write('ping')
