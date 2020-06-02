# our-app-stack-rules

[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)
[![Keep a changelog](https://img.shields.io/badge/changelog-Keep%20a%20Changelog%20v1.0.0-%23E05735
)](https://keepachangelog.com/en/1.0.0/)
[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-yellow.svg)](https://conventionalcommits.org)

What we use in our stack and what rules do we like to live by when developing our code

# Our stack

## Server side

### setup

All projects are run within a docker container.
All projects contain a Dockerfile and are build via pipelines of bitbucket and stored in our own docker registery.
All projects are orchestrated with a docker stack file and managed by portainer.
Whenever a bitbucket pipeline is done it triggers a webhook of portainer to download the latest image from the registery and redeploy the latest version
Most of our projects have a reverse proxy service that take care of the https, compression and routing.

### packages

- [express](https://www.npmjs.com/package/express)
- [compression](https://www.npmjs.com/package/compression)
- [http-proxy-middleware](https://www.npmjs.com/package/http-proxy-middleware)
- [serve-favicon](https://www.npmjs.com/package/serve-favicon)
- [express-validator](https://www.npmjs.com/package/express-validator)
- [greenlock-express](https://www.npmjs.com/package/greenlock-express)
- [greenlock-store-fs](https://www.npmjs.com/package/greenlock-store-fs)
- [@appsaloon/logger-js](https://www.npmjs.com/package/@appsaloon/logger-js)
- [body-parser](https://www.npmjs.com/package/body-parser)
- [simple-oauth2](https://www.npmjs.com/package/simple-oauth2)
- [got](https://www.npmjs.com/package/got)
- [mysql](https://www.npmjs.com/package/mysql)
- [cron](https://www.npmjs.com/package/cron)
- [mongodb](https://mongodb.github.io/node-mongodb-native/)
- [mongoose](https://www.npmjs.com/package/mongoose)
- [bcrypt](https://www.npmjs.com/package/bcrypt)
- [heartbeat-middleware](https://www.npmjs.com/package/@appsaloon/heartbeat-middleware)

### utility packages

- [fs-extra](https://www.npmjs.com/package/fs-extra)
- _[date-fns](https://www.npmjs.com/package/date-fns) / [moment](https://www.npmjs.com/package/moment)_ (to talk about)
- [lodash](https://lodash.com)

### tools

- Postman

### Code style

Eslint standard
```Javascript
"eslintConfig": {
    "extends": "standard"
  },
  "devDependencies": {
    "eslint": "^6.5.1",
    "eslint-config-standard": "^14.1.0",
    "eslint-plugin-import": "^2.18.2",
    "eslint-plugin-node": "^10.0.0",
    "eslint-plugin-promise": "^4.2.1",
    "eslint-plugin-standard": "^4.0.1"
  }
```

## Frontend

### packages

- [create-react-app](https://www.npmjs.com/package/create-react-app)
- [prop-type](https://www.npmjs.com/package/prop-types)
- [react-vis](https://www.eea.europa.eu/data-and-maps/dashboards/air-pollutant-emissions-data-viewer-2)
- [ky](https://www.npmjs.com/package/ky)

### Code style

Eslint standard
```Javascript
"eslintConfig": {
    "extends": [
        "react-app",
        "standard"
    ]
  },
  "devDependencies": {
    "eslint-config-standard": "^13.0.1",
    "eslint-plugin-node": "^9.1.0",
    "eslint-plugin-promise": "^4.2.1",
    "eslint-plugin-standard": "^4.0.0"
  }
```

# Our Rules

A set of guidelines that makes our lives easier.

All repo's contain a CHANGELOG.md and are based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/)

Commit messages follow [conventionalcommits](https://www.conventionalcommits.org/en/v1.0.0-beta.4/) style.

## Server

1. Start with the architecture of the server setup. Always start with the proxy. Adding it later is more difficult
2. Design your api in Postman and create tests to verify your api works as expected. Share this with the team workspace. This will make debugging easier for the rest of the team. Create local and production environments and share these.
3. Start implementing the @appsaloon/logger-js from the start
4. Add Eslint "standard" style to every project
5. Add favicon to the proxy server

## FrontEnd

1. Start with create-react-app
2. Implement the @appsaloon/logger-js from the start
3. _https://facebook.github.io/create-react-app/docs/setting-up-your-editor_ (to talk about)

# Dockerfile templates

[dockerfiles](DOCKERFILES.md)

# Pipelines templates

[pipelines](PIPELINES.md)

# Stackfiles templates

[stackfiles](STACKFILES.md)

# Testing in react

[tests](tests)
