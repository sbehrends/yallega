import { Component } from 'react'

export default class Loading extends Component {
  render () {
    return (
      <div className='root'>
        <div className='circle'>
        </div>
        <style jsx>{`
          .root {
            background: #F1F2F2;
            display: flex;
            flex: 1 1 100%;
            z-index: 9999;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .circle {
            width: 100px;
            height: 100px;
            background-color: #FEE379;

            border-radius: 100%;  
            animation: sk-scaleout 0.8s infinite ease-in-out;
          }

          @keyframes sk-scaleout {
            0% { 
              transform: scale(0);
            } 100% {
              transform: scale(1.0);
              opacity: 0;
            }
          }
        `}</style>
      </div>
    )
  }
}
