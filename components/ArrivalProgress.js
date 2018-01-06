import { Component } from 'react'
import PropTypes from 'prop-types'

import IconPerson from 'react-icons/lib/md/person'
import ArrivalProgressBar from './ArrivalProgressBar'
import ArrivalPill from './ArrivalPill'

export default class ArrivalProgress extends Component {
  static propTypes = {
    timeLeft: PropTypes.number,
    arriving: PropTypes.bool,
    loading: PropTypes.bool,
    noBus: PropTypes.bool
  }

  static defaultProps = {
    timeLeft: 0,
    arriving: false,
    loading: false,
    noBus: false
  }

  render () {
    const { timeLeft, arriving, loading, noBus } = this.props

    let personStyle = {color: '#64DB92'}
    if (loading || noBus) {
      personStyle = {color: '#EDEDED'}
    }

    let percent = (timeLeft * 100) / 15
    if (timeLeft > 15) {
      percent = 100
    }

    // Hotfix so shadown on icon dont overlap with pill
    if (percent > 86) {
      percent = 86
    }

    let pillColor

    if (percent > 66) {
      pillColor = '#FA7A00'
    } else if (percent > 31) {
      pillColor = '#FBD013'
    } else if (percent >= 0 && !noBus) {
      pillColor = '#65D896'
    } else {
      pillColor = '#EDEDED'
    }

    let iconColor = pillColor

    if (noBus) {
      percent = 86
      iconColor = '#EB2F34'
    }

    return (
      <div className='ArrivalProgress'>
        <div className='IconPerson'>
          <IconPerson size={24} style={personStyle} />
        </div>
        <div className='ArrivalProgressBar'>
          <ArrivalProgressBar loading={loading} noBus={noBus} iconColor={iconColor} percent={percent} arriving={arriving} timeLeft={timeLeft} />
        </div>
        <div className='ArrivalPill'>
          <ArrivalPill timeLeft={timeLeft} noBus={noBus} arriving={arriving} color={pillColor} loading={loading}/>
        </div>
        <style jsx>{`
          .ArrivalProgress {
            display: flex;
            align-items: center;
            padding: 20px 0;
          }
          @media (max-width: 320px) {
            .ArrivalProgress:nth-child(n+3) {
              display: none;
            }
          }
          .IconPerson, .ArrivalPill  {
            flex-grow: 1;
          }
          .ArrivalProgressBar {
            flex-grow: 16;
            height: 6px;
            padding: 0 10px;
          }
          h2, h3 {
            margin: 0;
            font-weight: 400;
          }
          h2 {
            font-size: 18px;
            color: #525252;
            margin-bottom: 2px;
          }
          h3 {
            font-size: 16px;
            color: #ADADAD;
          }
        `}</style>
      </div>
    )
  }
}
