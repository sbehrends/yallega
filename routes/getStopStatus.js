const { send, json } = require('micro')
const fake = require('../lib/server/fakeBus')

module.exports = async (req, res) => {
  const data = await json(req)
  const { stops } = data

  if (!stops) {
    return {error: 'Required parameters not sent'}
  }

  if (typeof stops !== 'object') {
    return {error: 'Stops not an array'}
  }

  if (stops.length === 0) {
    return {error: 'Required parameters not sent'}
  }
  
  let results = await fake.getManyBusStop(stops)

  send(res, 200, results)
}
