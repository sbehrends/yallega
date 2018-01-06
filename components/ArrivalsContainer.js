import { Component } from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'
// import IconRefresh from 'react-icons/lib/md/refresh'
import ArrivalBuses from './ArrivalBuses'
import ArrivalTabHeader from './ArrivalTabHeader'
import ArrivalProgress from './ArrivalProgress'

import { titleCase } from '../utils'

export default class extends Component {
  static propTypes = {
    stops: PropTypes.array,
    active: PropTypes.bool,
    busesInStops: PropTypes.object,
    activeLine: PropTypes.string,
    setActiveStop: PropTypes.func
  }

  static defaultProps = {
    stops: [],
    loading: false,
    active: false,
    busesInStops: {},
    activeLine: '',
    setActiveStop: () => {}
  }

  constructor (props) {
    super(props)
    this.state = {
      activeStop: 0
    }
  }

  // componentWillUpdate (nextProps) {
  //   const { activeLine } = this.props
  //   if (nextProps.activeLine !== activeLine) {
  //     // this.setState({ activeStop: 0 })
  //     this.setActiveStop(0)
  //   }
  // }

  componentDidUpdate (prevProps) {
    const { activeLine } = this.props
    if (prevProps.activeLine !== activeLine) {
      // this.setState({ activeStop: 0 })
      this.setActiveStop(0)
    }
  }

  setActiveStop = (index) => {
    this.setState({ activeStop: index })

    const active = this.props.stops.filter((stop, i) => {
      return i === index
    })

    if (active.length === 1) {
      this.props.setMapCenter(active[0].lat, active[0].lng)
      this.props.setActiveStop(active[0].stopId)
    }
  }

  render () {
    const { active, stops, busesInStops } = this.props
    const { activeStop } = this.state

    let stopDirection = stops.map(a => titleCase(a.description))
    stopDirection = [...new Set(stopDirection)]
    
    return (
      <div className={cn('ArrivalsContainer', { active: active })}>
        <ArrivalTabHeader headers={stopDirection} active={activeStop} setActiveStop={this.setActiveStop} />
        <div className='container'>
          {stops.map((stop, i) => {
            if (i !== activeStop) {
              return
            }

            var latestBuses = busesInStops[stop.stopId]
            var buses = []

            if (latestBuses) {
              buses = latestBuses.buses
            }

            if (stop.isLoading && buses.length === 0) {
              return <ArrivalProgress key={i} loading={true} />
            }

            return (
              <div key={i}>
                <ArrivalBuses buses={buses} />
              </div>
            )
          }
          )}
        </div>
        <style jsx>{`
          .ArrivalsContainer {
            position: relative;
            width: 100%;
            background: white;
            overflow: hidden;
            max-height: 0;
            transition: max-height 0.35s ease-out;
          }
          .ArrivalsContainer.active {
            max-height: 600px;
          }
          .container {
            padding: 15px 10px;
          }
        `}</style>
      </div>
    )
  }
}
