import { Component } from 'react'
import PropTypes from 'prop-types'

import ArrivalProgress from './ArrivalProgress'

export default class ArrivalBuses extends Component {
  static propTypes = {
    buses: PropTypes.array
  }

  static defaultProps = {
    buses: []
  }

  render () {
    const { buses } = this.props
    
    if (buses.length > 0) {
      return (
        <div>
          {buses.slice(0, 3).map((bus, o) =>
            <ArrivalProgress key={o} timeLeft={bus.time} arriving={bus.arriving} />
          )}
        </div>
      )
    }

    if (buses.length === 0) {
      return <ArrivalProgress noBus={true} />
    }
  }
}
