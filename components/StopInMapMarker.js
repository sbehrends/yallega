import { PureComponent } from 'react'
import PropTypes from 'prop-types'
import busColors from '../utils/busColors.json'

export default class StopMarker extends PureComponent {
  static propTypes = {
    busName: PropTypes.string
  }

  static defaultProps = {
    busName: 'default'
  }

  render () {
    const { busName } = this.props
    let colors = busColors.default
    if (busColors[busName]) {
      colors = busColors[busName]
    }

    return (
      <div className='Stop' style={{backgroundColor: colors[2], color: colors[3]}}>
        <span style={{background: colors[0]}}></span><span style={{background: colors[1]}}></span>
        {busName}
        <style jsx>{`
          span {
            display: block;
            height: 5px;
            border-radius: 2px 0px 0 0;
            width: 50%;
            float: left;
          }
          span:nth-child(2) {
            border-radius: 0px 2px 0 0;
          }

          .Stop {
            user-select: none;
            position: absolute;
            width: 32px;
            height: 32px;
            line-height: 23px;
            text-align: center;
            font-size: 14px;
            font-weigth: 600;
            left: -12px;
            top: -38px;
            background: white;
            border-radius: 4px;
            background: #FFFFFF;
            border: 2px solid #FFFFFF;
            box-shadow: 0 2px 4px 0 rgba(0,0,0,0.25);
          }
          .Stop:after, .Stop:before {
            top: 100%;
            left: 50%;
            border: solid transparent;
            content: " ";
            height: 0;
            width: 0;
            position: absolute;
            pointer-events: none;
          }

          .Stop:after {
            border-color: rgba(255, 255, 255, 0);
            border-top-color: #FFFFFF;
            border-width: 3px;
            margin-left: -3px;
          }
          .Stop:before {
            border-color: rgba(243, 244, 244, 0);
            border-top-color: #FFFFFF;
            border-width: 8px;
            margin-left: -8px;
          }
        `}</style>
      </div>
    )
  }
}
