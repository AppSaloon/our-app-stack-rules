# Stackfile template

Sample stackfile/dockercompose as we use in our production environment.

```YAML
version: "3.3"
services:
  proxy:
    image: 'my-registry/sample-project/sample-reverse-proxy:latest'
    environment:
      - NODE_ENV=production
      - LOG_ENV=production
      - GREENLOCK=true
      - EMAIL=myemail@example.com
    ports:
      - target: 80
        published: 80
        protocol: tcp
        mode: host
      - target: 443
        published: 443
        protocol: tcp
        mode: host
      # defining ports can also be simplified like so:
      # - '80:80'
      # - '443:443'
    volumes:
      - greenlock:/etc/greenlock
    depends_on:
      - sample-app
      - sample-api-server
  sample-app:
    image: 'my-registry/sample-project/sample-app:latest'
    environment:
      - NODE_ENV=production
      - LOG_ENV=production
  sample-api-server:
    image: 'my-registry/sample-project/sample-api-server:latest'
    environment:
      - NODE_ENV=production
      - LOG_ENV=production
      - DB_HOST=db
      - DB_PORT=27017
      - DB_NAME=sample-db
      - DB_USERNAME=readUser
    secrets:
      - jwt_secret
    depends_on:
      - db
  db:
    image: 'mongo:4-xenial'
    command: --config /etc/mongo/mongod.conf
    configs:
      - source: mongo_config
        target: /etc/mongo/mongod.conf
    volumes:
      - db:/data/db
    ports:
      - '27017:27017'

volumes:
  db:
  greenlock:

configs:
  mongo_config:
    external:
      name: sample_mongo_config

secrets:
  jwt_secret:
    external: true
```
