import React, { Component } from 'react'
import './SendMessage.css'

import SimpleRegistry from 'contracts/SimpleRegistry.sol';
import Web3 from 'web3';

const provider = new Web3.providers.HttpProvider('http://localhost:8545')
SimpleRegistry.setProvider(provider);

class SendMessage extends Component {
  constructor(props) {
    super(props)

    this.handleSendMeta = this.handleSendMeta.bind(this)
  }

  handleSendMeta(e) {
    e.preventDefault()
    var meta = SimpleRegistry.deployed();
    console.log(`Recipient Address: ${this.recipientAddressInput.value}`)
    meta.sendMessage(this.recipientAddressInput.value, this.sendMessageInput.value, {from: this.props.sender})
      .then(() => console.log('SENT'))
      .catch(e => console.log(e));
  }

  render() {
    return (
      <form className='SendCoin'>
        <label htmlFor='recipient_address'>Recipient Address</label>
        <input id='recipient_address' className='RecipientAddress' type='text' ref={(i)=>{ if(i) { this.recipientAddressInput = i}}} />
        <label htmlFor='send_message'>Message</label>
        <input id='send_message' className='SendAmount' type='text' ref={(i) => { if(i) { this.sendMessageInput = i}}} />
        <button className='SendBtn' onClick={this.handleSendMeta}>Send</button>
      </form>
    )
  }
}

export default SendMessage;
