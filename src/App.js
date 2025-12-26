import React from 'react'
import HyperengageContext from './context/HyperengageClient.ts';
import { hyperengageClient } from '@hyperengage/sdk-js'
import TestClient from './TestClient.tsx'


const heClient = hyperengageClient({
  key: "hjs_4ef055dc78846282151c3d2a683f01a5",
  workspace_key: "bPfQiDk1Bf",
  tracking_host: "http://localhost:8000",
});

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