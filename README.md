# Home Library Service

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.

## Downloading

```
git clone {repository URL}
```

## Installing NPM modules

```
npm install
```

## Running application

```
npm start
```

After starting the app on port (4000 as default) you can open
in your browser OpenAPI documentation by typing http://localhost:4000/doc/. unfortunately not updated
For more information about OpenAPI/Swagger please visit https://swagger.io/.

## Running docker image
There is a docker-compose.yaml file for creating application image
application is launching in watch mode
all envirenment variables are in .env file

for running multi-container app from docker image (that can take some time):
```
docker compose up
```
or in detouched mode:
```
docker compose up -d
```
for scanning image for vulnerabilities:
```
npm run docker:scan
```
## Notes for Postman testing

for updating request ```PUT``` is used, so the new entity replaces the old one.   
Port can be specified in ```.env``` file. You can find the example in ```.env.example ``` or just rename it to ````.env```  
By default port 4000 is used.   

## Testing

After application running open new terminal and enter:

To run all tests without authorization

```
npm run test
```

To run only one of all test suites

```
npm run test -- <path to suite>
```

To run all test with authorization

```
npm run test:auth
```

To run only specific test suite with authorization

```
npm run test:auth -- <path to suite>
```

### Auto-fix and format

```
npm run lint
```

```
npm run format
```

### Debugging in VSCode

Press <kbd>F5</kbd> to debug.

For more information, visit: https://code.visualstudio.com/docs/editor/debugging
