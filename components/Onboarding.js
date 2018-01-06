import { Component } from 'react'
import PropTypes from 'prop-types'

import Button from './Button'

export default class Loading extends Component {
  static propTypes = {
    onNext: PropTypes.func
  }

  static defaultProps = {
    onNext: () => {}
  }
  render () {
    const { onNext } = this.props
    return (
      <div className='root'>
        <img src="/static/onboarding.png" />
        <p>Para brindarte información del siguiente colectivo arribando necesitamos que nos des acceso a tu localización</p>
        <div className='button'>
          <Button fullWidth={true} onClick={onNext}>Continuar</Button>
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
          img {
            max-width: 200px;
          }
          p {
            margin-top: 50px;
            text-align: center;
            font-weight: 200;
            font-size: 12px;
          }
          .button {
            margin-top: 30px;
          }
        `}</style>
      </div>
    )
  }
}
