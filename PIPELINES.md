# Pipelines template

`bitbucket-pipelines.yml` file that goes into project repository root.

Make sure you replace these with the correct values:
* `<REGISTRY>`
* `<PROJECT-OR-CLIENT-NAME>`
* `<APP-OR-SERVER-NAME>`
* `<PORTAINER-WEBHOOK>`

```YAML
# Bitbucket guides: https://confluence.atlassian.com/x/O1toN
image: atlassian/default-image:2

pipelines:
  branches:
    master: # instructions for master branch
      - step:
          name: Docker build & push with tag latest
          services:
            - docker
          caches:
            - docker
          script:
            # Since we're using portus: set $PORTUS_USERNAME and $PORTUS_PASSWORD as environment variables in repository settings (these are set as default across all repositories)
            - export IMAGE_NAME=<REGISTRY>/<PROJECT-OR-CLIENT-NAME>/<APP-OR-SERVER-NAME>:latest

            # build the Docker image (this will use the Dockerfile in the root of the repository)
            - docker build -t $IMAGE_NAME .
            # authenticate with the registry
            - docker login -u $PORTUS_USERNAME -p $PORTUS_PASSWORD portus.appsaloon.be
            # push the new Docker image to the APPSALOON registry
            - docker push $IMAGE_NAME
            # call Webhook
            - curl -X POST <PORTAINER-WEBHOOK>
    develop: # instructions for develop branch
      - step:
          name: Docker build & push with tag develop
          ...
```

### Memory limit

If your build fails because it doesn't have enough memory add this at the bottom of your `bitbucket-pipelines.yml` file.
If you get an error resembling something like 'unexpected end of file', you're probably dealing with this issue.

```YAML
definitions:
  services:
    docker:
      memory: 2048
```
