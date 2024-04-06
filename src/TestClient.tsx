import logo from './logo.svg';
import React from 'react';
import './App.css';
import { useContext, useEffect, useState } from 'react';
import HyperengageContext from './context/HyperengageClient';

const TestClient = () => {
  const hyperengageClient = useContext(HyperengageContext);
  if (!hyperengageClient) {
    throw new Error('HyperengageClient is not provided');
  };
  const [users, setUsers] = useState<any>('');
  const [accounts, setAccounts] = useState([
        "Apple",
        "Microsoft",
        "Amazon",
        "Appsflyer",
        "Google",
        "Facebook",
        "Tesla",
        "Netflix",
        "Intel",
        "IBM",
        "Adobe",
        "Oracle",
        "Salesforce",
        "Cisco",
        "HP",
        "Samsung",
        "Sony",
        "Nvidia",
        "PayPal",
        "Uber",
        "Airbnb",
        "Twitter",
        "Snapchat",
        "LinkedIn",
        "Pinterest",
        "Zoom",
        "Spotify",
        "Slack",
        "Ebay",
        "Reddit",
        "Dropbox"
    ]);
    const events = [
      "test_button_click",
      "test_button_click_2",
      "test_button_click_3",
      "test_button_click_4",
      "signup",
      "login",
      "logout",
      "add_to_cart",
      "remove_from_cart",
      "purchase",
      "add_to_wishlist",
      "remove_from_wishlist",
      "view_product",
      "view_category",
      "view_cart",
      "view_wishlist",
      "view_homepage",
      "view_search_results",
      "view_product_details",
      "view_category_details",
      "view_cart_details",
    ];
    const traits = [{
      "name": "John Doe",
      "location": "San Francisco",
      "age": 25,
    }, {
      "name": "Jane Doe",
      "location": "New York",
      "age": 30,
    }, {
      "name": "John Smith",
      "location": "Chicago",
      "age": 35,
    }, {
      "name": "Jane Smith",
      "location": "Los Angeles",
      "age": 40,
    }];

  const accountIdentify = ()=> {
    const rand = Math.floor(Math.random() * accounts.length).toString();
    const account = accounts[rand];
    hyperengageClient.account_identify({
    account_id: rand, 
    traits: {
    name: account,
    testblablabla: "test",
    email: `${account}@gmail.com`,
  },
});
};


const userIdentify = ()=> {
  const user = users[Math.floor(Math.random() * users.length)];
  hyperengageClient.user_identify({
    user_id: user.id,
    traits: {
      testblablabla: "test",
      name: user.name,
      email: user.email,
    }
});
};

useEffect(() => {
  const fetchUsers = async () => {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    const data = await response.json();
    setUsers(data);
  };
  fetchUsers();
}, []);

  return (
    <div>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <button type='button' onClick={accountIdentify}>Identify Account</button>
      <button type='button' onClick={userIdentify}>Identify User</button>
      <button type='button' onClick={() => {
        hyperengageClient.track("rest created",{properties: {app: "Test-1", logic: "Test-2", trial: true, test: 1, test2: "test"}})
      }}>Track Event</button>
      <button type='button' onClick={() => {
        hyperengageClient.reset();
      }}>Reset cookies and user data
      </button>
         <button type='button' onClick={() => {
        for (let i = 0; i < 5; i++) {
          accountIdentify();
          for (let j = 0; j < 10; j++) {
            userIdentify();
            for (let k = 0; k < 10; k++) {
              hyperengageClient.track(events[Math.floor(Math.random() * events.length)], {properties: traits[Math.floor(Math.random() * traits.length)]});
            }
          }
        }
      }}>Generate list of random users and accounts
      </button>
      </header>
    </div>
  );
}

export default TestClient;
