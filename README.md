# connectivity-intake

[![Lifecycle:Experimental](https://img.shields.io/badge/Lifecycle-Experimental-339999)](<Redirect-URL>)

Intake for application process for BC Connectivity funding program

## Usage
Clone the repo and run the following commands:
```bash
# Install tools required for the project
asdf install
asdf reshim

# Start Postgres database
pg_ctl start

# Create Database
createdb connectivity_intake

# Set up database
cd db
sqitch deploy

# Build and run application
cd ../app
cp .env.example .env # Copy .env.example file
yarn
yarn dev
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
## Environment Variables

| Name             | Description                                                                                       |
|------------------|---------------------------------------------------------------------------------------------------|
| `NODE_ENV`       | The back-end run-time's environment. Possible values include either "development" or "production".|
| `PGUSER`         | The PostgreSQL user to connect to locally.                                                        |
| `PGPASSWORD`     | The PostgreSQL password to connect to locally.                                                    |
| `PGDATABASE`     | The PostgreSQL database name to connect to locally.                                               |
| `PGHOST`         | The PostgreSQL port to connect to locally.                                                        |
| `PGPORT`         | The PostgreSQL host to connect to locally.                                                        |
| `ORIGIN`         | The root URL of the web app.                                                                      |
| `SESSION_SECRET` | The session secret passed to middleware, defaults to random string                                |
| `PORT`           | The port where the app will be served                                                             |
| `HOST`           | The addess of the host where the app is located                                                   |
