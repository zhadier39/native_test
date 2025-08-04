import React from 'react'
import HyperengageContext from './context/HyperengageClient.ts';
import { hyperengageClient } from '@hyperengage/sdk-js'
import TestClient from './TestClient.tsx'

const heClient = hyperengageClient({
  key: "hjs_dfa0c4d07a7bb2c183f1a163c02eb43d",
  workspace_key: "1VxmCzCLHc",
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