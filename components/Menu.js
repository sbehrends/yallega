import { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Button from './Button'
import IconRefresh from 'react-icons/lib/md/refresh'
import IconFeedback from 'react-icons/lib/md/feedback'

export default class Menu extends PureComponent {
  static propTypes = {
    items: PropTypes.object
  }

  static defaultProps = {
    items: {}
  }

  render () {
    const { items, reloadNearestLines, toggleFeedback } = this.props
    
    return (
      <div className='root'>
        <Button color='white' shadow={true} squared={true} onClick={toggleFeedback}>
          <IconFeedback size={20} style={{color: 'black', marginBottom: 2}}/>
        </Button>
        { items.reloadLines &&
        <Button color='white' shadow={true} squared={true} onClick={reloadNearestLines}>
          <IconRefresh size={20} style={{color: 'black', marginBottom: 2}}/>
        </Button>
        }
        <style jsx>{`
          .root {
            position: absolute;
            z-index: 10;
            top: 0;
            right: 0;
            padding: 5px;
            display: flex;
            flex-direction: column;
          }
          .button {
            padding: 10px;
            background: grey;
          }
        `}</style>
      </div>
    )
  }
}
