# connectivity-intake

[![Lifecycle:Experimental](https://img.shields.io/badge/Lifecycle-Experimental-339999)](<Redirect-URL>)

Intake for application process for BC Connectivity funding program

## Usage
Clone the repo and run the following commands:
```bash
cd app
yarn # to install dependencies
yarn dev # run the application
```
## Docker
To run application using Docker, run the following commands from the root folder:
```bash
docker build -f app/Dockerfile -t connectivity-intake:latest .
docker run -p 3000:3000 connectivity-intake:latest
```
Go to: `http://localhost:3000`

## Run End to End Cypress Test Locally
```bash
cd app
yarn
yarn run cypress:open
```
