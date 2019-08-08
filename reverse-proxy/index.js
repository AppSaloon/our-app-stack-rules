const initLogstash = require('@appsaloon/logger-js').default
const logstashOptions = {
  protocol: 'https',
  hostname: 'elkstack.example.com',
  path: 'app-backend',
  site: 'samples/reverse-proxy'
}
initLogstash(logstashOptions)

const useGreenlock = process.env.GREENLOCK === 'true'

const app = require('./app.js')

if (useGreenlock) {
  console.log('using greenlock')
  require('greenlock-express').create({

    // Let's Encrypt v2 is ACME draft 11
    version: 'draft-11',

    server: 'https://acme-v02.api.letsencrypt.org/directory',
    // Note: If at first you don't succeed, stop and switch to staging
    // server: 'https://acme-staging-v02.api.letsencrypt.org/directory',

    // You MUST change this to a valid email address
    email: 'myemail@example.com',

    // You MUST NOT build clients that accept the ToS without asking the user
    agreeTos: true,

    // You MUST change these to valid domains
    // NOTE: all domains will validated and listed on the certificate
    approvedDomains: ['myapp.example.com'],

    // You MUST have access to write to directory where certs are saved
    // ex: /home/foouser/acme/etc
    configDir: '/etc/greenlock/acme/',

    app,

    // Get notified of important updates and help me make greenlock better
    communityMember: true

    //, debug: true

  }).listen(80, 443)
} else {
  console.log('not using greenlock')
  app.listen(80, () => console.log(`Server listening on port 80`))
}
