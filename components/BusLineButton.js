import { PureComponent } from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'
import busColors from '../utils/busColors.json'

export default class BusLineButton extends PureComponent {
  static propTypes = {
    text: PropTypes.string,
    active: PropTypes.bool,
    onClick: PropTypes.func,
    loading: PropTypes.bool
  }

  static defaultProps = {
    text: '200',
    active: false,
    onClick: () => {},
    loading: false
  }

  render () {
    const { text, active, onClick, loading } = this.props

    let colors = busColors.default
    if (busColors[text]) {
      colors = busColors[text]
    }
    
    return (
      <button
        className={cn('BusIcon', { active, loading })}
        style={{backgroundColor: colors[2], color: colors[3]}}
        onClick={onClick.bind(this, text)}>
        <span style={{background: colors[0]}}></span><span style={{background: colors[1]}}></span>
        {text}
        <style jsx>{`
          .BusIcon {
            margin: 15px 10px;
            border: 0;
            outline: 0;
            padding: 0;
            flex-shrink: 0;
          }
          
          .BusIcon.loading {
            opacity: 0.6;
            animation: loading 0.8s infinite ease-in-out;
          }
          

          @keyframes loading {
            0% { 
              opacity: 1;
              transform: scale(1);
            }
            50% {
              opacity: 0.9;
              transform: scale(0.98);
            }
            100% {
              opacity: 1;
              transform: scale(1);
            }
          }


          span {
            display: block;
            height: 8px;
            border-radius: 4px 0px 0 0;
            width: 50%;
            float: left;
          }
          span:nth-child(2) {
            border-radius: 0px 4px 0 0;
          }

          .BusIcon {
            position: relative;
            user-select: none;
            width: 62px;
            height: 48px;
            line-height: 40px;
            text-align: center;
            font-size: 20px;
            font-weight: 600;
            background: white;
            border-radius: 6px;
            background: #FFFFFF;
            box-shadow: 0 2px 4px 0 rgba(0,0,0,0.13);
          }

          .BusIcon.active:after {
            content: ' ';
            position: absolute;
            bottom: -15px;
            left: 50%;
            margin-left: -8px;
            width: 0; 
            height: 0; 
            border-left: 8px solid transparent;
            border-right: 8px solid transparent;
            border-bottom: 8px solid white;
            z-index: 100;
          }
        `}</style>
      </button>
    )
  }
}
