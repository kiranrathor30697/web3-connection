import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import Web3 from 'web3'

export const App = () => {

  const [isConnected, setIsConnected] = useState(false);

  const detectCurrentProvider = () => {
    let provider;
    if (window.ethereum) {
      provider = window.ethereum;
    } else if (window.web3) {
      provider = window.web3.currentProvider
    } else {
      console.log("not-ethereum browser detected. You should install metamask")
    }
    return provider;
  }

  const onConnect = async () => {
    try {
      const currentProvider = detectCurrentProvider()
      if(currentProvider){
        await currentProvider.request({method : 'eth_requestAccounts'});
        const web3 = new Web3(currentProvider)
        const userAccount = await web3.eth.getAccounts();
        const account = userAccount[0]
        let ethBalance = await web3.eth.getBalance(account)
        setIsConnected(true)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const disconnected = () => {
    setIsConnected(false)
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>React App Authentication with React, Web3 and Metamask. </h1>
        <div>
          {
            !isConnected && (
              <div>
                <button onClick={onConnect}> Connect Metamask</button>
              </div>
            )
          }
        </div>
      </header>
    </div>
  );
}

