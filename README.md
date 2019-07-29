# our-app-stack-rules
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
- [greenlock-express](https://www.npmjs.com/package/greenlock-express)
- [greenlock-store-fs](https://www.npmjs.com/package/greenlock-store-fs)
- [@appsaloon/logger-js](https://www.npmjs.com/package/@appsaloon/logger-js)
- [body-parser](https://www.npmjs.com/package/body-parser)
- [simple-oauth2](https://www.npmjs.com/package/simple-oauth2)
- _[got](https://www.npmjs.com/package/got)_ (to talk about)
- [mysql](https://www.npmjs.com/package/mysql)

### utility packages

- [fs-extra](https://www.npmjs.com/package/fs-extra)
- _[date-fns](https://www.npmjs.com/package/date-fns) / [moment](https://www.npmjs.com/package/moment)_ (to talk about)

### viz packages

- [react-vis](https://www.eea.europa.eu/data-and-maps/dashboards/air-pollutant-emissions-data-viewer-2)

### tools

- Postman

### Code style

Eslint standard
```
"eslintConfig": {
    "extends": "standard",
    "rules": {
      "indent": [
        "error",
        4
      ]
    }
  },
  "devDependencies": {
    "eslint": "^5.14.1",
    "eslint-config-standard": "^12.0.0",
    "eslint-plugin-import": "^2.16.0",
    "eslint-plugin-node": "^8.0.1",
    "eslint-plugin-promise": "^4.0.1",
    "eslint-plugin-standard": "^4.0.0"
  }
```

## Frontend

### packages

- create-react-app

# Our Rules

A set of guidelines that makes our lives easier.

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
