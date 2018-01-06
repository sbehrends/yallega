import { Component } from 'react'
import GoogleMapReact from 'google-map-react'
import PropTypes from 'prop-types'

import config from '../config'
import UserMarker from './UserMarker'
import StopMarker from './StopMarker'
import StopInMapMarker from './StopInMapMarker'
import mapStyle from '../utils/mapStyle.json'

export default class Map extends Component {
  static propTypes = {
    zoom: PropTypes.number,
    center: PropTypes.object,
    deviceLocation: PropTypes.object,
    busStops: PropTypes.array,
    activeStop: PropTypes.string,
    showUserLocation: PropTypes.bool
  }

  static defaultProps = {
    center: { lat: -34.556318, lng: -58.461881 },
    zoom: 17,
    busStops: [],
    activeStop: '',
    showUserLocation: true
  }

  mapOptions = () => {
    return {
      styles: mapStyle,
      // minZoom: 17,
      maxZoom: 20,
      disableDefaultUI: true,
      gestureHandling: 'greedy',
      buttons: null
    }
  }
  
  render () {
    const { center, zoom, deviceLocation, unsetLineActive, busStops, activeStop, onMapChange, show, showUserLocation } = this.props

    if (!show) {
      return <div></div>
    }

    return (
      <GoogleMapReact
        style={{flex: 1, height: '100%', width: '100%', position: 'absolute'}}
        bootstrapURLKeys={{key: config.mapsKey}}
        language='es'
        // eslint-disable-next-line no-return-assign
        ref={ r => this._googleMapRef = r }
        resetBoundsOnResize
        options={this.mapOptions}
        center={center}
        zoom={zoom}
        onClick={unsetLineActive}
        onChange={onMapChange}>
        { deviceLocation && showUserLocation &&
          <UserMarker
            lat={deviceLocation.lat}
            lng={deviceLocation.lng} />
        }
        {busStops.map((stop, i) =>
            <StopMarker
              key={stop.stopId}
              active={stop.stopId === activeStop}
              lat={stop.lat}
              lng={stop.lng} />
          )}
        {busStops.map((stop, i) => {
          if (stop.stopId === activeStop) {
            return <StopInMapMarker
              key={stop.stopId}
              busName={stop.busName}
              lat={stop.lat}
              lng={stop.lng} />
          }
        })}

      </GoogleMapReact>
    )
  }
}
