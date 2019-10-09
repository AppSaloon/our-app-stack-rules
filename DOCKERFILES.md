# Dockerfile templates

Ready to be used in production. No additional configuration required.

---

### react app

The starting image is the latest LTS version of node.
The node images should be updated to the latest LTS version as long as the app/server has been developed in an environment with the same version.

```Dockerfile
FROM node:dubnium-stretch AS build
WORKDIR /build
COPY package*.json ./
RUN npm i
COPY public ./public
COPY src ./src
RUN npm run build

FROM node:dubnium-alpine AS release

# add tini to handle signals and zombie process reaping
RUN apk add --no-cache tini
ENTRYPOINT ["/sbin/tini", "--"]

RUN npm i -g serve
WORKDIR /build
COPY package.json ./ # we don't need to install any dependencies, but we could include the package.json to accompany the image with the project info?
COPY --from=build /build/build .
CMD ["serve", "-l", "80", "-s", "."]
```

---

### node server

```Dockerfile
# pick a version from https://hub.docker.com/_/node/
FROM node:alpine

# add tini to handle signals and zombie process reaping
RUN apk add --no-cache tini
ENTRYPOINT ["/sbin/tini", "--"]

WORKDIR /server

# install build dependencies to generate any required binaries
# https://github.com/nodejs/docker-node/issues/282
# --no-cache: download package index on-the-fly, no need to cleanup afterwards
# --virtual: bundle packages, remove whole bundle at once, when done
RUN apk --no-cache --virtual build-dependencies add \
    python \
    make \
    g++ \
    git
COPY package*.json ./
RUN npm install --prod
RUN apk del build-dependencies

COPY src/ ./

CMD ["node", "index.js"]
```
