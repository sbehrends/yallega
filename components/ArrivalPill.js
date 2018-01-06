import { Component } from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'

export default class ArrivalPill extends Component {
  static propTypes = {
    title: PropTypes.string,
    subtitle: PropTypes.string,
    className: PropTypes.string,
    arriving: PropTypes.bool,
    loading: PropTypes.bool,
    color: PropTypes.string,
    noBus: PropTypes.bool
  }

  static defaultProps = {
    title: '',
    className: '',
    arriving: false,
    loading: false,
    color: null,
    noBus: false
  }

  render () {
    const { timeLeft, classNames, arriving, loading, color, noBus } = this.props
    let text = `${timeLeft} min`
    
    if (arriving) {
      text = 'ya llega'
    }
    
    if (loading) {
      text = '\u00a0'
    }

    if (noBus) {
      text = '—'
    }
    
    let style
    if (color && !loading) {
      style = {
        background: color
      }
    }

    return (
      <div className={cn(['ArrivalPill', classNames], { arriving, loading, noBus })} style={style}>
        {text}
        <style jsx>{`
          .ArrivalPill {
            flex-grow: 10;
            flex-shrink: 1;
            flex-basis:auto;

            min-width: 70px;
            text-align: center;

            font-size: 14px;
            line-height: 26px;
            padding: 0 10px;
            color: white;
            font-weight: 400;
            background: #F99105;
            border-radius: 4px;
            user-select: none;
          }

          .ArrivalPill.arriving {
            background: #64DB92;
          }

          .ArrivalPill.loading, .ArrivalPill.noBus {
            background: #EDEDED;
          }
        `}</style>
      </div>
    )
  }
}

/* Rectangle 7: */
