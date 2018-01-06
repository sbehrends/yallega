import { PureComponent } from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'

export default class BusLineButton extends PureComponent {
  static propTypes = {
    children: PropTypes.string,
    onClick: PropTypes.func,
    fullWidth: PropTypes.bool,
    color: PropTypes.string,
    squared: PropTypes.bool,
    shadow: PropTypes.bool,
    disabled: PropTypes.bool
  }

  static defaultProps = {
    children: '',
    onClick: () => {},
    fullWidth: false,
    color: 'yellow',
    squared: false,
    shadow: false,
    disabled: false
  }

  render () {
    const { children, onClick, fullWidth, color, squared, shadow, disabled } = this.props
    
    return (
      <button
        className={cn('Button', color, { fullWidth, squared, shadow })}
        disabled={disabled}
        onClick={onClick}>
        {children}
        <style jsx>{`
          .Button {
            margin: 15px 10px;
            border: 0;
            outline: 0;
            padding: 0;
            
            line-height: 26px;
            padding: 10px 30px;
            border-radius: 40px;
            font-weight: 600;
            font-size: 16px;
          }
          .Button.squared {
            border-radius: 6px;
            line-height: 48px;
            width: 48px;
            text-align: center;
            padding: 0;
            margin: 5px 5px;
          }
          .Button:disabled {
            pointer-events: none;
            opacity: 0.8;
          }
          .Button.shadow {
            box-shadow: 0 2px 4px 0 rgba(0,0,0,0.2);
          }
          .Button.white {
            background: #FFFFFF;
          }
          .Button.yellow {
            background: #FFE066;
            color: #000;
          }
          .Button.green {
            background: #64DB92;
            color: #FFF;
          }
          .Button.grey {
            background: #DDDDDD;
            color: #000;
          }
          .Button.transparent {
            background: transparent;
          }
          .Button.fullWidth {
            width: 100%;
            margin: 10px 0;
          }
        `}</style>
      </button>
    )
  }
}
