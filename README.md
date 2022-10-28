## Testing Hyperengage Native API
- Clone the repo and open it in a code editor of your choice
- In the root directory, run ```npm install``` and then ```npm start``` to start the development server.
- Inside public/index.html folder, find the Hyperengage script inside the head and specify the following
  - Api Key in `data-key`.
  - Workspace Key in `data-workspace-key`
  - Tracking host (The ngrok server) in `data-tracking-host`
- Finally, open the devserver and press the preset buttons to start sending events.

## Node env
- You may also choose to remove the script inside head and import the node package instead (Already installed). The event calls would be slightly altered as specified in the Jitsu docs.