# this is the Angular 11 branch.

## Build the lib
1. cd into the lib folder
2. `npm install`
3. `npm run build`
4. cd into dist/bentest-lib
5. `npm version 0.0.2`
6. `npm pack`

## Serve the umd bundle
setup a localhost server to point to port 3000 and serve the file `dist/bentest-lib/bundles/bentest-lib.umd.js`

## Build the client
1. cd into the client folder
2. modify the package file.  bentest-lib should be pointed to the .tgz you created above in step 6
3. `npm install`
4. `npm start`


You should see the page title, then after a short delay you should see "bentest-lib works!"
