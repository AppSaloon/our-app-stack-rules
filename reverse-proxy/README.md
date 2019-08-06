# Reverse proxy server sample

Uses greenlock to create certificates and serve on https.
Services that the proxy proxies to are running on http and aren't available from the outside world.
The idea is that every request passes through the proxy, and gets redirected to the correct server internally.

Includes compression and serves `public/favicon.ico` favicon.
CORS is enabled by default. Disable by removing code between `CORS setup` and `CORS end` lines.

## Settings up services
All services that the proxy knows about and will redirect to are defined in the `app.js` file.
