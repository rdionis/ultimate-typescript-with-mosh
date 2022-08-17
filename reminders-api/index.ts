// ******* NODE and EXPRESS with TYPESCRIPT *******

// EXECUTING TYPESCRIPT CODE with NODE

// let x: number = 1; // returns error: "let x: number = 1; SyntaxError: Unexpected token ':'"
// console.log(x)

// node is an execution engine for JS code and cannot understand TS code – node cannot execute TS
// we have two options:
// 1. to run 'tsc index.ts' to compile the TS code and transpile it into JS code and then run 'node index.js', OR
// 2. to use a node package called ts-node:

// – npm init -y to create a basic package.json
// – npm install --save-dev ts-node to add ts-node as a dev-dependency
// – add 'start' script to package.json, like so:
//   "scripts": {
//      "start": "ts-node index.ts"
//   },


// SETTING UP AN EXPRESS PROJECT

// npm install express
// npm install --save-dev typescript @types/node @types/express | same as: npm i -D typescript @types/node @types/express
// it is a good idea to install typescript locally since maybe another developer working on the same project does not have TS installed globally on their machine
// we need to include all the dependencies for this application in package.json, so we take this project anywhere
// npm i -D nodemon // so we don't have to keep stopping and starting the server
// change the 'start' script in package.json, like so:
// "scripts": {
//     "start": "nodemon index.ts" // because ts-node is installed, nodemon will still use it under the hood
//   },

import express from 'express';
import remindersRouter from './routers/reminders';

const app = express();

app.use(express.json())
app.use('/reminders', remindersRouter)

// CREATING A BASIC ROUTE
app.get('/', (req, res) => { // (req, res) is the route handler, a function with two parameters: a request and a response
    res.send('Hello, world.')
})

app.listen(8000, () => console.log('Server started in port 8000.'))

// CREATING A ROUTER

// we are going to create a router for handling requests for an endpoint like '/reminders'


// PARSING REQUEST BODIES
