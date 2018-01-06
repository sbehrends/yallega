const dispatch = require('micro-route/dispatch')
const next = require('next')
const moduleAlias = require('module-alias')

const getNearestLineStop = require('./routes/getNearestLineStop')
const getStopStatus = require('./routes/getStopStatus')
const getAllLines = require('./routes/getAllLines')

const dev = process.env.NODE_ENV !== 'production'

if (!dev) {
  moduleAlias.addAlias('react', 'preact-compat')
  moduleAlias.addAlias('react-dom', 'preact-compat')
}

const app = next({dev})
const handle = app.getRequestHandler()
var nextReady = false
app.prepare().then(() => {
  nextReady = true
})

module.exports = dispatch()
  .dispatch('/api/lines', ['GET'], getAllLines)
  .dispatch('/api/stop/locate', ['POST'], getNearestLineStop)
  .dispatch('/api/stop', ['POST'], getStopStatus)
  .otherwise((req, res) => {
    if (nextReady) {
      handle(req, res)
    }
  })
