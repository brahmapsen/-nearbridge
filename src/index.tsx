import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import {connect, keyStores, WalletConnection, ConnectConfig } from 'near-api-js';
import { init } from "@textile/near-storage";

const config: ConnectConfig = {
  networkId: 'testnet',
  nodeUrl: 'https://rpc.testnet.near.org',
  walletUrl: 'https://wallet.testnet.near.org',
  helperUrl: 'https://helper.testnet.near.org'
}

const contractId = 'filecoin-bridge.testnet';

async function initConnection() {
  const near = await connect({
    deps: {
      keyStore: new keyStores.BrowserLocalStorageKeyStore()
    },
    ...config
  });

  const wallet = new WalletConnection(near, null);
  const api = await init(wallet.account(), { contractId })
  return { api, wallet } 
}

initConnection()
  .then((opts) => {
    ReactDOM.render(
      <React.StrictMode>
        <App { ...opts } />
      </React.StrictMode>,
      document.getElementById('root')
    );
  })


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
