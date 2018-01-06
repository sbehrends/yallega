import { PureComponent } from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'

export default class Logo extends PureComponent {
  static propTypes = {
    loading: PropTypes.bool,
    sad: PropTypes.bool
  }

  static defaultProps = {
    loading: false,
    sad: false
  }

  render () {
    const { loading, sad } = this.props

    return (
      <svg xmlns="http://www.w3.org/2000/svg" width="170" height="125" className={cn('root', { loading, sad })} viewBox="0 0 170 130">
        <path className="while bus" d="M148.2,31.4H52.8C41,31.4,31.5,41,31.5,52.7v52.2c0,3,2.5,5.5,5.5,5.5s5.5-2.5,5.5-5.5V74.4h116
          v30.5c0,3,2.5,5.5,5.5,5.5s5.5-2.5,5.5-5.5V52.7C169.5,41,160,31.4,148.2,31.4z M120.5,42.4v23h-39v-23H120.5z M42.5,52.7
          c0-5.7,4.6-10.3,10.3-10.3h19.7v23h-30V52.7z M129.5,65.4v-23h18.7c5.7,0,10.3,4.6,10.3,10.3v12.7H129.5z"/>
        <path className="while wheel-1" d="M64,124.4c-10.2,0-18.5-8.3-18.5-18.5S53.8,87.4,64,87.4s18.5,8.3,18.5,18.5
          S74.2,124.4,64,124.4z M64,98.4c-4.1,0-7.5,3.4-7.5,7.5s3.4,7.5,7.5,7.5s7.5-3.4,7.5-7.5S68.1,98.4,64,98.4z"/>
        <path className="while wheel-2" d="M137,124.4c-10.2,0-18.5-8.3-18.5-18.5s8.3-18.5,18.5-18.5s18.5,8.3,18.5,18.5
          S147.2,124.4,137,124.4z M137,98.4c-4.1,0-7.5,3.4-7.5,7.5s3.4,7.5,7.5,7.5s7.5-3.4,7.5-7.5S141.1,98.4,137,98.4z"/>
        <path className="while mid" d="M101,108.4c-4.6,0-9.8-3-10.8-3.6c-2.1-1.3-2.8-4.1-1.5-6.2c1.3-2.1,4-2.8,6.2-1.5l0,0
          c1.6,0.9,4.6,2.4,6.2,2.4c1.5,0,4.5-1.4,6.2-2.4c2.1-1.3,4.9-0.6,6.2,1.5c1.3,2.1,0.6,4.9-1.5,6.2
          C110.8,105.4,105.6,108.4,101,108.4z"/>
        <path className="while signal-1" d="M20,57c-2.4,0-4.5-2-4.5-4.4l0-0.2c0-0.2,0-0.4,0-0.5c0-19.8,16.1-36.2,35.9-36.5
          c0,0,0,0,0.1,0c2.5,0,4.5,2,4.5,4.4c0,2.5-1.9,4.5-4.4,4.6C36.6,24.7,24.5,37,24.5,51.9l0,0.5C24.6,54.9,22.6,57,20,57
          C20.1,57,20,57,20,57z"/>
        <path className="while signal-2" d="M3.5,56.1c-1.9,0-3.5-1.5-3.5-3.5l0-0.2c0-0.2,0-0.3,0-0.5C0,23.6,23,0.3,51.4,0c0,0,0,0,0,0
          c1.9,0,3.5,1.5,3.5,3.5c0,1.9-1.5,3.5-3.5,3.5C26.9,7.3,7,27.4,7,52l0,0.6C7,54.5,5.5,56.1,3.5,56.1C3.5,56.1,3.5,56.1,3.5,56.1z"
          />
        <style jsx>{`
          .root {
            padding-right: 30px;
            padding-bottom: 10px;
          }

          .while {
            fill: #FFFFFF;
          }

          .sad .mid {
            transform: rotate(180deg);
            transform-origin: center;
          }

          .loading .wheel-1, .loading .wheel-2 {
            animation: anim-wheels 0.8s infinite;
          }

          .loading .signal-1, .loading .signal-2 {
            animation: anim-signals 0.8s infinite;
          }
          .loading .signal-2 {
            animation-delay: 0.2s;
          }

          @keyframes anim-wheels {
            0% { 
              transform: translateY(0);
            }
            50% {
              transform: translateY(-3px);
            }
            100% {
              transform: translateY(0);
            }
          }
          @keyframes anim-signals {
            0% { 
              opacity: 1
            }
            50% {
              opacity: 0
            }
            100% {
              opacity: 1
            }
          }
        `}</style>
      </svg>
    )
  }
}
