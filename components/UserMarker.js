import { PureComponent } from 'react'

export default class UserLocation extends PureComponent {
  render () {
    return (
      <div className='Me'>
        <style jsx>{`
          .Me {
            postion: absolute;
            width: 18px;
            height: 18px;
            z-index: 100;
            left: ${-18 / 2}px;
            top: ${-18 / 2}px;
            background: red;
            border-radius: 50%;
            background: #4189E7;
            border: 2px solid white;
            box-shadow: 0 0 0 12px rgba(62,130,247,0.20);
          }
        `}</style>
      </div>
    )
  }
}
