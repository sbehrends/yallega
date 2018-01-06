const getTime = require('date-fns/get_time')
const { each } = require('async')

const getSupportedBusLines = () => {
  return [
    { busCode: 404, busName: '4' },
    { busCode: 200, busName: '200' },
    { busCode: 503, busName: '503' }
  ]
}

const rand = (min, max) => {
  return Math.floor((Math.random() * max) + min)
}

const fakeBus = (min, max) => {
  let timeToStop = rand(min, max)
  const arriving = timeToStop <= 1
  if (arriving) {
    timeToStop = 0
  }
  return {
    data: 'Bus in transit',
    arriving,
    time: timeToStop,
    lat: 0,
    lng: 0
  }
}

const getBusStop = (busStop, busCode) => {
  return new Promise((resolve, reject) => {
    let result = {
      busStop,
      busCode,
      lastUpdate: getTime(new Date()),
      buses: []
    }

    if (busCode === 404) {
      // Fake loading
      setTimeout(() => {
        resolve(result)
      }, 3000)
      return
    }

    result.buses.push(fakeBus(1, 2))
    result.buses.push(fakeBus(3, 5))
    if (busCode === 200) {
      result.buses.push(fakeBus(5, 15))
    }
    resolve(result)
  })
}

const getManyBusStop = (busStops) => {
  return new Promise((resolve, reject) => {
    let result = {}
    each(busStops, async (stop) => {
      const route = await getBusStop(stop.busStop, stop.busCode)
      result[stop.busStop] = route
    }, (err) => {
      if (err) {
        return reject(err)
      }
      resolve(result)
    })
  })
}

module.exports = {
  getSupportedBusLines,
  getManyBusStop,
  getBusStop
}
