const Worker = require('bare-worker')

module.exports = function (file = undefined) {
    if ( !file ){
        return Worker.parentPort
    }
    const worker = new Worker(file)
    return worker
}
