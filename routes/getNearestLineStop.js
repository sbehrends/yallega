const { send, json } = require('micro')

const randGeo = () => {
  if (Math.random() >= 0.5) {
    return (Math.random() * 0.001) - 0.001
  } else {
    return (Math.random() * -0.001) + 0.001
  }
}

const fakeStop = (data, lat, lng) => {
  return Object.assign({}, data, {
    lat: lat + randGeo(),
    lng: lng + randGeo(),
    key: `${data.busCode}-${data.stopCode}`,
    stopId: data.stopCode
  })
}

module.exports = async (req, res) => {
  const data = await json(req)
  let { lat, lng, amount } = data

  if (!amount) {
    amount = 3
  }

  if (!lat || !lng) {
    return { error: 'Required parameters not sent' }
  }

  var result = []

  result.push(fakeStop({
    busCode: 404,
    busName: '4',
    description: 'Al Norte',
    stopCode: 4041
  }, lat, lng))

  result.push(fakeStop({
    busCode: 404,
    busName: '4',
    description: 'Al Sur',
    stopCode: 4042
  }, lat, lng))

  result.push(fakeStop({
    busCode: 200,
    busName: '200',
    description: 'Al Norte',
    stopCode: 2001
  }, lat, lng))

  result.push(fakeStop({
    busCode: 200,
    busName: '200',
    description: 'Al Centro',
    stopCode: 2002
  }, lat, lng))

  result.push(fakeStop({
    busCode: 503,
    busName: '503',
    description: 'Al Este',
    stopCode: 5031
  }, lat, lng))

  result.push(fakeStop({
    busCode: 503,
    busName: '503',
    description: 'Al Oeste',
    stopCode: 5032
  }, lat, lng))

  res.setHeader('X-Total-Count', result.length)
  send(res, 200, result)
}
