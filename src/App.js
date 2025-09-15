import React from 'react'
import HyperengageContext from './context/HyperengageClient.ts';
import { hyperengageClient } from '@hyperengage/sdk-js'
import TestClient from './TestClient.tsx'

const heClient = hyperengageClient({
  key: "hjs_38a6199575b05da04d6d9c470048e167",
  workspace_key: "MsHGstpPlw",
  tracking_host: "http://localhost:8000",
});
console.log('heClient', heClient);
const App = ({ children }) => {

  return (
    <div className='app'>
      <HyperengageContext.Provider value={heClient}>
        <TestClient />
      </HyperengageContext.Provider>
    </div>
  )
}

export default App