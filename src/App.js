import React from 'react'
import HyperengageContext from './context/HyperengageClient.ts';
import { hyperengageClient } from '@hyperengage/sdk-js'
import TestClient from './TestClient.tsx'

const heClient = hyperengageClient({
  key: "hjs_46886de06049396673b4efd57bbf3e2c",
  workspace_key: "IeHcePg171",
  tracking_host: "http://localhost:8000",
});
console.log('heClient', heClient);
const App = ({children}) => {
 
  return (
  <div className='app'>
    <HyperengageContext.Provider value={heClient}>
      <TestClient />
    </HyperengageContext.Provider>
    </div>
  )
}

export default App