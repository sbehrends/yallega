/* global fetch */
import 'isomorphic-fetch'
import { Component } from 'react'
import cn from 'classnames'
import PropTypes from 'prop-types'
import { getLines } from '../lib/client/api'

import BusLines from './BusLines'
import IconClose from 'react-icons/lib/md/close'
import Button from './Button'

export default class Feedback extends Component {
  static propTypes = {
    active: PropTypes.bool
  }

  static defaultProps = {
    active: false
  }

  constructor (props) {
    super(props)
    this.state = {
      email: null,
      message: null,
      error: null,
      sending: null,
      sent: null,
      lines: []
    }
  }

  componentWillMount () {
    getLines()
    .then(lines => {
      this.setState({ lines })
    })
  }

  checkForm = () => {
    const { email, message } = this.state
    if (!email || email === '') {
      this.setState({ error: { input: 'email', message: 'El email no es valido' } })
      return
    }
    if (!message || message === '') {
      this.setState({ error: { input: 'message', message: 'Deja tu mensaje' } })
      return
    }
    this.sendFeedback()
  }

  sendFeedback = () => {
    const { email, message } = this.state
    const appId = '6353'
    const appKey = 'd2Un3Trt5YQvDF2exnD7JuyZ6zxrDl39dEBCd4wDl09AwSPbjRwGG55ta8W6k4xA'
    this.setState({ sending: true })
    fetch(`https://doorbell.io/api/applications/${appId}/submit?key=${appKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email,
        message
      })
    })
    .then(res => res.text())
    .then(result => {
      this.setState({ sending: false, sent: false })
      if (result === 'Your email address is required') {
        this.setState({ error: { input: 'email', message: 'El email no es valido' } })
        return
      }
      if (result === 'Invalid email address') {
        this.setState({ error: { input: 'email', message: 'El email no es valido' } })
        return
      }
      if (result === 'Your message is required') {
        this.setState({ error: { input: 'message', message: 'Deja tu mensaje' } })
        return
      }
      if (result === 'Feedback sent!') {
        this.setState({ error: null, sent: true, email: '', message: '' })
        this.refs.email.value = ''
        this.refs.message.value = ''
        return
      }
      this.setState({ error: { input: '', message: 'Error' } })
    })
    .catch(() => {
      this.setState({ error: true })
    })
  }

  handleChange = (event) => {
    const state = this.state
    let newState = Object.assign({}, state)
    newState[event.target.name] = event.target.value
    this.setState(newState)
  }

  render () {
    const { active, onClose } = this.props
    const { lines, error, sending, sent } = this.state
    let allLines = lines.map(a => a.busName)
    return (
      <div className={cn('Feedback', { active })}>
        <div className='close'>
          <Button color='transparent' squared={true} onClick={onClose}>
            <IconClose size={20} style={{color: 'black', marginBottom: 2}}/>
          </Button>
        </div>
        <div style={{clear: 'both'}}>
          <span>Colectivos incluidos</span>
          <BusLines
            busLines={allLines}
            shadow={false}
            bottom={false} />
        </div>
        <div className='form'>
          <span style={{marginBottom: '20px'}}>Danos tu opinion</span>
          { sent &&
            <span style={{color: '#64DB92'}}>Mensaje enviado!</span>
          }
          { error &&
            <span style={{color: 'red'}}>{error.message}</span>
          }
          <input type='email' placeholder='Email' name='email' ref='email' onChange={this.handleChange} />
          <textarea name='message' rows={3} placeholder='Contanos tu opinion' ref='message' onChange={this.handleChange}>
          </textarea>
          <Button disabled={sending} color='transparent' color='green' fullWidth={true} onClick={this.checkForm}>
            Enviar
          </Button>
        </div>
        <style jsx>{`
          .Feedback {
            min-height: 200px;
            position: fixed;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 999;
            background: white;
            padding: 10px;
            
            visibility: hidden;
            transform: translateY(100%);
            transition: transform 0.20s ease-in-out, visibility 0s ease-in-out 0.20s;
          }
          .Feedback.active {
            visibility: visible;
            transform: translateY(0);
            transition-delay: 0s;
          }
          .close {
            float: right;
          }
          span {
            display: block;
            font-weight: 600;
            margin: 10px 0;
          }
          input, textarea {
            width: 100%;
            display: block;
            margin-bottom: 20px;
            font-size: 18px;
            line-height: 20px;
            padding: 5px;
            border-radius: 0;
            border: 0;
            outline: none;
            border-bottom: 1px solid grey;
          }
          input {

          }
          textarea {
            resize: vertical;
          }
        `}</style>
      </div>
    )
  }
}
