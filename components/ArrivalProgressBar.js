import { Component } from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'
import ArrivalBusIcon from './ArrivalBusIcon'

export default class ArrivalProgressBar extends Component {
  constructor (props) {
    super(props)
    const { percent } = this.props
    this.state = {
      init: false,
      style: {
        width: `calc(${percent}% + 14px)`
      }
    }
  }

  static propTypes = {
    percent: PropTypes.number,
    loading: PropTypes.bool,
    timeLeft: PropTypes.number,
    arriving: PropTypes.bool,
    iconColor: PropTypes.string,
    noBus: PropTypes.bool
  }

  static defaultProps = {
    percent: 0,
    loading: false,
    timeLeft: 0,
    arriving: false,
    iconColor: null,
    noBus: false
  }

  componentDidMount () {
    const { timeLeft, percent } = this.props
    this.calcPosition(timeLeft, percent)
  }

  componentWillUpdate (nextProps) {
    const { timeLeft, percent } = this.props
    if (nextProps.timeLeft !== timeLeft || nextProps.percent !== percent) {
      this.calcPosition(nextProps.timeLeft, nextProps.percent)
    }
  }

  // setStateAsync (state) {
  //   return new Promise((resolve) => {
  //     this.setState(state, resolve)
  //   })
  // }

  // wait (time) {
  //   return new Promise((resolve) => {
  //     setTimeout(resolve, time)
  //   })
  // }

  async calcPosition (timeLeft, percent) {
    this.setState({ style: { width: `calc(${percent}% + 14px)` } })
  }

  render () {
    const { percent, loading, timeLeft, arriving, iconColor, noBus } = this.props
    const { style } = this.state
    return (
      <div className={cn('ArrivalProgressBar', { loading, noBus })}>
        { !loading &&
          <ArrivalBusIcon color={iconColor} warning={noBus} arriving={arriving} percent={percent} timeLeft={timeLeft} />
        }
        <div className='progressBar' style={style} />
        <style jsx>{`
          .ArrivalProgressBar {
            position: relative;
            height: 100%;
            width: 100%;
            max-width: 300px;
            background: #EDEDED;
            border-radius: 3px;
          }

          .progressBar {
            background-image: linear-gradient(265deg, #FA2A00 0%, #FA7A00 31%, #FBD013 66%, #65D896 100%);
            box-shadow: inset 0 1px 3px 0 rgba(0,0,0,0.06);
            background-size: 24em 0.25em;
            height: 100%;
            position: relative;
            border-radius: 3px;
            transition-property: width;
            transition-timing-function: ease;
            transition-duration: 2s;
            opacity: 1;
          }
          
          .ArrivalProgressBar.loading {
            background: linear-gradient(to right, #eeeeee 8%, #dddddd 18%, #eeeeee 33%);
            animation-duration: 5s;
            animation-fill-mode: forwards;
            animation-iteration-count: infinite;
            animation-name: placeHolder;
            animation-timing-function: linear;
          }

          @keyframes placeHolder{
              0%{
                  background-position: -320px 0
              }
              100%{
                  background-position: 320px 0
              }
          }

          .ArrivalProgressBar.loading .progressBar {
            opacity: 0;
          }

          .ArrivalProgressBar.noBus .progressBar {
            opacity: 0;
          }
        `}</style>
      </div>
    )
  }
}
