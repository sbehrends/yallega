import { PureComponent } from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'
// import busColors from '../utils/busColors.json'

export default class StopMarker extends PureComponent {
  static propTypes = {
    active: PropTypes.bool
  }

  static defaultProps = {
    active: false
  }

  render () {
    const { active } = this.props
    
    return (
      <div className={cn('StopMarker', { active })}>
        <style jsx>{`
          .StopMarker {
            postion: absolute;
            width: 8px;
            height: 8px;
            z-index: 100;
            left: ${-8 / 2}px;
            top: ${-8 / 2}px;
            border-radius: 50%;
            background: #FFFFFF;
            box-shadow: 0 2px 4px 0 rgba(0,0,0,0.13);
          }
        `}</style>
      </div>
    )
  }
}
