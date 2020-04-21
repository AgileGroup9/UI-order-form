# Client code

## Info
The client current uses Bootstrap for stylized inputs and React for rendering items / previewing the total cost.
To allow for the use of modern features of react, js, and css we use babel to generate backwards compatible versions if needed.
For the pipeline to be as smooth as possible we use parcel.js to automaticaly generate and bundle our code.

## Build Requirements
- Node.js
- npm
## Develop
1. Pull git repo
2. install node and npm
3. run `npm install && npm start`

This will start a parcel.js server, which will detect changes in the code, compile, and then serve on localhost:1234.

## Production
1. Pull git repo
2. install node and npm
3. run `npm install && npm run-script build-prod`

This will generate html,js,css files in the dist directory.