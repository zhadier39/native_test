import React from 'react'
import HyperengageContext from './HyperengageContext'
import { hyperengageClient } from '@hyperengage/sdk-js'
import TestClient from './TestClient'

const App = ({children}) => {
  const heClient = hyperengageClient({
    key: "hjs_46886de06049396673b4efd57bbf3e2c",
    workspace_key: "IeHcePg171",
    tracking_host: "http://localhost:8000",
  });
  return (
  <div className='app'>
    <HyperengageContext.Provider value={heClient}>
      <TestClient />
    </HyperengageContext.Provider>
    </div>
  )
}

export default App