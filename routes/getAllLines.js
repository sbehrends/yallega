const { send } = require('micro')
const { getSupportedBusLines } = require('../lib/server/fakeBus')

module.exports = async (req, res) => {
  let stops = await getSupportedBusLines()
  send(res, 200, { stops })
}
