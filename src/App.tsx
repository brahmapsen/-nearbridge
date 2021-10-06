import React from 'react';
import './App.css';

import { WalletConnection } from 'near-api-js';
import { API } from '@textile/near-storage';

import Connect from "./Connect";
import Deposit from "./Deposit";
import Upload from "./Upload";

interface Props {
  api: API;
  wallet: WalletConnection;
}

function App( { wallet, api }: Props ) {
  return (
    <div className="App">
      <header>
          Demo App
      </header>
      <Connect wallet={wallet} />
      {
        wallet.isSignedIn() ? (
          <div>
              <p> {wallet.getAccountId()} </p>
              <Deposit api={api} />
              <Upload api={api} />
          </div>
        ) : 'not signed in' 
      }
    </div>
  );
}

export default App;
