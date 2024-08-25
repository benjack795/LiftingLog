# Lifting Log WebApp

## About
An example fullstack webapp that allows you to record compound exercises and photos on a calendar and view progress in your exercises as graphs. 
Uses React for frontend with Typescript, and Express and MongoDB for the backend.

## Installation
Ideally you want to use VSCode, via its inbuilt terminal, to enter commands.
Clone the repo + install packages in the frontend (client) and backend (api) folders:
```sh
$ git clone https://github.com/benjack795/LiftingLog.git
$ cd client
$ npm install
$ cd ../api
$ npm install
```

## Commands
In the api folder, run `npm run devStart` to launch the backend server.
In the client folder, run `npm run dev` to start the site. It should then open in a new tab on http://localhost:3000/.
If you want to run the jest unit tests, run `npm run test` in the client folder. 
If you want to run the cypress end to end tests, run `npx cypress open` to open the cypress environment.

## Tutorial
From the home page, you can click Calendar to go to the main functional portion of the site.
From there, you can add either add exercises with the plus buttons or photos with the camera buttons for each day.
Exercises added will be updated onto the relevand graphs at the base of the page.

![example site pic](example-liftinglog.png)
