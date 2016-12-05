import React, { Component } from 'react'
import AccountList from 'components/AccountList/AccountList'
import SendMessage from 'components/SendMessage/SendMessage'

import SimpleRegistry from 'contracts/SimpleRegistry.sol';
import Web3 from 'web3';

import truffleConfig from '../../../truffle'

const provider = new Web3.providers.HttpProvider(`http://${truffleConfig.rpc.host}:${truffleConfig.rpc.port}`)
SimpleRegistry.setProvider(provider);

class AccountListContainer extends Component {
  constructor(props) {
    super(props)

    this.state = {
      accounts: [],
      coinbase: ''
    }

    this._getMessage = this._getMessage.bind(this)
    this._getAccounts = this._getAccounts.bind(this)
  }

  _getMessage (account) {
    var meta = SimpleRegistry.deployed();

    return new Promise((resolve, reject) => {

      meta.getMessage.call(account, {from: account}).then(function (value) {

        console.log(value);
        resolve(value);

      }).catch(e => {
        console.log(e)
        reject()
      })
    })
  }

  _getAccounts () {
    this.props.web3.eth.getAccounts(function (err, accs) {
      this.setState({coinbase: 'vtnc'})
      if (err != null) {
        window.alert('There was an error fetching your accounts.')
        console.error(err)
        return
      }

      if (accs.length === 0) {
        window.alert("Couldn't get any accounts! Make sure your Ethereum client is configured correctly.")
        return
      }

      this.setState({coinbase: accs[0]})

      var accountsAndMessages = accs.map((account) => {
        return this._getMessage(account).then(message => {
          return { account, message }
        });
      })

      Promise.all(accountsAndMessages)
        .then(accountsAndMessages => {
          this.setState({
            accounts: accountsAndMessages,
            coinbaseAccount: accountsAndMessages[0]
          })
        })

    }.bind(this))
  }

  componentDidMount() {
    // const refreshMessages = () => {
    //   this._getAccounts()
    // }
    //
    // refreshMessages()
    this._getAccounts()
    // setInterval(()=>{
    //   refreshMessages();
    //   return refreshMessages
    // }, 5000)
  }

  render() {
    return (
      <div>
        <AccountList accounts={this.state.accounts} />
        <SendMessage sender={this.state.coinbase} />
      </div>
    )
  }
}

export default AccountListContainer
