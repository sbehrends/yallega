/* global fetch */
import 'isomorphic-fetch'

export const getNearestStops = (lat, lng, amount = 4) => {
  return new Promise((resolve, reject) => {
    fetch(`/api/stop/locate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        lat,
        lng,
        amount
      })
    })
    .then(res => res.json())
    .then(json => {
      resolve(json)
    })
    .catch(err => {
      reject(err)
    })
  })
}

export const getStopStatus = (stops) => {
  return new Promise((resolve, reject) => {
    fetch(`/api/stop`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        stops
      })
    })
    .then(res => res.json())
    .then(json => {
      resolve(json)
    })
    .catch(err => {
      reject(err)
    })
  })
}

export const getLines = () => {
  return new Promise((resolve, reject) => {
    fetch(`/api/lines`)
    .then(res => res.json())
    .then(json => {
      resolve(json.stops)
    })
    .catch(err => {
      reject(err)
    })
  })
}
