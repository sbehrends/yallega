/* global localStorage */
import { Component } from 'react'
import ReactGA from 'react-ga'
import { getDistanceSimple } from 'geolib'

import { getNearestStops, getStopStatus } from '../lib/client/api'

import Map from '../components/Map'
import BusLines from '../components/BusLines'
import ArrivalsContainer from '../components/ArrivalsContainer'
import LoadingScreen from '../components/LoadingScreen'
import Menu from '../components/Menu'
import Feedback from '../components/Feedback'

export default class extends Component {
  constructor (props) {
    super(props)

    this.state = {
      deviceLocation: {
        waiting: true,
        promt: false,
        denied: false,
        error: false,
        last: null
      },
      willOnboard: true,
      map: {},
      mapCenter: null,
      lastReqPosition: null,
      nearBusStopsLoading: false,
      menu: {
        reloadLines: false
      },
      nearBusStops: [], // Near stops with details
      nearBusLines: [], // Unique busNames
      activeLine: null, // Selected line
      activeStop: null,
      nearBusesLoading: false,
      nearBuses: {}, // State of loaded stops with buses
      print: {},
      openFeedback: false
    }
  }

  componentDidMount () {
    ReactGA.initialize('UA-98870416-1')
    ReactGA.pageview(window.location.pathname + window.location.search)
    if (localStorage) {
      const didAllowd = localStorage.getItem('willAllowLocation')
      if (!didAllowd) {
        this.setState({ willOnboard: true })
        return
      }
      if (didAllowd) {
        this.setState({ willOnboard: false })
        ReactGA.event({
          category: 'User',
          action: 'Will get location'
        })
        this.getDeviceLocation()
      }
    }
  }

  willAllowLocation = () => {
    this.setState({ willOnboard: false })
    localStorage.setItem('willAllowLocation', true)
    this.getDeviceLocation()
  }

  getDeviceLocation = () => {
    navigator.geolocation.getCurrentPosition(this.parserDeviceLocation, this.errorDeviceLocation, {
      enableHighAccuracy: false,
      timeout: 15000
      // maximumAge: Infinity
    })
  }

  parserDeviceLocation = (position) => {
    // return
    const { latitude, longitude } = position.coords
    const { deviceLocation, nearBusStops } = this.state

    var newState = deviceLocation
    newState.last = { lat: latitude, lng: longitude }
    newState.waiting = false

    this.setMapCenter(latitude, longitude)
    this.setState({ deviceLocation: newState }, () => {
      if (nearBusStops.length === 0) {
        this.fetchNearestStops()
      }
    })
  }

  errorDeviceLocation = () => {
    const fixedLatLng = {
      lat: -34.565793,
      lng: -58.453227
    }
    this.setState({
      willOnboard: false,
      deviceLocation: {
        waiting: false,
        promt: true,
        denied: true,
        error: true,
        last: fixedLatLng
      }
    })
    this.setMapCenter(fixedLatLng.lat, fixedLatLng.lng)
    this.fetchNearestStops()
    ReactGA.event({
      category: 'User',
      action: 'Blocked location'
    })
  }

  fetchNearestStops = () => {
    const { deviceLocation, map } = this.state
    let lat, lng
    if (map.center) {
      lat = map.center.lat
      lng = map.center.lng
    }
    if (!map.center) {
      lat = deviceLocation.last.lat
      lng = deviceLocation.last.lng
    }
    this.setState({ nearBusStopsLoading: true, lastReqPosition: { lat, lng } })
    getNearestStops(lat, lng, 6)
      .then(results => {
        // Get unique available bus lines
        let nearBusLines = results.map(a => a.busName)
        nearBusLines = [...new Set(nearBusLines)]

        let nearBusStops = results.map((stop) => {
          var o = Object.assign({}, stop)
          o.isLoading = false
          return o
        })
        
        this.setState({ nearBusStops, nearBusLines, nearBusStopsLoading: false }, () => {
          // this.fetchAllStopStatus()
        })
      })
      .catch(console.log)
  }

  fetchAllStopStatus = () => {
    const { nearBusStops } = this.state
    this.setState({ nearBusesLoading: true })
    const requestStops = nearBusStops.map(stop => {
      return { busStop: stop.stopId, busCode: stop.busCode }
    })
    getStopStatus(requestStops)
      .then(results => {
        this.setState({ nearBuses: {...this.state.nearBuses, ...results}, nearBusesLoading: false })
        // setTimeout(() => {
        //   this.fetchAllStopStatus()
        // }, 30000)
      })
  }

  fetchActiveStopStatus = () => {
    const { activeLine, nearBusStops } = this.state
    const activeLineStops = nearBusStops.filter(stop => {
      return stop.busName === activeLine
    })
    const requestStops = activeLineStops.map(stop => {
      return { busStop: stop.stopId, busCode: stop.busCode }
    })
    var newNearBusStops = nearBusStops.map((stop) => {
      if (stop.busName === activeLine) {
        stop.isLoading = true
      }
      return stop
    })
    this.setState({ nearBusStops: newNearBusStops, nearBusesLoading: true })

    getStopStatus(requestStops)
      .then(results => {
        var newNearBusStops = nearBusStops.map((stop) => {
          if (stop.busName === activeLine) {
            stop.isLoading = false
          }
          return stop
        })
        this.setState({ nearBusStops: newNearBusStops, nearBuses: {...this.state.nearBuses, ...results}, nearBusesLoading: false })
      })
  }

  setActiveLine = (line) => {
    ReactGA.event({
      category: 'User',
      action: 'Set active line',
      label: line
    })
    this.setState({ activeLine: line }, () => {
      this.fetchActiveStopStatus()
    })
  }
  
  setMapCenter = (lat, lng) => {
    this.setState({ mapCenter: { lat, lng } })
  }

  onMapChange = (state) => {
    const { lastReqPosition, menu } = this.state
    const distance = getDistanceSimple(state.center, lastReqPosition, 100)
    let newMenu = menu
    if (distance && distance >= 300) {
      newMenu = Object.assign({}, menu, {
        reloadLines: true
      })
    }
    this.setState({ map: state, menu: newMenu })
  }

  setActiveStop = (index) => {
    this.setState({ activeStop: index })
    ReactGA.event({
      category: 'User',
      action: 'Set active stop',
      label: index
    })
  }
  
  reloadNearestLines = () => {
    const { menu } = this.state
    const newMenu = Object.assign({}, menu, {
      reloadLines: false
    })
    this.setState({ menu: newMenu, activeLine: null, activeStop: null, nearBuses: {}, nearBusLines: [], nearBusStops: [] })
    this.fetchNearestStops()
  }

  toggleFeedback = () => {
    const { openFeedback } = this.state
    this.setState({ openFeedback: !openFeedback })
    ReactGA.event({
      category: 'User',
      action: 'Toggle Feedback',
      label: !openFeedback
    })
  }

  render () {
    const { deviceLocation, nearBusLines, mapCenter, willOnboard, menu, openFeedback } = this.state
    const { last, denied } = deviceLocation
    const { activeLine, activeStop } = this.state

    const { nearBusStops, nearBuses } = this.state
    const activeLineStops = nearBusStops.filter(stop => {
      return stop.busName === activeLine
    })
    let activeBusesInStops = {}
    if (activeLineStops.length >= 1) {
      let busCode = activeLineStops[0].busCode
      activeBusesInStops = Object.keys(nearBuses)
        .filter(key => nearBuses[key].busCode === busCode)
        .reduce((obj, key) => {
          obj[key] = nearBuses[key]
          return obj
        }, {})
    }

    return (
      <main>
        { willOnboard &&
          <LoadingScreen
            showNext={true}
            onNext={this.willAllowLocation}/>
        }
        { !willOnboard && !last &&
          <LoadingScreen showNext={false} />
        }
        { last &&
          <div className='map'>
            <Menu items={menu} reloadNearestLines={this.reloadNearestLines} toggleFeedback={this.toggleFeedback} />
            <Map
              show={mapCenter}
              center={mapCenter}
              showUserLocation={!denied}
              deviceLocation={last}
              onMapChange={this.onMapChange}
              busStops={nearBusStops}
              activeStop={activeStop} />
            <BusLines
              busLines={nearBusLines}
              activeLine={activeLine}
              setActiveLine={this.setActiveLine}
              activeStop={activeStop} />
          </div>
        }
        <div className='detailView'>
          <ArrivalsContainer
            active={(activeLine !== null)}
            activeLine={activeLine}
            busesInStops={activeBusesInStops}
            stops={activeLineStops}
            setActiveStop={this.setActiveStop}
            setMapCenter={this.setMapCenter}/>
        </div>
        <Feedback active={openFeedback} onClose={this.toggleFeedback} />
        <style jsx>{`
          main {
            height: 100%;
            display: flex;
            flex-direction: column;
          }
          .map {
            flex: 1;
            flex: 1 0 auto;
            position: relative;
            display: flex;
          }
          .detailView {
            // position: absolute;
            // flex: 1;
            // bottom: 0;

            flex: 0 0 auto;
            width: 100%;
            z-index: 998;
            display: flex;
            flex-direction: column;
          }
        `}</style>
      </main>
    )
  }
}
