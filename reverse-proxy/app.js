const express = require('express')
const path = require('path')
const favicon = require('serve-favicon')
const compression = require('compression')
const proxyMiddleWare = require('http-proxy-middleware')

const app = express()
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))
app.use(compression())

/**
 * CORS setup
 */
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next()
})
app.use((req, res, next) => {
  if (req.method === 'OPTIONS') return res.sendStatus(200)
  next()
})
/* CORS end */

const sampleAppHost = 'http://sample-app'
const sampleApiServerHost = 'http://sample-api-server'

/* App server */
app.use('/app', proxyMiddleWare({
  target: sampleAppHost,
  pathRewrite: { '^/app': '/' }
}))

/* Api server */
app.use('/api', proxyMiddleWare({
  target: sampleApiServerHost,
  pathRewrite: { '^/api': '/' }
}))

/* If all things fail */
app.get('/', function (req, res) {
  res.send('This is my reverse proxy server. :)')
})

app.use((err, req, res, next) => {
  if (err.status === 403) {
    res.status(403)
    res.send(err.message)
  } else {
    res.status(500)
    res.json({ error: err })
  }

  console.error(err)
})

module.exports = app
