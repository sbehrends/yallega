import { Component } from 'react'
import PropTypes from 'prop-types'

import Button from './Button'
import Logo from './Logo'

export default class LoadingScreen extends Component {
  static propTypes = {
    onNext: PropTypes.func,
    showNext: PropTypes.bool
  }

  static defaultProps = {
    onNext: () => {},
    showNext: true
  }

  render () {
    const { onNext, showNext } = this.props

    let showStyle = { visibility: 'hidden' }
    if (showNext) {
      showStyle = { visibility: 'visible' }
    }
    return (
      <div className='root'>
        <div className="logo">
          <Logo loading={!showNext} />
        </div>
        
        <div style={showStyle} >
          <p>Para brindarte información del siguiente colectivo arribando necesitamos que <strong>nos des acceso a tu localización</strong></p>
          <div className='button'>
            <Button fullWidth={true} color={'green'} onClick={onNext}>Continuar</Button>
          </div>
        </div>

        <style jsx>{`
          .root {
            background: white;
            display: flex;
            flex: 1 1 100%;
            z-index: 9999;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
            padding: 0 40px;
          }
          
          .logo {
            background: #FEE379;
            background-image: linear-gradient(-180deg, #FF8008 0%, #FFC837 100%);
            height: 200px;
            width: 200px;
            border-radius: 180px;
            display: flex;
            align-items: center;
            justify-content: center;
          }

          img {
            max-width: 200px;
          }
          p {
            margin-top: 50px;
            text-align: center;
            font-weight: 200;
            font-size: 12px;
            max-width: 280px;
          }
          .button {
            margin-top: 30px;
          }
        `}</style>
      </div>
    )
  }
}
