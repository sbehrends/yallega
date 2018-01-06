import { Component } from 'react'
import PropTypes from 'prop-types'

export default class ArrivalTitle extends Component {
  static propTypes = {
    title: PropTypes.string,
    subtitle: PropTypes.string
  }

  static defaultProps = {
    title: ''
  }

  render () {
    const { title, subtitle } = this.props

    return (
      <div className='ArrivalTitle'>
        <h2>{title}</h2>
        {subtitle &&
          <h3>{subtitle}</h3>
        }
        <style jsx>{`
          .ArrivalTitle {
            margin: 18px 0;
            user-select: none;
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
