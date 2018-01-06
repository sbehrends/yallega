import { Component } from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'
import hexRgb from 'hex-rgb'
import IconBus from 'react-icons/lib/md/directions-bus'
import IconWarning from 'react-icons/lib/md/warning'

export default class ArrivalBusIcon extends Component {
  constructor (props) {
    super(props)
    const { percent } = this.props
    this.state = {
      init: false,
      style: {
        left: `${percent}%`
      }
    }
  }
  
  static propTypes = {
    percent: PropTypes.number,
    arriving: PropTypes.bool,
    timeLeft: PropTypes.number,
    warning: PropTypes.bool
  }

  static defaultProps = {
    percent: 0,
    arriving: false,
    timeLeft: 0,
    warning: false
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

  async calcPosition (timeLeft, percent) {
    this.setState({ style: { left: `${percent}%` } })
  }
  
  render () {
    const { arriving, color, warning } = this.props
    let { style } = this.state

    if (color) {
      const rgba = hexRgb(color)
      style.background = color
      style.boxShadow = `0 0 0 12px rgba(${rgba[0]}, ${rgba[1]}, ${rgba[2]}, 0.1)`
    }

    return (
      <span className={cn('ArrivalBusIcon', { arriving })} style={style}>
        { warning &&
          <IconWarning size={16} style={{color: 'white', marginBottom: 2}}/>
        }
        { !warning &&
          <IconBus size={16} style={{color: 'white'}}/>
        }
        <style jsx>{`
          .ArrivalBusIcon {
            position: absolute;
            display: block;
            width: 28px;
            height: 28px;
            top: -11px;
            text-align: center;
            line-height: 26px;
            z-index: 100;
            border-radius: 50%;
            background: #EDEDED;
            box-shadow: 0 0 0 12px rgba(250, 145, 5, 0.1);
            transition-property: all;
            transition-timing-function: ease;
            transition-duration: 2s;
          }
          .ArrivalBusIcon.arriving {
            background: #64DB92;
            box-shadow: 0 0 0 12px rgba(100, 210, 146, 0.1);
          }
        `}</style>
      </span>
    )
  }
}
