## Truffle + Webpack Demo App

This is a simple Dapp boilerplate using Truffle and Webpack. Start the app, then try to send messages between peers.

### Coding Style

This repo uses JS Standard.

### Running

The Web3 RPC location will be picked up from the `truffle.js` file.

0. Clone this repo
0. `npm install`
0. Make sure `testrpc` is running on its default port. Then:
  - `npm run start` - Starts the development server
  - `npm run build` - Generates a build
  - `npm run compile` - Compile the smart contracts
  - `npm run deploy`  - Deploys the contracts, running the truffle migrations
