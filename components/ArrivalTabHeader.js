import { Component } from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'

export default class ArrivalTabHeader extends Component {
  static propTypes = {
    headers: PropTypes.array,
    active: PropTypes.number,
    setActiveStop: PropTypes.func
  }

  static defaultProps = {
    headers: [],
    active: '',
    setActiveStop: () => {}
  }

  render () {
    const { headers, active, setActiveStop } = this.props
    
    return (
      <div className={cn(['ArrivalTabHeader'])}>
        <div className='container'>
          {headers.map((header, i) =>
            <button
              key={i}
              className={cn({ active: (i === active) })}
              onClick={setActiveStop.bind(this, i)}>{header}</button>
          )}
        </div>
        <style jsx>{`
          .ArrivalTabHeader {
            display: flex;
            justify-content: center;
            margin-top: 30px;
          }
          .container {
            background: #F7F7F7;
            border-radius: 20px;
          }
          button {
            border: 0;
            outline: 0;
            padding: 10px 15px;
            min-width: 100px;
            background: #F7F7F7;
            border-radius: 20px;
            font-weight: 600;
            white-space: nowrap;
            direction: rtl;
            overflow: hidden;
            text-overflow: ellipsis;
            max-width: 150px;
          }
          button.active {
            background: #FEE379;
            
          }
        `}</style>
      </div>
    )
  }
}
