import logo from './logo.svg';
import './App.css';
import { useEffect } from 'react';

function App() {

  const accountIdentify = ()=> {
  window.hyperengage(
    'account', 
    { account_id: '122345', 
    traits: {
    name: 'Hyperengage',
  }
});
};


const userIdentify = ()=> {
window.hyperengage(
  'user', {
    user_id: '1001',
    traits: {
      name: "Ramos",
      email: "ramos+123@rocketmail.io"
    }
});
};

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <button type='button' onClick={accountIdentify}>Identify Account</button>
      <button type='button' onClick={userIdentify}>Identify User</button>
      <button type='button' onClick={() => {
        window.hyperengage('track','test_button_click',{properties: {app: "Test-1"}})
      }}>Track Event</button>
      <button type='button' onClick={() => {
        window.hyperengage('reset');
      }}>Reset cookies and user data
      </button>
      </header>
    </div>
  );
}

export default App;
