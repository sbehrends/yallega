import { PureComponent } from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'

import BusLineButton from './BusLineButton'

export default class BusLines extends PureComponent {
  static propTypes = {
    busLines: PropTypes.array,
    activeLine: PropTypes.string,
    setActiveLine: PropTypes.func,
    shadow: PropTypes.bool,
    bottom: PropTypes.bool
  }

  static defaultProps = {
    busLines: [],
    activeLine: '',
    setActiveLine: () => {},
    shadow: true,
    bottom: true
  }

  render () {
    const { busLines, setActiveLine, activeLine, shadow, bottom } = this.props
    return (
      <div className={cn('BusLines', {shadow, bottom})}>
        <div className='slider'>
          {busLines.length === 0 &&
            <BusLineButton
              loading={true}
              text={'\u00a0'}/>
          }
          {busLines.map((line, i) =>
            <BusLineButton
              key={i}
              text={line}
              active={line === activeLine}
              onClick={setActiveLine}/>
          )}
        </div>
        <style jsx>{`
          .BusLines {
            width: 100%;
          }
          .BusLines.bottom {
            position: absolute;
            bottom: 0;
          }
          .BusLines.shadow:before {
            pointer-events: none;
            content: '';
            position: absolute;
            bottom: 0;
            width: 100%;
            height: 192px;
            opacity: 0.2;
            background-image: linear-gradient(-180deg, rgba(0,0,0,0.00) 0%, rgba(0,0,0,0.50) 100%);
          }
          .slider:after {
            content: '';
            display: block;
            min-width: 1px;
          }
          .slider {
            max-width: 100%;
            overflow-x: scroll;
            -webkit-overflow-scrolling: touch;
            display: flex;
          }

        `}</style>
      </div>
    )
  }
}
