// /* global Bare, BareKit */
const Worker = require('bare-worker')
new Worker(require.resolve('./nested.js'))
