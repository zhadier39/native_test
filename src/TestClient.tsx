import logo from './logo.svg';
import React from 'react';
import './App.css';
import { useContext, useEffect, useState } from 'react';
import HyperengageContext from './context/HyperengageClient.ts';

const TestClient = () => {
  const hyperengageClient: any = useContext(HyperengageContext);

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
    hyperengageClient.identify_account({
    account_id: rand, 
    traits: {
    name: account,
    date_added: new Date().toISOString(),
    testblablabla: "test",
    email: `${account}@gmail.com`,
  },
});
};


const userIdentify = ()=> {
  const user = users[Math.floor(Math.random() * users.length)];
  hyperengageClient.identify_user({
    user_id: user.id,
    traits: {
      testblablabla: "test",
      date_added: new Date().toISOString(),
      name: user.name,
      email: user.email,
    }
});
};

console.log(users);

useEffect(() => {
  const fetchUsers = async () => {
    try {
      // Use Random User Generator API to fetch 50 random users
      const response = await fetch('https://randomuser.me/api/?results=50');
      const data = await response.json();
      
      // Map the random users to match the structure used in the userIdentify function
      const formattedUsers = data.results.map((user: any, index: number) => ({
        id: index.toString(),
        name: `${user.name.first} ${user.name.last}`,
        email: user.email,
        username: user.login.username,
        phone: user.phone,
        website: `${user.login.username}.com`,
        company: {
          name: user.location.city + ' Company',
          catchPhrase: user.location.country,
          bs: user.location.state
        }
      }));
      
      setUsers(formattedUsers);
      console.log('Fetched users:', formattedUsers.length);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
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
